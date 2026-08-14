import { BookDocument, BookBlock } from './bookTypes';

/**
 * Escapes HTML characters for safe rendering in print template
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generates publication-grade HTML content for the complete book
 */
export function generateBookPrintHtml(doc: BookDocument, lang: 'ru' | 'en'): string {
  const isRu = lang === 'ru';
  const author = isRu ? 'Яков Кельберт' : 'Jacob Kelbert';
  const bookTitle = doc.title || (isRu ? 'Прогулки по острову' : 'Walks Around the Island');
  const subtitle = isRu
    ? 'Паломнические записки • Кипр'
    : 'Pilgrimage Chronicles • Cyprus';
  const metaSource = isRu
    ? 'Оригинал: vozduh.wordpress.com'
    : 'Original: vozduh.wordpress.com';
  const dateFormatted = isRu ? '1 августа 2025' : 'August 1, 2025';

  // Filter out any unwanted blocks (such as Rate this)
  const cleanBlocks = (doc.blocks || []).filter(b => {
    if (!b.text) return true;
    const textLower = b.text.toLowerCase().trim();
    if (
      textLower.includes('rate this:') ||
      textLower.includes('rate this') ||
      textLower.includes('оцените:') ||
      textLower.includes('share this:')
    ) {
      return false;
    }
    return true;
  });

  const renderedBlocksHtml = cleanBlocks.map((block: BookBlock, index: number) => {
    if (block.type === 'heading') {
      const level = block.level || 2;
      const text = escapeHtml(block.text || '');
      if (level === 1) {
        return `<h1 class="chapter-title">${text}</h1>`;
      } else if (level === 3) {
        return `<h3 class="section-title">${text}</h3>`;
      }
      return `<h2 class="chapter-heading">${text}</h2>`;
    }

    if (block.type === 'image') {
      const src = block.src || '';
      const caption = block.caption ? escapeHtml(block.caption) : '';
      return `
        <figure class="book-figure">
          <img src="${src}" alt="Иллюстрация" referrerpolicy="no-referrer" loading="eager" />
          ${caption ? `<figcaption>${caption}</figcaption>` : ''}
        </figure>
      `;
    }

    if (block.type === 'divider' || (block.text && block.text.trim() === '***')) {
      return `<div class="asterism">* * *</div>`;
    }

    if (block.type === 'quote') {
      const quoteText = escapeHtml(block.text || '').replace(/\n/g, '<br/>');
      return `<blockquote><p>${quoteText}</p></blockquote>`;
    }

    // Standard Paragraph
    const rawText = block.text || '';
    
    // Check if text is an asterism divider
    if (rawText.trim() === '***') {
      return `<div class="asterism">* * *</div>`;
    }

    // Handle paragraphs that start with ***
    let formattedText = rawText;
    let hasAsterismPrefix = false;
    if (formattedText.startsWith('***')) {
      hasAsterismPrefix = true;
      formattedText = formattedText.substring(3).trim();
    }

    // Split double newlines into distinct paragraphs
    const paragraphs = formattedText.split(/\n\n+/);
    const renderedP = paragraphs.map((pText) => {
      const trimmed = pText.trim();
      if (!trimmed) return '';
      if (trimmed === '***') {
        return `<div class="asterism">* * *</div>`;
      }
      
      // Check if it is a quote / poem ending
      if (
        trimmed.includes('Раби Зуся') ||
        trimmed.includes('Rabbi Zusya') ||
        trimmed.startsWith('“') ||
        trimmed.startsWith('«') ||
        trimmed.startsWith('"')
      ) {
        const escaped = escapeHtml(trimmed).replace(/\n/g, '<br/>');
        return `<p class="poem-block">${escaped}</p>`;
      }

      const escaped = escapeHtml(trimmed).replace(/\n/g, '<br/>');
      return `<p class="book-paragraph">${escaped}</p>`;
    }).join('\n');

    return hasAsterismPrefix
      ? `<div class="asterism">* * *</div>\n${renderedP}`
      : renderedP;
  }).join('\n');

  return `
  <div class="book-pdf-inner-container">
    <header class="book-header-section">
      <div class="author-name">${escapeHtml(author)}</div>
      <h1 class="book-main-title">${escapeHtml(bookTitle)}</h1>
      <div class="book-subtitle">${escapeHtml(subtitle)}</div>
      <div class="book-publication-meta">${escapeHtml(metaSource)} • ${escapeHtml(dateFormatted)}</div>
    </header>

    <main class="book-content-main">
      ${renderedBlocksHtml}
    </main>

    <footer class="book-final-colophon">
      <p>— ${isRu ? 'Конец паломнических заметок' : 'End of Pilgrimage Chronicles'} —</p>
      <p style="font-size: 8.5pt; margin-top: 6pt; color: #777777;">${escapeHtml(author)} • ${escapeHtml(bookTitle)} • ${escapeHtml(dateFormatted)}</p>
    </footer>
  </div>`;
}

/**
 * Initiates print dialog with high-precision full book rendering
 */
export function printBookToPDF(doc: BookDocument, lang: 'ru' | 'en'): Promise<void> {
  return new Promise((resolve) => {
    const isRu = lang === 'ru';
    const author = isRu ? 'Яков Кельберт' : 'Jacob Kelbert';
    const bookTitle = doc.title || (isRu ? 'Прогулки по острову' : 'Walks Around the Island');
    const docTitle = `${author} - ${bookTitle}`;

    const originalTitle = document.title;
    document.title = docTitle;

    // Remove any previously existing print container
    const existing = document.getElementById('book_pdf_dedicated_print_root');
    if (existing && existing.parentNode) {
      existing.parentNode.removeChild(existing);
    }

    // Create dedicated print root attached directly to document.body
    const printRoot = document.createElement('div');
    printRoot.id = 'book_pdf_dedicated_print_root';
    printRoot.innerHTML = generateBookPrintHtml(doc, lang);
    document.body.appendChild(printRoot);

    const cleanup = () => {
      document.title = originalTitle;
      if (printRoot.parentNode) {
        printRoot.parentNode.removeChild(printRoot);
      }
      window.removeEventListener('afterprint', cleanup);
      resolve();
    };

    window.addEventListener('afterprint', cleanup);

    // Wait a tick for fonts/layout calculation, then trigger print
    setTimeout(() => {
      try {
        window.print();
      } catch (err) {
        console.error('Print trigger error:', err);
      }
      // Safety fallback cleanup in case afterprint doesn't fire immediately
      setTimeout(cleanup, 2500);
    }, 200);
  });
}
