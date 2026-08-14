import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookDocument, BookBlock } from '../src/bookTypes';
import { fetchBookDocument, saveBookDocument, subscribeToBookDocument } from '../src/bookService';
import { INITIAL_RU_DOC, INITIAL_EN_DOC } from '../src/initialBookData';

interface BookReaderProps {
  onBack: () => void;
  initialLang?: 'ru' | 'en';
  theme?: 'SUPREMATIST' | 'IMPRESSIONIST';
  setTheme?: React.Dispatch<React.SetStateAction<'SUPREMATIST' | 'IMPRESSIONIST'>>;
  uiLanguage?: 'EN' | 'RU';
  setUiLanguage?: React.Dispatch<React.SetStateAction<'EN' | 'RU'>>;
}

export type FontOption = 'pt-serif' | 'merriweather' | 'lora' | 'garamond' | 'playfair' | 'inter' | 'mono';

const FONT_OPTIONS: { id: FontOption; nameRu: string; nameEn: string; css: string }[] = [
  { id: 'pt-serif', nameRu: 'PT Serif (Классика)', nameEn: 'PT Serif (Classic)', css: '"PT Serif", Georgia, serif' },
  { id: 'merriweather', nameRu: 'Merriweather (Книжный)', nameEn: 'Merriweather (Book)', css: '"Merriweather", Georgia, serif' },
  { id: 'lora', nameRu: 'Lora (Изящный)', nameEn: 'Lora (Elegant)', css: '"Lora", Georgia, serif' },
  { id: 'garamond', nameRu: 'EB Garamond (Антиква)', nameEn: 'EB Garamond (Antiqua)', css: '"EB Garamond", Garamond, serif' },
  { id: 'playfair', nameRu: 'Playfair Display', nameEn: 'Playfair Display', css: '"Playfair Display", Georgia, serif' },
  { id: 'inter', nameRu: 'Inter (Без засечек)', nameEn: 'Inter (Modern Sans)', css: '"Inter", -apple-system, sans-serif' },
  { id: 'mono', nameRu: 'JetBrains Mono', nameEn: 'JetBrains Mono', css: '"JetBrains Mono", Courier, monospace' },
];

