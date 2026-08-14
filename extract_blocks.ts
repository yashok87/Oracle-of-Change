import fs from 'fs';

const html = fs.readFileSync('clean_entry_content.html', 'utf-8');

const regex = /(<figure[^>]*>[\s\S]*?<\/figure>|<p[^>]*>[\s\S]*?<\/p>|<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>|<hr[^>]*>|<blockquote[^>]*>[\s\S]*?<\/blockquote>|<ul[^>]*>[\s\S]*?<\/ul>|<ol[^>]*>[\s\S]*?<\/ol>)/gi;

const rawBlocks = html.match(regex) || [];
console.log('Extracted total blocks:', rawBlocks.length);

function decodeHtmlEntities(str: string) {
  return str
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8217;/g, '’')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&#8230;/g, '…')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#038;/g, '&')
    .replace(/&#039;/g, "'")
    .trim();
}

const blocks = rawBlocks.map((raw, idx) => {
  const trimmed = raw.trim();
  if (trimmed.startsWith('<figure')) {
    const srcMatch = trimmed.match(/src=["']([^"']+)["']/i);
    const captionMatch = trimmed.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i);
    const altMatch = trimmed.match(/alt=["']([^"']*)["']/i);
    return {
      id: `block_${idx + 1}`,
      type: 'image' as const,
      src: srcMatch ? srcMatch[1] : '',
      caption: captionMatch ? decodeHtmlEntities(captionMatch[1]) : '',
      alt: altMatch ? altMatch[1] : ''
    };
  } else if (trimmed.startsWith('<h')) {
    const levelMatch = trimmed.match(/^<h([1-6])/i);
    const level = levelMatch ? parseInt(levelMatch[1]) : 2;
    const text = decodeHtmlEntities(trimmed);
    return {
      id: `block_${idx + 1}`,
      type: 'heading' as const,
      level,
      text
    };
  } else if (trimmed.startsWith('<hr')) {
    return {
      id: `block_${idx + 1}`,
      type: 'divider' as const
    };
  } else if (trimmed.startsWith('<blockquote')) {
    const text = decodeHtmlEntities(trimmed);
    return {
      id: `block_${idx + 1}`,
      type: 'quote' as const,
      text
    };
  } else {
    const text = decodeHtmlEntities(trimmed);
    return {
      id: `block_${idx + 1}`,
      type: 'paragraph' as const,
      text
    };
  }
});

console.log('Summary:', {
  total: blocks.length,
  images: blocks.filter(b => b.type === 'image').length,
  paragraphs: blocks.filter(b => b.type === 'paragraph').length,
  quotes: blocks.filter(b => b.type === 'quote').length,
  dividers: blocks.filter(b => b.type === 'divider').length,
  headings: blocks.filter(b => b.type === 'heading').length,
});

fs.writeFileSync('ru_blocks.json', JSON.stringify(blocks, null, 2));
console.log('Saved ru_blocks.json successfully.');
