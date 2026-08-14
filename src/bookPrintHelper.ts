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
 * Generates clean, publication-grade standalone HTML for Print / Save to PDF
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

  // Filter out any unwanted blocks (e.g. Rate this)
  const cleanBlocks = doc.blocks.filter(b => {
    if (!b.text) return true;
    const textLower = b.text.toLowerCase().trim();
    if (textLower.includes('rate this:') || textLower.includes('оцените:') || textLower.includes('share this:')) {
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
    
    // Check if text is a divider
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
      
      // Check if it looks like a quote or ending poem
      if (trimmed.includes('Раби Зуся') || trimmed.includes('Rabbi Zusya') || trimmed.startsWith('“') || trimmed.startsWith('«')) {
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

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(author)} — ${escapeHtml(bookTitle)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap');

    @page {
      size: A4 portrait;
      margin: 22mm 18mm 22mm 18mm;
    }

    @page :left {
      @top-left {
        content: "${escapeHtml(author)}";
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 8pt;
        color: #777777;
      }
      @top-right {
        content: counter(page);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 8pt;
        color: #777777;
      }
    }

    @page :right {
      @top-left {
        content: "${escapeHtml(bookTitle)}";
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 8pt;
        color: #777777;
      }
      @top-right {
        content: counter(page);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 8pt;
        color: #777777;
      }
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    html, body {
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #1a1a1a;
      font-family: "PT Serif", Georgia, "Times New Roman", serif;
      font-size: 11pt;
      line-height: 1.68;
      text-rendering: optimizeLegibility;
    }

    .book-container {
      max-width: 680px;
      margin: 0 auto;
      padding: 0;
    }

    /* FRONT COVER / TITLE SECTION */
    .book-header-section {
      text-align: center;
      padding-top: 10mm;
      padding-bottom: 8mm;
      margin-bottom: 8mm;
      border-bottom: 2px solid #222222;
      page-break-after: avoid;
      break-after: avoid;
    }

    .author-name {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 12pt;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #444444;
      margin-bottom: 8pt;
    }

    .book-main-title {
      font-family: "Playfair Display", "PT Serif", Georgia, serif;
      font-size: 26pt;
      font-weight: 700;
      line-height: 1.2;
      color: #111111;
      margin: 0 0 10pt 0;
    }

    .book-subtitle {
      font-size: 12pt;
      font-style: italic;
      color: #555555;
      margin-bottom: 14pt;
    }

    .book-publication-meta {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace;
      font-size: 8pt;
      color: #777777;
      letter-spacing: 0.05em;
    }

    /* TYPOGRAPHY */
    h1.chapter-title {
      font-family: "Playfair Display", "PT Serif", Georgia, serif;
      font-size: 20pt;
      font-weight: 700;
      line-height: 1.25;
      margin-top: 24pt;
      margin-bottom: 12pt;
      color: #111111;
      page-break-after: avoid;
      break-after: avoid;
    }

    h2.chapter-heading {
      font-family: "Playfair Display", "PT Serif", Georgia, serif;
      font-size: 15pt;
      font-weight: 700;
      line-height: 1.3;
      margin-top: 22pt;
      margin-bottom: 10pt;
      color: #111111;
      page-break-after: avoid;
      break-after: avoid;
    }

    h3.section-title {
      font-family: "Playfair Display", "PT Serif", Georgia, serif;
      font-size: 12.5pt;
      font-weight: 700;
      margin-top: 18pt;
      margin-bottom: 8pt;
      color: #222222;
      page-break-after: avoid;
      break-after: avoid;
    }

    p.book-paragraph {
      margin: 0 0 9pt 0;
      text-align: justify;
      text-justify: inter-word;
      hyphens: auto;
      orphans: 3;
      widows: 3;
    }

    p.book-paragraph:first-of-type {
      text-indent: 0;
    }

    p.poem-block {
      margin: 14pt 18pt;
      padding: 8pt 12pt;
      background: #fafafa;
      border-left: 2px solid #888888;
      font-style: italic;
      line-height: 1.6;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    blockquote {
      margin: 12pt 16pt;
      padding: 4pt 0 4pt 12pt;
      border-left: 3px solid #666666;
      font-style: italic;
      color: #222222;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .asterism {
      text-align: center;
      margin: 16pt 0;
      font-size: 11pt;
      letter-spacing: 0.35em;
      color: #666666;
      page-break-after: avoid;
      break-after: avoid;
    }

    /* FIGURES & IMAGES */
    figure.book-figure {
      margin: 18pt auto;
      text-align: center;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    figure.book-figure img {
      max-width: 88%;
      max-height: 420px;
      height: auto;
      border-radius: 4px;
      margin: 0 auto;
      display: block;
    }

    figcaption {
      font-size: 8.5pt;
      font-style: italic;
      color: #555555;
      margin-top: 6pt;
      text-align: center;
      line-height: 1.4;
    }

    /* FOOTER */
    .book-final-colophon {
      margin-top: 32pt;
      padding-top: 16pt;
      border-top: 1px solid #dddddd;
      text-align: center;
      font-size: 9pt;
      color: #666666;
      font-style: italic;
      page-break-inside: avoid;
      break-inside: avoid;
    }
  </style>
</head>
<body>
  <div class="book-container">
    <header class="book-header-section">
      <div class="author-name">${escapeHtml(author)}</div>
      <h1 class="book-main-title">${escapeHtml(bookTitle)}</h1>
      <div class="book-subtitle">${escapeHtml(subtitle)}</div>
      <div class="book-publication-meta">${escapeHtml(metaSource)} • ${escapeHtml(dateFormatted)}</div>
    </header>

    <main>
      ${renderedBlocksHtml}
    </main>

    <footer class="book-final-colophon">
      <p>— ${isRu ? 'Конец паломнических заметок' : 'End of Pilgrimage Chronicles'} —</p>
      <p style="font-size: 8pt; margin-top: 4pt; color: #888888;">${escapeHtml(author)} • ${escapeHtml(bookTitle)} • ${escapeHtml(dateFormatted)}</p>
    </footer>
  </div>
</body>
</html>`;
}

/**
 * Initiates print dialog with an isolated, beautifully styled iframe
 */
export function printBookToPDF(doc: BookDocument, lang: 'ru' | 'en'): Promise<void> {
  return new Promise((resolve) => {
    const isRu = lang === 'ru';
    const author = isRu ? 'Яков Кельберт' : 'Jacob Kelbert';
    const bookTitle = doc.title || (isRu ? 'Прогулки по острову' : 'Walks Around the Island');
    const docTitle = `${author} - ${bookTitle}`;

    // Create an invisible iframe
    const iframe = document.createElement('iframe');
    iframe.id = 'book_pdf_print_iframe';
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.opacity = '0';
    iframe.style.pointerEvents = 'none';
    iframe.setAttribute('title', docTitle);
    
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow?.document || iframe.contentDocument;
    if (!iframeDoc) {
      document.body.removeChild(iframe);
      window.print();
      resolve();
      return;
    }

    const html = generateBookPrintHtml(doc, lang);
    iframeDoc.open();
    iframeDoc.write(html);
    iframeDoc.close();

    const doPrint = () => {
      try {
        if (iframe.contentWindow) {
          iframe.contentWindow.focus();
          iframe.contentWindow.print();
        }
      } catch (err) {
        console.warn('Iframe print failed, falling back to window.print():', err);
        window.print();
      } finally {
        setTimeout(() => {
          if (iframe.parentNode) {
            iframe.parentNode.removeChild(iframe);
          }
          resolve();
        }, 1500);
      }
    };

    // Allow resources (fonts and images) a brief moment to render
    setTimeout(doPrint, 500);
  });
}