export const BookReader: React.FC<BookReaderProps> = ({
  onBack,
  initialLang = 'ru',
  theme = 'SUPREMATIST',
  setTheme,
  uiLanguage = 'RU',
  setUiLanguage
}) => {
  // Sync internal manuscript language with uiLanguage if provided
  const [lang, setLang] = useState<'ru' | 'en'>(
    uiLanguage ? (uiLanguage.toLowerCase() as 'ru' | 'en') : initialLang
  );
  
  const [doc, setDoc] = useState<BookDocument>(lang === 'ru' ? INITIAL_RU_DOC : INITIAL_EN_DOC);
  const [loading, setLoading] = useState(false);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [selectedFont, setSelectedFont] = useState<FontOption>('pt-serif');
  const [showFontMenu, setShowFontMenu] = useState(false);
  
  // Custom ambiance mode (auto-aligns with Mode A / Mode B by default)
  const [ambianceOverride, setAmbianceOverride] = useState<'auto' | 'paper' | 'sepia' | 'dark' | 'stark'>('auto');

  // Scroll Progress State
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Editor Search & Navigation state
  const [editorSearchQuery, setEditorSearchQuery] = useState('');
  const [editorMatchIndex, setEditorMatchIndex] = useState(0);
  const [editorShowOnlyMatches, setEditorShowOnlyMatches] = useState(false);
  const editorCanvasRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const isRenoir = theme === 'IMPRESSIONIST';

  // Synchronize language when prop changes
  useEffect(() => {
    if (uiLanguage) {
      const targetLang = uiLanguage.toLowerCase() as 'ru' | 'en';
      if (targetLang !== lang) {
        setLang(targetLang);
      }
    }
  }, [uiLanguage]);

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

  // Handle Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollEl = containerRef.current || document.documentElement || document.body;
      const scrollTop = window.scrollY || scrollEl.scrollTop || 0;
      const scrollHeight = (scrollEl.scrollHeight || document.body.scrollHeight) - window.innerHeight;
      
      if (scrollHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
        setScrollProgress(progress);
      }
      setShowScrollTop(scrollTop > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageChange = (newLang: 'ru' | 'en') => {
    setLang(newLang);
    if (setUiLanguage) {
      setUiLanguage(newLang.toUpperCase() as 'EN' | 'RU');
    }
  };

  const handleThemeToggle = () => {
    if (setTheme) {
      setTheme(t => t === 'SUPREMATIST' ? 'IMPRESSIONIST' : 'SUPREMATIST');
    }
  };

  // Download PDF handler - triggers clean print-to-PDF formatting
  const handleDownloadPDF = () => {
    const prevTitle = document.title;
    const author = lang === 'ru' ? 'Яков Кельберт' : 'Jacob Kelbert';
    const bookTitle = doc.title || (lang === 'ru' ? 'Прогулки по острову' : 'Walks Around the Island');
    document.title = `${author} - ${bookTitle}`;

    // Clear search so all chapters/blocks are included in the generated PDF
    if (searchQuery) {
      setSearchQuery('');
    }

    setTimeout(() => {
      window.print();
      document.title = prevTitle;
    }, 150);
  };

  // Handle Login submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'NO1tourist2') {
      setIsAuthenticated(true);
      setIsLoginModalOpen(false);
      setPasswordInput('');
      setLoginError('');
      setEditBlocks(JSON.parse(JSON.stringify(doc.blocks)));
      setEditorSearchQuery('');
      setEditorShowOnlyMatches(false);
      setIsEditorOpen(true);
    } else {
      setLoginError(lang === 'ru' ? 'Неверный пароль' : 'Incorrect password');
    }
  };

  const handleOpenEditor = () => {
    if (isAuthenticated) {
      setEditBlocks(JSON.parse(JSON.stringify(doc.blocks)));
      setEditorSearchQuery('');
      setEditorShowOnlyMatches(false);
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

  const handleAddBlockAtEnd = () => {
    const newBlock: BookBlock = {
      id: `block_custom_${Date.now()}`,
      type: 'paragraph',
      text: lang === 'ru' ? 'Новый фрагмент текста...' : 'New section text...'
    };
    setEditBlocks(prev => [...prev, newBlock]);
    setActiveEditIndex(editBlocks.length);
    setTimeout(() => {
      if (editorCanvasRef.current) {
        editorCanvasRef.current.scrollTo({
          top: editorCanvasRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 100);
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

  // Editor Search Matches Indices
  const editorMatchingIndices = useMemo(() => {
    if (!editorSearchQuery.trim()) return [];
    const q = editorSearchQuery.toLowerCase().trim();
    const indices: number[] = [];
    editBlocks.forEach((b, i) => {
      const matchText = b.text && b.text.toLowerCase().includes(q);
      const matchCaption = b.caption && b.caption.toLowerCase().includes(q);
      if (matchText || matchCaption) {
        indices.push(i);
      }
    });
    return indices;
  }, [editBlocks, editorSearchQuery]);

  // Navigate matching search results in editor
  const handleNavigateEditorMatch = (direction: 1 | -1) => {
    if (editorMatchingIndices.length === 0) return;
    const nextIdx = (editorMatchIndex + direction + editorMatchingIndices.length) % editorMatchingIndices.length;
    setEditorMatchIndex(nextIdx);
    const targetBlockIndex = editorMatchingIndices[nextIdx];
    setActiveEditIndex(targetBlockIndex);
    const el = blockRefs.current[targetBlockIndex];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Dynamic Theme Styling based on Mode A / Mode B & Reading ambiance
  const currentAmbiance = ambianceOverride === 'auto'
    ? (isRenoir ? 'dark' : 'paper')
    : ambianceOverride;

  const skinStyles = useMemo(() => {
    switch (currentAmbiance) {
      case 'dark':
        return {
          bg: isRenoir ? 'bg-[#0f0505]' : 'bg-[#121212]',
          text: isRenoir ? 'text-[#fef3c7]' : 'text-[#f3ede4]',
          headerBg: isRenoir ? 'bg-[#0f0505]/95 border-amber-900/30' : 'bg-[#121212]/95 border-stone-800',
          accent: isRenoir ? 'text-amber-400' : 'text-stone-300',
          accentBorder: isRenoir ? 'border-amber-600/70' : 'border-stone-500',
          divider: isRenoir ? 'bg-amber-800/40 text-amber-500' : 'bg-stone-700 text-stone-400',
          searchBg: isRenoir ? 'bg-amber-950/50 border-amber-800/50 text-amber-100 placeholder-amber-300/40 focus:border-amber-500 focus:ring-amber-500/30' : 'bg-stone-900 border-stone-700 text-stone-100 placeholder-stone-400 focus:border-stone-400 focus:ring-stone-600',
          cardBg: isRenoir ? 'bg-amber-950/30 border-amber-900/30' : 'bg-stone-900/60 border-stone-800',
          pillBg: isRenoir ? 'bg-amber-950/40 border-amber-900/30 text-amber-200' : 'bg-stone-900 border-stone-700 text-stone-200',
          subtext: isRenoir ? 'text-amber-200/60' : 'text-stone-400',
          heroTitle: isRenoir ? 'text-amber-100' : 'text-stone-100',
          quoteText: isRenoir ? 'text-amber-200/90' : 'text-stone-200',
          progressBg: isRenoir ? 'bg-gradient-to-r from-amber-600 via-amber-400 to-amber-500' : 'bg-gradient-to-r from-red-600 to-stone-400'
        };
      case 'sepia':
        return {
          bg: 'bg-[#F4ECD8]',
          text: 'text-[#2C2218]',
          headerBg: 'bg-[#F4ECD8]/95 border-[#DFD3BA]',
          accent: 'text-[#9C381E]',
          accentBorder: 'border-[#9C381E]',
          divider: 'bg-[#DFD3BA] text-[#7D6B57]',
          searchBg: 'bg-[#FAF3E3] border-[#DFD3BA] text-[#2C2218] placeholder-[#7D6B57]/60 focus:border-[#9C381E] focus:ring-[#9C381E]/30',
          cardBg: 'bg-[#FAF3E3] border-[#DFD3BA]',
          pillBg: 'bg-[#EADDC2] border-[#DFD3BA] text-[#2C2218]',
          subtext: 'text-[#7D6B57]',
          heroTitle: 'text-[#2C2218]',
          quoteText: 'text-[#3E2E20]',
          progressBg: 'bg-[#9C381E]'
        };
      case 'stark':
        return {
          bg: 'bg-[#FFFFFF]',
          text: 'text-[#000000]',
          headerBg: 'bg-[#FFFFFF]/95 border-black/10',
          accent: 'text-[#DC2626]',
          accentBorder: 'border-[#DC2626]',
          divider: 'bg-black/15 text-black',
          searchBg: 'bg-stone-100 border-stone-300 text-black placeholder-stone-500 focus:border-black focus:ring-black/20',
          cardBg: 'bg-stone-50 border-black/10',
          pillBg: 'bg-stone-100 border-black/10 text-black',
          subtext: 'text-stone-600',
          heroTitle: 'text-black',
          quoteText: 'text-stone-900',
          progressBg: 'bg-[#DC2626]'
        };
      case 'paper':
      default:
        return {
          bg: 'bg-[#FAF8F5]',
          text: 'text-[#1F1E1D]',
          headerBg: 'bg-[#FAF8F5]/95 border-[#E5E0D8]',
          accent: isRenoir ? 'text-amber-800' : 'text-[#8A2424]',
          accentBorder: isRenoir ? 'border-amber-700' : 'border-[#8A2424]',
          divider: 'bg-[#E5E0D8] text-[#666055]',
          searchBg: 'bg-[#FFFFFF] border-[#E2DDD3] text-[#1F1E1D] placeholder-[#666055]/60 focus:border-stone-800 focus:ring-stone-400/30',
          cardBg: 'bg-[#FFFFFF] border-[#E5E0D8]',
          pillBg: 'bg-[#EFECE6] border-[#E5E0D8] text-[#1F1E1D]',
          subtext: 'text-[#666055]',
          heroTitle: 'text-[#1F1E1D]',
          quoteText: 'text-[#2D2A26]',
          progressBg: isRenoir ? 'bg-amber-700' : 'bg-red-600'
        };
    }
  }, [currentAmbiance, isRenoir]);

  const fontSizeClass = {
    sm: 'text-[15px] sm:text-[16px] leading-[1.75]',
    md: 'text-[17px] sm:text-[18.5px] leading-[1.85]',
    lg: 'text-[20px] sm:text-[21.5px] leading-[1.9]',
    xl: 'text-[23px] sm:text-[24.5px] leading-[1.95]'
  }[fontSize];

  const currentFontConfig = FONT_OPTIONS.find(f => f.id === selectedFont) || FONT_OPTIONS[0];

  // Filter blocks if search query present
  const displayBlocks = useMemo(() => {
    if (!searchQuery.trim()) return doc.blocks;
    const q = searchQuery.toLowerCase().trim();
    return doc.blocks.filter(b => {
      const matchText = b.text && b.text.toLowerCase().includes(q);
      const matchCaption = b.caption && b.caption.toLowerCase().includes(q);
      return matchText || matchCaption;
    });
  }, [doc.blocks, searchQuery]);

  return (
    <div
      ref={containerRef}
      id="book_reader_root"
      className={`min-h-screen w-full ${skinStyles.bg} ${skinStyles.text} transition-colors duration-300 flex flex-col relative selection:bg-amber-500/30 selection:text-current`}
    >
      {/* READING PROGRESS TOP BAR */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-black/5 pointer-events-none">
        <div
          className={`h-full transition-all duration-150 ${skinStyles.progressBg}`}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* STICKY HEADER WITH GLOBAL SKIN & CONTROLS */}
      <header
        id="book_reader_header"
        className={`sticky top-0 z-40 border-b backdrop-blur-xl px-4 py-3 sm:px-8 transition-colors ${skinStyles.headerBg}`}
      >
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Back to Main Application */}
          <div className="flex items-center gap-3">
            <button
              id="book_back_btn"
              onClick={onBack}
              className={`px-3 py-1.5 rounded-full border text-xs tracking-wider uppercase font-mono flex items-center gap-1.5 transition-all active:scale-95 shadow-xs ${
                isRenoir
                  ? 'border-amber-900/40 bg-amber-950/40 text-amber-200 hover:bg-amber-900/60'
                  : 'border-black/10 bg-white/60 text-stone-800 hover:bg-black/5'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>{lang === 'ru' ? 'В Оракул' : 'To Oracle'}</span>
            </button>

            <div className="hidden md:flex items-center gap-2">
              <span className={`text-[11px] uppercase tracking-[0.2em] font-mono font-bold ${skinStyles.subtext}`}>
                {lang === 'ru' ? 'Яков Кельберт' : 'Jacob Kelbert'}
              </span>
              <span className="opacity-30">•</span>
              <span className="text-xs font-semibold tracking-wide">
                {lang === 'ru' ? 'Прогулки по острову' : 'Walks Around the Island'}
              </span>
            </div>
          </div>

          {/* Right: Mode A/B Switcher + Language + Fonts + Reader Controls */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            
            {/* Master Theme Mode A / Mode B & Language Pill (Synchronized with Global UI) */}
            <div className={`flex items-center p-0.5 rounded-full border backdrop-blur-xl ${skinStyles.pillBg}`}>
              <button
                id="book_global_lang_btn"
                onClick={() => handleLanguageChange(lang === 'ru' ? 'en' : 'ru')}
                className="w-8 h-7 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center justify-center hover:opacity-80 transition-all"
                title="Switch Language"
              >
                {lang.toUpperCase()}
              </button>

              <button
                id="book_global_theme_btn"
                onClick={handleThemeToggle}
                className={`px-3 h-7 rounded-full text-[9px] font-black uppercase tracking-widest transition-all shadow-xs ${
                  isRenoir ? 'bg-amber-600 text-white' : 'bg-black text-white'
                }`}
                title="Toggle Mode A / Mode B"
              >
                {theme === 'SUPREMATIST' ? 'Mode A' : 'Mode B'}
              </button>
            </div>

            {/* Reading Ambiance Palette Presets */}
            <div className="hidden lg:flex items-center gap-1 pl-1 border-l border-black/10 dark:border-white/10">
              <button
                onClick={() => setAmbianceOverride('paper')}
                className={`w-5 h-5 rounded-full border border-black/20 bg-[#FAF8F5] transition-transform ${ambianceOverride === 'paper' ? 'scale-110 ring-2 ring-stone-400' : 'hover:scale-105'}`}
                title="Paper Mode"
              />
              <button
                onClick={() => setAmbianceOverride('sepia')}
                className={`w-5 h-5 rounded-full border border-black/20 bg-[#F4ECD8] transition-transform ${ambianceOverride === 'sepia' ? 'scale-110 ring-2 ring-[#9C381E]' : 'hover:scale-105'}`}
                title="Sepia Mode"
              />
              <button
                onClick={() => setAmbianceOverride('dark')}
                className={`w-5 h-5 rounded-full border border-white/20 bg-[#0f0505] transition-transform ${ambianceOverride === 'dark' ? 'scale-110 ring-2 ring-amber-500' : 'hover:scale-105'}`}
                title="Dark Obsidian / Amber Mode"
              />
              <button
                onClick={() => setAmbianceOverride('stark')}
                className={`w-5 h-5 rounded-full border border-black/20 bg-[#FFFFFF] transition-transform ${ambianceOverride === 'stark' ? 'scale-110 ring-2 ring-red-600' : 'hover:scale-105'}`}
                title="Stark Mode"
              />
            </div>

            {/* FONT SELECTOR DROPDOWN */}
            <div className="relative">
              <button
                id="book_font_selector_btn"
                onClick={() => setShowFontMenu(!showFontMenu)}
                className={`px-2.5 py-1 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-all ${
                  isRenoir
                    ? 'border-amber-900/50 bg-amber-950/40 text-amber-200 hover:bg-amber-900/50'
                    : 'border-black/10 bg-white/60 text-stone-800 hover:bg-black/5'
                }`}
                title="Choose Typography / Font"
              >
                <span className="text-[11px]">🔤</span>
                <span className="hidden sm:inline font-sans font-medium text-[11.5px]">
                  {lang === 'ru' ? currentFontConfig.nameRu.split(' ')[0] : currentFontConfig.nameEn.split(' ')[0]}
                </span>
                <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {showFontMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowFontMenu(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.96 }}
                      className={`absolute right-0 top-full mt-1.5 z-50 w-56 rounded-xl border shadow-xl p-1.5 ${
                        isRenoir
                          ? 'bg-[#180a0a] border-amber-900/60 text-amber-100 shadow-black/80'
                          : 'bg-white border-stone-200 text-stone-900 shadow-stone-400/20'
                      }`}
                    >
                      <div className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 opacity-50 border-b border-black/5 dark:border-white/5 mb-1">
                        {lang === 'ru' ? 'Шрифт рукописи' : 'Typography'}
                      </div>
                      {FONT_OPTIONS.map((f) => {
                        const isSelected = f.id === selectedFont;
                        return (
                          <button
                            key={f.id}
                            onClick={() => {
                              setSelectedFont(f.id);
                              setShowFontMenu(false);
                            }}
                            style={{ fontFamily: f.css }}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-sm flex items-center justify-between transition-colors ${
                              isSelected
                                ? isRenoir
                                  ? 'bg-amber-600/30 text-amber-300 font-bold'
                                  : 'bg-stone-100 text-stone-950 font-bold'
                                : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-80 hover:opacity-100'
                            }`}
                          >
                            <span>{lang === 'ru' ? f.nameRu : f.nameEn}</span>
                            {isSelected && <span className="text-xs">✓</span>}
                          </button>
                        );
                      })}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Typography Size Controls */}
            <div className="hidden sm:flex items-center gap-0.5 text-xs font-mono border-l border-black/10 dark:border-white/10 pl-1.5">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-1.5 py-1 rounded ${fontSize === 'sm' ? 'font-bold underline' : 'opacity-60'}`}
                title="Small text"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('md')}
                className={`px-1.5 py-1 rounded ${fontSize === 'md' ? 'font-bold underline' : 'opacity-60'}`}
                title="Standard text"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-1.5 py-1 rounded ${fontSize === 'lg' ? 'font-bold underline' : 'opacity-60'}`}
                title="Large text"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xl')}
                className={`px-1.5 py-1 rounded ${fontSize === 'xl' ? 'font-bold underline' : 'opacity-60'}`}
                title="Extra large text"
              >
                A++
              </button>
            </div>

            {/* Download PDF button */}
            <button
              id="book_download_pdf_header_btn"
              onClick={handleDownloadPDF}
              className={`px-3 py-1.5 rounded-full border text-xs font-mono flex items-center gap-1.5 transition-all active:scale-95 shadow-xs cursor-pointer ${
                isRenoir
                  ? 'border-amber-800/60 bg-amber-950/50 text-amber-200 hover:bg-amber-900/60'
                  : 'border-black/10 bg-white/70 text-stone-800 hover:bg-black/5'
              }`}
              title={lang === 'ru' ? 'Скачать PDF версию книги (Печать)' : 'Download PDF of book (Print)'}
            >
              <svg className="w-3.5 h-3.5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>{lang === 'ru' ? 'PDF' : 'PDF'}</span>
            </button>

            {/* Editor Login / Access Button */}
            <button
              id="book_editor_login_btn"
              onClick={handleOpenEditor}
              className={`px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 shadow-sm transition-all active:scale-95 ${
                isAuthenticated
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : isRenoir
                    ? 'bg-amber-900/60 hover:bg-amber-800 text-amber-100 border border-amber-700/50'
                    : 'bg-stone-900 hover:bg-stone-800 text-stone-100'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span className="hidden xs:inline">
                {isAuthenticated
                  ? (lang === 'ru' ? 'Редактор' : 'Word Editor')
                  : (lang === 'ru' ? 'Вход / Редактор' : 'Login / Editor')}
              </span>
            </button>

          </div>
        </div>
      </header>

      {/* AI TRANSLATION NOTICE BANNER */}
      {lang === 'en' && (
        <div
          id="ai_translation_notice_banner"
          className={`border-b px-4 py-2.5 text-xs transition-colors ${
            isRenoir
              ? 'bg-amber-950/60 border-amber-900/40 text-amber-200'
              : 'bg-amber-500/10 border-amber-500/20 text-amber-900'
          }`}
        >
          <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300 font-mono font-bold uppercase text-[10px] tracking-wider">
                AI Translation
              </span>
              <span>
                English edition rendered by Gemini AI based on the original Russian manuscript by Jacob Kelbert.
              </span>
            </div>
            <button
              id="switch_to_russian_link"
              onClick={() => handleLanguageChange('ru')}
              className="font-semibold underline hover:opacity-80 flex items-center gap-1 cursor-pointer"
            >
              <span>Read in Russian (Оригинал на русском)</span>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* MAIN SCROLLABLE CONTENT BODY */}
      <main
        style={{ fontFamily: currentFontConfig.css }}
        className="flex-1 max-w-4xl w-full mx-auto px-5 sm:px-10 py-10 sm:py-16"
      >
        
        {/* HERO TITLE SECTION */}
        <div id="book_title_section" className="text-center mb-12 sm:mb-16 border-b border-black/10 dark:border-white/10 pb-10">
          <div className={`inline-block mb-3 px-3 py-1 rounded-full border border-black/10 dark:border-white/10 text-[11px] font-mono tracking-widest uppercase opacity-75`}>
            {lang === 'ru' ? 'Паломнические записки • Кипр' : 'Pilgrimage Chronicles • Cyprus'}
          </div>

          <h1 className={`text-3xl sm:text-5xl font-bold tracking-tight mb-4 ${skinStyles.heroTitle}`}>
            {doc.title || (lang === 'ru' ? 'Прогулки по острову' : 'Walks Around the Island')}
          </h1>

          <p className={`text-base sm:text-lg italic max-w-xl mx-auto mb-5 ${skinStyles.subtext}`}>
            {lang === 'ru' ? 'Яков Кельберт' : 'Jacob Kelbert'}
          </p>

          <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-mono ${skinStyles.subtext}`}>
            <a
              href={doc.originalUrl || 'https://vozduh.wordpress.com/2025/08/01/travels_cyprus/'}
              target="_blank"
              rel="noreferrer"
              className="underline hover:opacity-100 flex items-center gap-1 font-medium"
            >
              <span>{lang === 'ru' ? 'Первоисточник на WordPress' : 'Original WordPress Post'}</span>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <span>•</span>
            <button
              id="book_download_pdf_hero_btn"
              onClick={handleDownloadPDF}
              className="underline hover:opacity-100 flex items-center gap-1.5 font-semibold text-rose-600 dark:text-rose-400 cursor-pointer"
              title={lang === 'ru' ? 'Скачать книгу в формате PDF' : 'Download Book as PDF'}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>{lang === 'ru' ? 'Скачать PDF книги' : 'Download PDF of book'}</span>
            </button>
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

        {/* HIGH-CONTRAST READABLE SEARCH BAR */}
        <div className="mb-12 max-w-lg mx-auto">
          <div className="relative shadow-sm rounded-xl overflow-hidden">
            <input
              id="book_search_input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'ru' ? 'Поиск по тексту (напр. Харлампий, монастырь, Троодос)...' : 'Search manuscript (e.g. Haralampios, monastery, Troodos)...'}
              className={`w-full pl-10 pr-9 py-3 rounded-xl border text-sm font-sans focus:outline-none transition-all ${skinStyles.searchBg}`}
            />
            <svg
              className={`w-4 h-4 absolute left-3.5 top-3.5 pointer-events-none ${skinStyles.subtext}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute right-3 top-3 text-xs p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 ${skinStyles.subtext} hover:opacity-100 transition-opacity`}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          {searchQuery && (
            <p className={`text-xs font-mono text-center mt-2.5 ${skinStyles.subtext}`}>
              {lang === 'ru' ? `Найдено фрагментов: ${displayBlocks.length}` : `Matches found: ${displayBlocks.length}`}
            </p>
          )}
        </div>

        {/* MANUSCRIPT READING FLOW */}
        <article className={`space-y-6 sm:space-y-7 ${fontSizeClass}`}>
          {displayBlocks.length === 0 && (
            <div className="text-center py-16 opacity-60 font-mono text-sm">
              {lang === 'ru' ? 'По вашему запросу ничего не найдено.' : 'No matches found for your search.'}
            </div>
          )}

          {displayBlocks.map((block, idx) => {
            
            // Section Divider / Asterisks
            if (block.type === 'divider' || block.text?.trim() === '***') {
              return (
                <div key={block.id || idx} className="py-8 flex items-center justify-center gap-4 opacity-50">
                  <div className={`w-14 h-px ${skinStyles.divider}`} />
                  <span className={`tracking-widest text-base ${skinStyles.accent}`}>❦</span>
                  <div className={`w-14 h-px ${skinStyles.divider}`} />
                </div>
              );
            }

            // Headings
            if (block.type === 'heading') {
              return (
                <h2
                  key={block.id || idx}
                  className={`text-2xl sm:text-3xl font-bold pt-8 pb-3 ${skinStyles.heroTitle}`}
                >
                  {block.text}
                </h2>
              );
            }

            // Images with zoom click & captions
            if (block.type === 'image') {
              return (
                <figure
                  key={block.id || idx}
                  className={`my-10 rounded-2xl overflow-hidden border shadow-lg group transition-colors ${skinStyles.cardBg}`}
                >
                  <div
                    className="relative overflow-hidden cursor-zoom-in bg-black/10 flex items-center justify-center min-h-[220px]"
                    onClick={() => block.src && setActiveImageZoom(block.src)}
                  >
                    <img
                      src={block.src}
                      alt={block.caption || block.alt || 'Manuscript illustration'}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-auto max-h-[720px] object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.01]"
                    />
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 text-white text-xs px-2.5 py-1 rounded-md backdrop-blur-sm pointer-events-none font-mono">
                      {lang === 'ru' ? '🔍 Нажмите для увеличения' : '🔍 Click to enlarge'}
                    </div>
                  </div>
                  {block.caption && (
                    <figcaption className={`px-5 py-3.5 text-center text-sm font-sans italic border-t border-black/5 dark:border-white/5 ${skinStyles.subtext}`}>
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );
            }

            // Blockquotes
            if (block.type === 'quote') {
              return (
                <blockquote
                  key={block.id || idx}
                  className={`border-l-3 ${skinStyles.accentBorder} pl-5 py-2.5 my-6 italic ${skinStyles.quoteText}`}
                >
                  {block.text}
                </blockquote>
              );
            }

            // Custom Inline Styles
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
                className="leading-relaxed text-justify sm:text-left transition-colors"
              >
                {block.text}
              </p>
            );
          })}
        </article>

        {/* BOTTOM NAVIGATION & FOOTER */}
        <div className="mt-20 pt-12 border-t border-black/10 dark:border-white/10 text-center space-y-6">
          <div className={`text-sm italic ${skinStyles.subtext}`}>
            — {lang === 'ru' ? 'Конец паломнических заметок' : 'End of pilgrimage chronicles'} —
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono pt-2">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`px-4 py-2 rounded-full border transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                isRenoir
                  ? 'border-amber-800 bg-amber-950/60 text-amber-200 hover:bg-amber-900/60'
                  : 'border-stone-300 bg-white text-stone-800 hover:bg-stone-50'
              }`}
            >
              ↑ {lang === 'ru' ? 'Наверх' : 'Back to top'}
            </button>

            <button
              id="book_download_pdf_footer_btn"
              onClick={handleDownloadPDF}
              className={`px-4 py-2 rounded-full border transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer ${
                isRenoir
                  ? 'border-rose-900/50 bg-rose-950/40 text-rose-200 hover:bg-rose-900/60'
                  : 'border-rose-300/60 bg-rose-50 text-rose-900 hover:bg-rose-100'
              }`}
              title={lang === 'ru' ? 'Скачать всю книгу в PDF формате' : 'Download Full Book in PDF'}
            >
              <svg className="w-4 h-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>{lang === 'ru' ? 'Скачать книгу (PDF)' : 'Download Book (PDF)'}</span>
            </button>

            <button
              onClick={handleOpenEditor}
              className={`px-4 py-2 rounded-full border transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                isRenoir
                  ? 'bg-amber-600/20 text-amber-200 border-amber-600/40 hover:bg-amber-600/30'
                  : 'bg-red-600/10 text-red-900 border-red-600/20 hover:bg-red-600/20'
              }`}
            >
              ✍ {lang === 'ru' ? 'Предложить правки в редакторе' : 'Suggest corrections in editor'}
            </button>
          </div>
        </div>

      </main>

      {/* FLOATING BACK TO TOP BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`fixed bottom-8 right-8 z-40 p-3 rounded-full shadow-2xl backdrop-blur-md border transition-transform hover:scale-110 active:scale-95 ${
              isRenoir
                ? 'bg-amber-900/90 border-amber-700 text-amber-100 shadow-amber-950/50'
                : 'bg-stone-900/90 border-stone-700 text-white'
            }`}
            title="Scroll to Top"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* IMAGE ZOOM MODAL */}
      <AnimatePresence>
        {activeImageZoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImageZoom(null)}
            className="fixed inset-0 z-50 bg-black/95 p-4 sm:p-10 flex items-center justify-center cursor-zoom-out backdrop-blur-lg"
          >
            <img
              src={activeImageZoom}
              alt="Zoomed Visual"
              referrerPolicy="no-referrer"
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            />
            <button
              onClick={() => setActiveImageZoom(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white text-3xl font-mono p-2 bg-black/40 rounded-full"
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
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className={`border rounded-2xl max-w-sm w-full p-6 shadow-2xl ${
                isRenoir
                  ? 'bg-[#180a0a] border-amber-900/50 text-amber-100'
                  : 'bg-white border-stone-300 text-stone-900'
              }`}
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
                  className="text-stone-400 hover:text-current text-sm font-mono p-1"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs opacity-75 mb-5 leading-relaxed">
                {lang === 'ru'
                  ? 'Введите пароль администратора для редактирования и синхронизации с базой Firebase.'
                  : 'Enter the administrator password to make corrections and synchronize them with Firestore.'}
              </p>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 opacity-70">
                    {lang === 'ru' ? 'Пароль' : 'Password'}
                  </label>
                  <input
                    id="book_editor_password_input"
                    type="password"
                    autoFocus
                    value={passwordInput}
                    onChange={(e) => { setPasswordInput(e.target.value); setLoginError(''); }}
                    placeholder="••••••••••••"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-mono focus:outline-none transition-all ${
                      isRenoir
                        ? 'bg-amber-950/40 border-amber-900/60 text-amber-100 placeholder-amber-400/40 focus:border-amber-500'
                        : 'bg-stone-100 border-stone-300 text-stone-900 placeholder-stone-400 focus:border-black'
                    }`}
                  />
                  {loginError && (
                    <p className="text-xs text-red-500 mt-1.5 font-medium">{loginError}</p>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => { setIsLoginModalOpen(false); setLoginError(''); }}
                    className="px-3.5 py-1.5 text-xs rounded-lg border border-black/10 dark:border-white/10 opacity-70 hover:opacity-100"
                  >
                    {lang === 'ru' ? 'Отмена' : 'Cancel'}
                  </button>
                  <button
                    id="book_login_submit_btn"
                    type="submit"
                    className={`px-4 py-2 text-xs font-semibold rounded-lg text-white shadow-md transition-all active:scale-95 ${
                      isRenoir ? 'bg-amber-600 hover:bg-amber-500' : 'bg-stone-900 hover:bg-stone-800'
                    }`}
                  >
                    {lang === 'ru' ? 'Войти в редактор' : 'Unlock Editor'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RICH TEXT PAGE EDITOR (WORD STYLE) */}
      <AnimatePresence>
        {isEditorOpen && (
          <motion.div
            id="rich_word_editor_modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-xl flex flex-col"
          >
            {/* RIBBON HEADER */}
            <div className="bg-stone-900 text-stone-100 border-b border-stone-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-lg z-20">
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
                  W
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">
                      {lang === 'ru' ? 'Редактор рукописи' : 'Manuscript Word Editor'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-mono text-[10px] uppercase">
                      {lang === 'ru' ? 'Русская версия' : 'English Edition'}
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-400 font-mono">
                    Firebase Sync • {editBlocks.length} {lang === 'ru' ? 'фрагментов' : 'blocks'}
                  </div>
                </div>
              </div>

              {/* EDITOR SEARCH BAR */}
              <div className="flex items-center gap-1.5 bg-stone-950 border border-stone-700 rounded-lg px-2.5 py-1.5 shadow-inner">
                <svg className="w-3.5 h-3.5 text-stone-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  id="editor_search_input"
                  type="text"
                  value={editorSearchQuery}
                  onChange={(e) => {
                    setEditorSearchQuery(e.target.value);
                    setEditorMatchIndex(0);
                  }}
                  placeholder={lang === 'ru' ? 'Поиск в тексте редактора...' : 'Search editor text...'}
                  className="bg-transparent text-stone-100 placeholder-stone-400 text-xs focus:outline-none w-36 sm:w-52"
                />
                
                {editorSearchQuery && (
                  <div className="flex items-center gap-1.5 text-[11px] font-mono border-l border-stone-700 pl-1.5">
                    <span className="text-amber-400 whitespace-nowrap">
                      {editorMatchingIndices.length > 0
                        ? `${editorMatchIndex + 1}/${editorMatchingIndices.length}`
                        : (lang === 'ru' ? '0' : '0')}
                    </span>

                    {editorMatchingIndices.length > 0 && (
                      <div className="flex items-center gap-0.5">
                        <button
                          onClick={() => handleNavigateEditorMatch(-1)}
                          className="w-5 h-5 rounded hover:bg-stone-800 text-stone-300 flex items-center justify-center cursor-pointer transition-colors"
                          title="Previous match (▲)"
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => handleNavigateEditorMatch(1)}
                          className="w-5 h-5 rounded hover:bg-stone-800 text-stone-300 flex items-center justify-center cursor-pointer transition-colors"
                          title="Next match (▼)"
                        >
                          ▼
                        </button>
                      </div>
                    )}

                    <button
                      onClick={() => setEditorShowOnlyMatches(!editorShowOnlyMatches)}
                      className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-mono cursor-pointer transition-colors ${
                        editorShowOnlyMatches
                          ? 'bg-amber-500 text-stone-950 font-bold'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                      title={lang === 'ru' ? 'Показать только совпадения' : 'Show matches only'}
                    >
                      {editorShowOnlyMatches ? (lang === 'ru' ? 'Фильтр ВКЛ' : 'Filter ON') : (lang === 'ru' ? 'Фильтр' : 'Filter')}
                    </button>

                    <button
                      onClick={() => {
                        setEditorSearchQuery('');
                        setEditorShowOnlyMatches(false);
                      }}
                      className="text-stone-400 hover:text-stone-200 ml-1 text-xs cursor-pointer"
                      title="Clear search"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              {/* SAVE / ACTIONS */}
              <div className="flex items-center gap-2">
                {saveStatus === 'saved' && (
                  <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                    ✓ {lang === 'ru' ? 'Сохранено' : 'Saved'}
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
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  <span>{saveStatus === 'saving' ? (lang === 'ru' ? 'Сохранение...' : 'Saving...') : (lang === 'ru' ? 'Сохранить в Firebase' : 'Save to Firebase')}</span>
                </button>

                <button
                  onClick={() => setIsEditorOpen(false)}
                  className="px-3.5 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-mono cursor-pointer"
                >
                  {lang === 'ru' ? 'Закрыть' : 'Close'}
                </button>
              </div>
            </div>

            {/* EDITOR CANVAS CONTAINER WITH PROMINENT VISIBLE SCROLLBAR */}
            <div
              ref={editorCanvasRef}
              className="flex-1 w-full overflow-y-scroll editor-scrollbar p-4 sm:p-8 bg-[#1e1e1e] flex justify-center items-start relative select-text"
            >
              <div
                style={{ fontFamily: currentFontConfig.css }}
                className="max-w-3xl w-full bg-[#FFFFFF] text-[#111111] shadow-2xl rounded-xl p-6 sm:p-14 my-4 mb-28 space-y-6 transition-all"
              >
                
                <div className="text-center pb-6 border-b border-stone-200">
                  <h2 className="text-2xl font-bold mb-1 text-stone-900">
                    {doc.title}
                  </h2>
                  <p className="text-xs text-stone-500 font-mono">
                    {lang === 'ru' ? 'Режим редактирования и корректуры' : 'Editing and Proofreading Workspace'}
                  </p>
                  {editorSearchQuery && (
                    <div className="mt-2 text-xs text-amber-700 font-mono bg-amber-50 border border-amber-200 px-3 py-1 rounded inline-block">
                      {lang === 'ru' ? `Поиск: "${editorSearchQuery}" • Найдено совпадений: ${editorMatchingIndices.length}` : `Searching: "${editorSearchQuery}" • Matches: ${editorMatchingIndices.length}`}
                    </div>
                  )}
                </div>

                {/* BLOCK LIST */}
                {editBlocks.map((block, idx) => {
                  const isActive = activeEditIndex === idx;
                  const isMatch = editorMatchingIndices.includes(idx);

                  if (editorShowOnlyMatches && !isMatch) {
                    return null;
                  }

                  if (block.type === 'image') {
                    return (
                      <div
                        key={block.id || idx}
                        ref={(el) => { blockRefs.current[idx] = el; }}
                        onClick={() => setActiveEditIndex(idx)}
                        className={`p-3 rounded-lg border transition-all ${
                          isActive
                            ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/10'
                            : isMatch
                              ? 'border-amber-400 ring-2 ring-amber-400/30 bg-amber-50/20'
                              : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs text-stone-400 font-mono mb-2">
                          <span className="flex items-center gap-1.5">
                            <span>[Фотография #{idx + 1}]</span>
                            {isMatch && (
                              <span className="px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 text-[10px] font-bold">
                                Совпадение
                              </span>
                            )}
                          </span>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDeleteBlock(idx); }}
                            className="text-red-500 hover:underline cursor-pointer"
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
                          className="w-full px-3 py-1.5 text-xs italic font-sans border border-stone-300 rounded-md bg-stone-50 focus:bg-white focus:outline-blue-500"
                        />
                      </div>
                    );
                  }

                  if (block.type === 'divider' || block.text?.trim() === '***') {
                    return (
                      <div
                        key={block.id || idx}
                        ref={(el) => { blockRefs.current[idx] = el; }}
                        className="py-2 text-center text-stone-400 tracking-widest text-xs"
                      >
                        * * *
                      </div>
                    );
                  }

                  return (
                    <div
                      key={block.id || idx}
                      ref={(el) => { blockRefs.current[idx] = el; }}
                      onClick={() => setActiveEditIndex(idx)}
                      className={`relative group p-2.5 rounded-lg transition-all ${
                        isActive
                          ? 'bg-amber-50/60 ring-2 ring-blue-500'
                          : isMatch
                            ? 'bg-amber-100/50 ring-2 ring-amber-400'
                            : 'hover:bg-stone-50'
                      }`}
                    >
                      {/* MATCH BADGE */}
                      {isMatch && !isActive && (
                        <div className="absolute top-1 right-2 text-[10px] font-mono text-amber-700 bg-amber-200/80 px-1.5 py-0.2 rounded font-bold">
                          #{idx + 1}
                        </div>
                      )}

                      {/* MINI WORD TOOLBAR */}
                      {isActive && (
                        <div className="mb-2 p-1 bg-stone-100 border border-stone-300 rounded text-xs flex items-center gap-1 font-sans shadow-xs">
                          <button
                            onClick={() => handleToggleStyle(idx, 'bold')}
                            className={`w-6 h-6 rounded font-bold cursor-pointer ${block.customStyle?.bold ? 'bg-stone-300' : 'hover:bg-stone-200'}`}
                            title="Bold"
                          >
                            B
                          </button>
                          <button
                            onClick={() => handleToggleStyle(idx, 'italic')}
                            className={`w-6 h-6 rounded italic cursor-pointer ${block.customStyle?.italic ? 'bg-stone-300' : 'hover:bg-stone-200'}`}
                            title="Italic"
                          >
                            I
                          </button>
                          <button
                            onClick={() => handleToggleStyle(idx, 'underline')}
                            className={`w-6 h-6 rounded underline cursor-pointer ${block.customStyle?.underline ? 'bg-stone-300' : 'hover:bg-stone-200'}`}
                            title="Underline"
                          >
                            U
                          </button>
                          
                          <div className="w-px h-4 bg-stone-300 mx-1" />

                          <button
                            onClick={() => handleSetAlignment(idx, 'left')}
                            className="px-1.5 py-0.5 rounded hover:bg-stone-200 text-[10px] cursor-pointer"
                            title="Left"
                          >
                            Left
                          </button>
                          <button
                            onClick={() => handleSetAlignment(idx, 'center')}
                            className="px-1.5 py-0.5 rounded hover:bg-stone-200 text-[10px] cursor-pointer"
                            title="Center"
                          >
                            Center
                          </button>
                          <button
                            onClick={() => handleSetAlignment(idx, 'justify')}
                            className="px-1.5 py-0.5 rounded hover:bg-stone-200 text-[10px] cursor-pointer"
                            title="Justify"
                          >
                            Justify
                          </button>

                          <div className="w-px h-4 bg-stone-300 mx-1" />

                          <button
                            onClick={() => handleAddParagraphBelow(idx)}
                            className="px-1.5 py-0.5 rounded bg-blue-100 hover:bg-blue-200 text-blue-800 text-[11px] cursor-pointer"
                            title="Add paragraph below"
                          >
                            + Абзац
                          </button>

                          <button
                            onClick={() => handleDeleteBlock(idx)}
                            className="px-1.5 py-0.5 rounded hover:bg-red-100 text-red-600 text-[11px] ml-auto cursor-pointer"
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
                        className="w-full bg-transparent border-0 resize-none text-[17px] leading-relaxed text-stone-900 focus:outline-none"
                      />
                    </div>
                  );
                })}

                {/* END OF DOCUMENT ACTIONS */}
                <div className="pt-10 pb-6 border-t border-stone-200 text-center space-y-3">
                  <p className="text-xs text-stone-400 font-mono">
                    — {lang === 'ru' ? 'Конец документа рукописи' : 'End of manuscript document'} —
                  </p>
                  <button
                    onClick={handleAddBlockAtEnd}
                    className="px-4 py-2 rounded-lg border border-dashed border-stone-300 hover:border-stone-500 text-xs font-mono text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                  >
                    + {lang === 'ru' ? 'Добавить фрагмент в конец книги' : 'Add block at end of book'}
                  </button>
                </div>

              </div>

              {/* FLOATING QUICK NAVIGATION WITHIN EDITOR */}
              <div className="fixed bottom-6 right-10 z-30 flex flex-col gap-2">
                <button
                  onClick={() => {
                    if (editorCanvasRef.current) {
                      editorCanvasRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="w-9 h-9 rounded-full bg-stone-900/90 hover:bg-stone-800 text-stone-200 shadow-xl border border-stone-700 flex items-center justify-center text-xs cursor-pointer transition-all active:scale-95"
                  title="Scroll to Top of Document"
                >
                  ▲
                </button>
                <button
                  onClick={() => {
                    if (editorCanvasRef.current) {
                      editorCanvasRef.current.scrollTo({ top: editorCanvasRef.current.scrollHeight, behavior: 'smooth' });
                    }
                  }}
                  className="w-9 h-9 rounded-full bg-stone-900/90 hover:bg-stone-800 text-stone-200 shadow-xl border border-stone-700 flex items-center justify-center text-xs cursor-pointer transition-all active:scale-95"
                  title="Scroll to Bottom of Document"
                >
                  ▼
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
