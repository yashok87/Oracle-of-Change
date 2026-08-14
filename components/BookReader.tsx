import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookDocument, BookBlock } from '../src/bookTypes';
import { fetchBookDocument, saveBookDocument, subscribeToBookDocument } from '../src/bookService';
import { INITIAL_RU_DOC, INITIAL_EN_DOC } from '../src/initialBookData';

interface BookReaderProps {
  onBack: () => void;
  initialLang?: 'ru' | 'en';
}

export const BookReader: React.FC<BookReaderProps> = ({ onBack, initialLang = 'ru' }) => {
  const [lang, setLang] = useState<'ru' | 'en'>(initialLang);
  const [doc, setDoc] = useState<BookDocument>(lang === 'ru' ? INITIAL_RU_DOC : INITIAL_EN_DOC);
  const [loading, setLoading] = useState(false);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans'>('serif');
  const [themeMode, setThemeMode] = useState<'paper' | 'dark' | 'sepia'>('paper');
  
  // Editor Auth & Modal state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Editor working copy state
  const [editBlocks, setEditBlocks] = useState<BookBlock[]>([]);
  const [activeEditIndex, setActiveEditIndex] = useState<number | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [saveErrorMsg, setSaveErrorMsg] = useState('');

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');
  const [activeImageZoom, setActiveImageZoom] = useState<string | null>(null);

  // Load document on language change and subscribe to Firestore updates
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchBookDocument(lang).then((data) => {
      if (isMounted) {
        setDoc(data);
        setLoading(false);
      }
    }).catch(() => {
      if (isMounted) {
        setDoc(lang === 'ru' ? INITIAL_RU_DOC : INITIAL_EN_DOC);
        setLoading(false);
      }
    });

    const unsubscribe = subscribeToBookDocument(lang, (updated) => {
      if (isMounted && updated) {
        setDoc(updated);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [lang]);

  // Handle Login submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'NO1tourist2') {
      setIsAuthenticated(true);
      setIsLoginModalOpen(false);
      setPasswordInput('');
      setLoginError('');
      // Open editor
      setEditBlocks(JSON.parse(JSON.stringify(doc.blocks)));
      setIsEditorOpen(true);
    } else {
      setLoginError(lang === 'ru' ? 'Неверный пароль' : 'Incorrect password');
    }
  };

  const handleOpenEditor = () => {
    if (isAuthenticated) {
      setEditBlocks(JSON.parse(JSON.stringify(doc.blocks)));
      setIsEditorOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  // Editor Actions
  const handleUpdateBlockText = (index: number, newText: string) => {
    setEditBlocks(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], text: newText };
      return copy;
    });
  };

  const handleUpdateBlockCaption = (index: number, newCaption: string) => {
    setEditBlocks(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], caption: newCaption };
      return copy;
    });
  };

  const handleToggleStyle = (index: number, styleProp: 'bold' | 'italic' | 'underline') => {
    setEditBlocks(prev => {
      const copy = [...prev];
      const currentStyles = copy[index].customStyle || {};
      copy[index] = {
        ...copy[index],
        customStyle: {
          ...currentStyles,
          [styleProp]: !currentStyles[styleProp]
        }
      };
      return copy;
    });
  };

  const handleSetAlignment = (index: number, align: 'left' | 'center' | 'right' | 'justify') => {
    setEditBlocks(prev => {
      const copy = [...prev];
      const currentStyles = copy[index].customStyle || {};
      copy[index] = {
        ...copy[index],
        customStyle: {
          ...currentStyles,
          align
        }
      };
      return copy;
    });
  };

  const handleAddParagraphBelow = (index: number) => {
    const newBlock: BookBlock = {
      id: `block_custom_${Date.now()}`,
      type: 'paragraph',
      text: lang === 'ru' ? 'Новый абзац...' : 'New paragraph...'
    };
    setEditBlocks(prev => {
      const copy = [...prev];
      copy.splice(index + 1, 0, newBlock);
      return copy;
    });
    setActiveEditIndex(index + 1);
  };

  const handleDeleteBlock = (index: number) => {
    if (confirm(lang === 'ru' ? 'Удалить этот фрагмент?' : 'Delete this block?')) {
      setEditBlocks(prev => prev.filter((_, i) => i !== index));
      if (activeEditIndex === index) setActiveEditIndex(null);
    }
  };

  const handleSaveToFirebase = async () => {
    setSaveStatus('saving');
    setSaveErrorMsg('');
    try {
      const updatedDoc: BookDocument = {
        ...doc,
        blocks: editBlocks,
        updatedAt: new Date().toISOString(),
        updatedBy: 'Admin (NO1tourist2)'
      };
      await saveBookDocument(updatedDoc);
      setDoc(updatedDoc);
      setSaveStatus('saved');
      setTimeout(() => {
        setSaveStatus('idle');
      }, 2500);
    } catch (err: any) {
      setSaveStatus('error');
      setSaveErrorMsg(err?.message || 'Failed to save to Firestore');
    }
  };

  // Reading Theme Styling
  const themeStyles = {
    paper: {
      bg: 'bg-[#F9F7F1]',
      text: 'text-[#1F1E1D]',
      headerBg: 'bg-[#F9F7F1]/90 backdrop-blur-md border-[#E3DFD5]',
      cardBg: 'bg-[#FFFFFF] border-[#E8E4DA] shadow-xs',
      accent: 'text-[#8A2424]',
      subtext: 'text-[#666055]'
    },
    sepia: {
      bg: 'bg-[#F4ECD8]',
      text: 'text-[#2C2218]',
      headerBg: 'bg-[#F4ECD8]/90 backdrop-blur-md border-[#DFD3BA]',
      cardBg: 'bg-[#FAF3E3] border-[#DFD3BA] shadow-xs',
      accent: 'text-[#9C381E]',
      subtext: 'text-[#7D6B57]'
    },
    dark: {
      bg: 'bg-[#151515]',
      text: 'text-[#DCD8D0]',
      headerBg: 'bg-[#151515]/90 backdrop-blur-md border-[#2A2A2A]',
      cardBg: 'bg-[#1D1D1D] border-[#2E2E2E] shadow-sm',
      accent: 'text-[#D4A373]',
      subtext: 'text-[#9E988D]'
    }
  }[themeMode];

  const fontSizeClass = {
    sm: 'text-[15px] leading-[1.7]',
    md: 'text-[17px] sm:text-[18px] leading-[1.8]',
    lg: 'text-[20px] sm:text-[21px] leading-[1.85]',
    xl: 'text-[23px] sm:text-[24px] leading-[1.9]'
  }[fontSize];

  const fontClass = fontFamily === 'serif' ? 'font-serif' : 'font-sans';

  // Filter blocks if search query present
  const displayBlocks = doc.blocks.filter(b => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (b.text && b.text.toLowerCase().includes(q)) || (b.caption && b.caption.toLowerCase().includes(q));
  });

  return (
    <div id="book_reader_root" className={`min-h-screen ${themeStyles.bg} ${themeStyles.text} transition-colors duration-200 flex flex-col`}>
      
      {/* TOP HEADER BAR */}
      <header id="book_reader_header" className={`sticky top-0 z-30 border-b px-4 py-3 sm:px-8 transition-colors ${themeStyles.headerBg}`}>
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Back & Title */}
          <div className="flex items-center gap-3">
            <button
              id="book_back_btn"
              onClick={onBack}
              className="px-3 py-1.5 rounded-md border border-black/10 hover:border-black/30 dark:border-white/10 dark:hover:border-white/30 text-xs tracking-wider uppercase flex items-center gap-1.5 transition-all active:scale-95"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>{lang === 'ru' ? 'Оракул' : 'Oracle'}</span>
            </button>

            <div className="hidden sm:block">
              <span className="text-xs uppercase tracking-widest opacity-60 font-mono">
                {lang === 'ru' ? 'Яков Кельберт' : 'Jacob Kelbert'}
              </span>
              <span className="mx-2 opacity-30">•</span>
              <span className="text-xs font-semibold">
                {lang === 'ru' ? 'Прогулки по острову' : 'Walks Around the Island'}
              </span>
            </div>
          </div>

          {/* Center/Right: Language Toggle & Controls */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            
            {/* Language Switcher */}
            <div id="book_lang_toggle" className="inline-flex rounded-md p-0.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono">
              <button
                id="book_lang_ru_btn"
                onClick={() => setLang('ru')}
                className={`px-2.5 py-1 rounded transition-all ${lang === 'ru' ? 'bg-white dark:bg-[#2A2A2A] shadow-xs font-bold text-black dark:text-white' : 'opacity-60 hover:opacity-100'}`}
              >
                Русский (Оригинал)
              </button>
              <button
                id="book_lang_en_btn"
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded transition-all ${lang === 'en' ? 'bg-white dark:bg-[#2A2A2A] shadow-xs font-bold text-black dark:text-white' : 'opacity-60 hover:opacity-100'}`}
              >
                English (AI Translation)
              </button>
            </div>

            {/* Typography / Theme dropdown controls */}
            <div className="hidden md:flex items-center gap-1 border-l pl-2 border-black/10 dark:border-white/10">
              
              {/* Font toggle */}
              <button
                id="book_font_toggle"
                onClick={() => setFontFamily(prev => prev === 'serif' ? 'sans' : 'serif')}
                className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 text-xs font-mono"
                title="Toggle font family"
              >
                {fontFamily === 'serif' ? 'Serif' : 'Sans'}
              </button>

              {/* Font Size */}
              <div className="inline-flex text-xs font-mono">
                <button
                  id="book_size_sm"
                  onClick={() => setFontSize('sm')}
                  className={`px-1.5 py-1 rounded ${fontSize === 'sm' ? 'font-bold underline' : 'opacity-60'}`}
                >
                  A-
                </button>
                <button
                  id="book_size_md"
                  onClick={() => setFontSize('md')}
                  className={`px-1.5 py-1 rounded ${fontSize === 'md' ? 'font-bold underline' : 'opacity-60'}`}
                >
                  A
                </button>
                <button
                  id="book_size_lg"
                  onClick={() => setFontSize('lg')}
                  className={`px-1.5 py-1 rounded ${fontSize === 'lg' ? 'font-bold underline' : 'opacity-60'}`}
                >
                  A+
                </button>
                <button
                  id="book_size_xl"
                  onClick={() => setFontSize('xl')}
                  className={`px-1.5 py-1 rounded ${fontSize === 'xl' ? 'font-bold underline' : 'opacity-60'}`}
                >
                  A++
                </button>
              </div>

              {/* Theme modes */}
              <div className="inline-flex gap-1 ml-1">
                <button
                  id="book_theme_paper"
                  onClick={() => setThemeMode('paper')}
                  className={`w-5 h-5 rounded-full border border-black/20 bg-[#F9F7F1] ${themeMode === 'paper' ? 'ring-2 ring-black/50' : ''}`}
                  title="Paper mode"
                />
                <button
                  id="book_theme_sepia"
                  onClick={() => setThemeMode('sepia')}
                  className={`w-5 h-5 rounded-full border border-black/20 bg-[#F4ECD8] ${themeMode === 'sepia' ? 'ring-2 ring-amber-700' : ''}`}
                  title="Sepia mode"
                />
                <button
                  id="book_theme_dark"
                  onClick={() => setThemeMode('dark')}
                  className={`w-5 h-5 rounded-full border border-white/20 bg-[#151515] ${themeMode === 'dark' ? 'ring-2 ring-white/50' : ''}`}
                  title="Dark mode"
                />
              </div>
            </div>

            {/* Login / Page Editor button */}
            <button
              id="book_editor_login_btn"
              onClick={handleOpenEditor}
              className="px-3 py-1.5 rounded-md bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 text-xs font-mono flex items-center gap-1.5 shadow-xs hover:bg-stone-800 dark:hover:bg-stone-200 transition-all active:scale-95 ml-1"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>{isAuthenticated ? (lang === 'ru' ? 'Редактор' : 'Word Editor') : (lang === 'ru' ? 'Вход / Редактор' : 'Login / Editor')}</span>
            </button>

          </div>
        </div>
      </header>

      {/* ENGLISH TRANSLATION BANNER & ORIGINAL RUSSIAN LINK */}
      {lang === 'en' && (
        <div id="ai_translation_notice_banner" className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2.5 text-xs text-amber-900 dark:text-amber-200">
          <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300 font-mono font-semibold uppercase text-[10px] tracking-wider">
                AI Translation
              </span>
              <span>
                This English version was translated with Gemini AI from the original Russian text by Jacob Kelbert.
              </span>
            </div>
            <button
              id="switch_to_russian_link"
              onClick={() => setLang('ru')}
              className="font-semibold underline hover:text-amber-700 dark:hover:text-amber-100 flex items-center gap-1"
            >
              <span>Read original in Russian (Оригинал на русском)</span>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT CONTAINER */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-5 sm:px-10 py-10 sm:py-16">
        
        {/* HERO TITLE & METADATA */}
        <div id="book_title_section" className="text-center mb-12 sm:mb-16 border-b border-black/10 dark:border-white/10 pb-10">
          <div className="inline-block mb-3 px-3 py-1 rounded-full border border-black/10 dark:border-white/10 text-[11px] font-mono tracking-widest uppercase opacity-70">
            {lang === 'ru' ? 'Паломнические записки • Кипр' : 'Pilgrimage Chronicles • Cyprus'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight mb-4 text-stone-900 dark:text-stone-100">
            {doc.title || (lang === 'ru' ? 'Прогулки по острову' : 'Walks Around the Island')}
          </h1>
          <p className="text-base sm:text-lg font-serif italic text-stone-600 dark:text-stone-400 max-w-xl mx-auto mb-5">
            {lang === 'ru' ? 'Яков Кельберт' : 'Jacob Kelbert'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono opacity-60">
            <a
              href={doc.originalUrl || 'https://vozduh.wordpress.com/2025/08/01/travels_cyprus/'}
              target="_blank"
              rel="noreferrer"
              className="underline hover:opacity-100 flex items-center gap-1"
            >
              <span>{lang === 'ru' ? 'Первоисточник на WordPress' : 'Original WordPress Post'}</span>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <span>•</span>
            <span>{doc.blocks.length} {lang === 'ru' ? 'фрагментов' : 'sections'}</span>
            {doc.updatedAt && (
              <>
                <span>•</span>
                <span>{lang === 'ru' ? 'Синхронизировано' : 'Synced'}: {new Date(doc.updatedAt).toLocaleDateString()}</span>
              </>
            )}
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="mb-10 max-w-md mx-auto">
          <div className="relative">
            <input
              id="book_search_input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'ru' ? 'Поиск по тексту (напр. Харлампий, монастырь)...' : 'Search text (e.g. Haralampios, monastery)...'}
              className="w-full pl-9 pr-8 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600 transition-all font-sans"
            />
            <svg className="w-4 h-4 absolute left-3 top-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-xs opacity-50 hover:opacity-100 p-0.5"
              >
                ✕
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-xs font-mono opacity-60 text-center mt-2">
              {lang === 'ru' ? `Найдено фрагментов: ${displayBlocks.length}` : `Matches found: ${displayBlocks.length}`}
            </p>
          )}
        </div>

        {/* READING FLOW */}
        <article className={`space-y-6 ${fontSizeClass} ${fontClass}`}>
          {displayBlocks.map((block, idx) => {
            
            // Render Divider / Section Asterisks
            if (block.type === 'divider' || block.text?.trim() === '***') {
              return (
                <div key={block.id || idx} className="py-6 flex items-center justify-center gap-3 opacity-40">
                  <div className="w-12 h-px bg-current" />
                  <span className="font-serif tracking-widest text-sm">❦</span>
                  <div className="w-12 h-px bg-current" />
                </div>
              );
            }

            // Render Headings
            if (block.type === 'heading') {
              return (
                <h2
                  key={block.id || idx}
                  className="text-2xl sm:text-3xl font-serif font-bold pt-6 pb-2 text-stone-900 dark:text-stone-100"
                >
                  {block.text}
                </h2>
              );
            }

            // Render Images & Captions
            if (block.type === 'image') {
              return (
                <figure
                  key={block.id || idx}
                  className="my-8 rounded-xl overflow-hidden bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-md group"
                >
                  <div className="relative overflow-hidden cursor-zoom-in" onClick={() => block.src && setActiveImageZoom(block.src)}>
                    <img
                      src={block.src}
                      alt={block.caption || block.alt || 'Cyprus travel visual'}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-auto max-h-[680px] object-contain mx-auto transition-transform duration-300 group-hover:scale-[1.01]"
                    />
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm pointer-events-none">
                      {lang === 'ru' ? 'Нажмите для увеличения' : 'Click to enlarge'}
                    </div>
                  </div>
                  {block.caption && (
                    <figcaption className="px-4 py-3 text-center text-sm font-sans italic opacity-75 border-t border-black/5 dark:border-white/5">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );
            }

            // Render Quotes
            if (block.type === 'quote') {
              return (
                <blockquote
                  key={block.id || idx}
                  className="border-l-2 border-amber-600/70 pl-5 py-2 my-4 italic opacity-90"
                >
                  {block.text}
                </blockquote>
              );
            }

            // Custom Inline Styles if any
            const inlineStyles: React.CSSProperties = {
              fontWeight: block.customStyle?.bold ? 'bold' : undefined,
              fontStyle: block.customStyle?.italic ? 'italic' : undefined,
              textDecoration: block.customStyle?.underline ? 'underline' : undefined,
              textAlign: block.customStyle?.align || 'inherit',
              color: block.customStyle?.color || undefined
            };

            // Standard Paragraph
            return (
              <p
                key={block.id || idx}
                style={inlineStyles}
                className="leading-relaxed font-serif text-justify sm:text-left transition-colors"
              >
                {block.text}
              </p>
            );
          })}
        </article>

        {/* FOOTER OF ARTICLE */}
        <div className="mt-16 pt-10 border-t border-black/10 dark:border-white/10 text-center space-y-4">
          <div className="text-sm font-serif italic opacity-70">
            — {lang === 'ru' ? 'Конец паломнических заметок' : 'End of pilgrimage memoirs'} —
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono pt-2">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-3 py-1.5 rounded border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5"
            >
              ↑ {lang === 'ru' ? 'Наверх' : 'Back to top'}
            </button>
            <button
              onClick={handleOpenEditor}
              className="px-3 py-1.5 rounded bg-amber-600/10 text-amber-900 dark:text-amber-200 border border-amber-600/30 hover:bg-amber-600/20"
            >
              ✍ {lang === 'ru' ? 'Предложить правки в редакторе' : 'Edit / Make corrections'}
            </button>
          </div>
        </div>

      </main>

      {/* IMAGE ZOOM MODAL */}
      <AnimatePresence>
        {activeImageZoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImageZoom(null)}
            className="fixed inset-0 z-50 bg-black/90 p-4 sm:p-10 flex items-center justify-center cursor-zoom-out backdrop-blur-md"
          >
            <img
              src={activeImageZoom}
              alt="Zoomed"
              referrerPolicy="no-referrer"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            <button
              onClick={() => setActiveImageZoom(null)}
              className="absolute top-5 right-5 text-white/70 hover:text-white text-2xl font-mono p-2"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOGIN MODAL */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <motion.div
            id="book_login_modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl max-w-sm w-full p-6 shadow-2xl text-stone-900 dark:text-stone-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  <h3 className="font-bold text-base font-serif">
                    {lang === 'ru' ? 'Вход в Редактор Книги' : 'Book Editor Access'}
                  </h3>
                </div>
                <button
                  onClick={() => { setIsLoginModalOpen(false); setLoginError(''); }}
                  className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 text-sm font-mono"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-400 mb-5 leading-relaxed">
                {lang === 'ru'
                  ? 'Введите пароль администратора для внесения правок и сохранения их в базу данных Firebase.'
                  : 'Enter the editor password to make corrections and synchronize them with the Firebase database.'}
              </p>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider mb-1 text-stone-500 dark:text-stone-400">
                    {lang === 'ru' ? 'Пароль' : 'Password'}
                  </label>
                  <input
                    id="book_editor_password_input"
                    type="password"
                    autoFocus
                    value={passwordInput}
                    onChange={(e) => { setPasswordInput(e.target.value); setLoginError(''); }}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 rounded-md bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  {loginError && (
                    <p className="text-xs text-red-500 mt-1.5 font-medium">{loginError}</p>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => { setIsLoginModalOpen(false); setLoginError(''); }}
                    className="px-3 py-1.5 text-xs rounded border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800"
                  >
                    {lang === 'ru' ? 'Отмена' : 'Cancel'}
                  </button>
                  <button
                    id="book_login_submit_btn"
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold rounded bg-amber-600 text-white hover:bg-amber-700 shadow-sm transition-all"
                  >
                    {lang === 'ru' ? 'Войти в редактор' : 'Unlock Editor'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RICH TEXT PAGE EDITOR MODAL (MICROSOFT WORD STYLE) */}
      <AnimatePresence>
        {isEditorOpen && (
          <motion.div
            id="rich_word_editor_modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-md flex flex-col"
          >
            {/* WORD STYLE RIBBON HEADER */}
            <div className="bg-stone-900 text-stone-100 border-b border-stone-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-lg">
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center font-bold text-white shadow-xs">
                  W
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">
                      {lang === 'ru' ? 'Редактор рукописи' : 'Manuscript Word Editor'}
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 font-mono text-[10px] uppercase">
                      {lang === 'ru' ? 'Русская версия' : 'English Edition'}
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-400 font-mono">
                    Firebase Firestore Sync • {editBlocks.length} {lang === 'ru' ? 'абзацев' : 'blocks'}
                  </div>
                </div>
              </div>

              {/* SAVE / ACTIONS */}
              <div className="flex items-center gap-2">
                {saveStatus === 'saved' && (
                  <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                    ✓ {lang === 'ru' ? 'Сохранено в Firebase' : 'Saved to Firebase'}
                  </span>
                )}
                {saveStatus === 'error' && (
                  <span className="text-xs text-rose-400 font-mono">
                    ⚠ {saveErrorMsg || 'Error'}
                  </span>
                )}
                
                <button
                  id="editor_save_firebase_btn"
                  onClick={handleSaveToFirebase}
                  disabled={saveStatus === 'saving'}
                  className="px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all active:scale-95 disabled:opacity-50"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  <span>{saveStatus === 'saving' ? (lang === 'ru' ? 'Сохранение...' : 'Saving...') : (lang === 'ru' ? 'Сохранить в Firebase' : 'Save to Firebase')}</span>
                </button>

                <button
                  onClick={() => setIsEditorOpen(false)}
                  className="px-3 py-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-mono"
                >
                  {lang === 'ru' ? 'Закрыть' : 'Close'}
                </button>
              </div>
            </div>

            {/* EDITOR WORKSPACE */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#222222] flex justify-center">
              
              {/* VIRTUAL PAPER SHEET */}
              <div className="max-w-3xl w-full bg-[#FFFFFF] text-[#111111] shadow-2xl rounded-sm p-8 sm:p-14 min-h-[90vh] space-y-6 font-serif">
                
                <div className="text-center pb-6 border-b border-stone-200">
                  <h2 className="text-2xl font-bold font-serif mb-1">
                    {doc.title}
                  </h2>
                  <p className="text-xs text-stone-500 font-mono">
                    {lang === 'ru' ? 'Режим редактирования и корректуры' : 'Editing and Proofreading Workspace'}
                  </p>
                </div>

                {/* BLOCK LIST */}
                {editBlocks.map((block, idx) => {
                  const isActive = activeEditIndex === idx;

                  if (block.type === 'image') {
                    return (
                      <div
                        key={block.id || idx}
                        onClick={() => setActiveEditIndex(idx)}
                        className={`p-3 rounded border transition-all ${isActive ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/10' : 'border-stone-200 hover:border-stone-300'}`}
                      >
                        <div className="flex items-center justify-between text-xs text-stone-400 font-mono mb-2">
                          <span>[Фотография #{idx + 1}]</span>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDeleteBlock(idx); }}
                            className="text-red-500 hover:underline"
                          >
                            Удалить
                          </button>
                        </div>
                        <img
                          src={block.src}
                          alt="Illustration"
                          referrerPolicy="no-referrer"
                          className="max-h-56 mx-auto rounded object-contain border mb-2"
                        />
                        <input
                          type="text"
                          value={block.caption || ''}
                          onChange={(e) => handleUpdateBlockCaption(idx, e.target.value)}
                          placeholder={lang === 'ru' ? 'Подпись к иллюстрации...' : 'Image caption...'}
                          className="w-full px-2 py-1 text-xs italic font-sans border border-stone-300 rounded bg-stone-50 focus:bg-white focus:outline-blue-500"
                        />
                      </div>
                    );
                  }

                  if (block.type === 'divider' || block.text?.trim() === '***') {
                    return (
                      <div key={block.id || idx} className="py-2 text-center text-stone-400 font-serif tracking-widest text-xs">
                        * * *
                      </div>
                    );
                  }

                  return (
                    <div
                      key={block.id || idx}
                      onClick={() => setActiveEditIndex(idx)}
                      className={`relative group p-2 rounded transition-all ${isActive ? 'bg-amber-50/40 ring-1 ring-blue-400' : 'hover:bg-stone-50'}`}
                    >
                      {/* MINI WORD TOOLBAR ON ACTIVE BLOCK */}
                      {isActive && (
                        <div className="mb-2 p-1 bg-stone-100 border border-stone-300 rounded text-xs flex items-center gap-1 font-sans shadow-xs">
                          <button
                            onClick={() => handleToggleStyle(idx, 'bold')}
                            className={`w-6 h-6 rounded font-bold ${block.customStyle?.bold ? 'bg-stone-300' : 'hover:bg-stone-200'}`}
                            title="Bold"
                          >
                            B
                          </button>
                          <button
                            onClick={() => handleToggleStyle(idx, 'italic')}
                            className={`w-6 h-6 rounded italic font-serif ${block.customStyle?.italic ? 'bg-stone-300' : 'hover:bg-stone-200'}`}
                            title="Italic"
                          >
                            I
                          </button>
                          <button
                            onClick={() => handleToggleStyle(idx, 'underline')}
                            className={`w-6 h-6 rounded underline ${block.customStyle?.underline ? 'bg-stone-300' : 'hover:bg-stone-200'}`}
                            title="Underline"
                          >
                            U
                          </button>
                          
                          <div className="w-px h-4 bg-stone-300 mx-1" />

                          <button
                            onClick={() => handleSetAlignment(idx, 'left')}
                            className="px-1.5 py-0.5 rounded hover:bg-stone-200 text-[10px]"
                            title="Left"
                          >
                            Left
                          </button>
                          <button
                            onClick={() => handleSetAlignment(idx, 'center')}
                            className="px-1.5 py-0.5 rounded hover:bg-stone-200 text-[10px]"
                            title="Center"
                          >
                            Center
                          </button>
                          <button
                            onClick={() => handleSetAlignment(idx, 'justify')}
                            className="px-1.5 py-0.5 rounded hover:bg-stone-200 text-[10px]"
                            title="Justify"
                          >
                            Justify
                          </button>

                          <div className="w-px h-4 bg-stone-300 mx-1" />

                          <button
                            onClick={() => handleAddParagraphBelow(idx)}
                            className="px-1.5 py-0.5 rounded bg-blue-100 hover:bg-blue-200 text-blue-800 text-[11px]"
                            title="Add paragraph below"
                          >
                            + Абзац
                          </button>

                          <button
                            onClick={() => handleDeleteBlock(idx)}
                            className="px-1.5 py-0.5 rounded hover:bg-red-100 text-red-600 text-[11px] ml-auto"
                            title="Delete"
                          >
                            ✕
                          </button>
                        </div>
                      )}

                      <textarea
                        value={block.text || ''}
                        onChange={(e) => handleUpdateBlockText(idx, e.target.value)}
                        rows={Math.max(2, Math.ceil((block.text?.length || 0) / 75))}
                        style={{
                          fontWeight: block.customStyle?.bold ? 'bold' : 'normal',
                          fontStyle: block.customStyle?.italic ? 'italic' : 'normal',
                          textDecoration: block.customStyle?.underline ? 'underline' : 'none',
                          textAlign: block.customStyle?.align || 'inherit'
                        }}
                        className="w-full bg-transparent border-0 resize-none font-serif text-[17px] leading-relaxed text-stone-900 focus:outline-none"
                      />
                    </div>
                  );
                })}

              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
