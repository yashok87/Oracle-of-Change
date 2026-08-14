export interface BookBlock {
  id: string;
  type: 'paragraph' | 'image' | 'heading' | 'divider' | 'quote';
  level?: number;
  text?: string;
  src?: string;
  caption?: string;
  alt?: string;
  customStyle?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    align?: 'left' | 'center' | 'right' | 'justify';
    color?: string;
    fontSize?: string;
  };
}

export interface BookDocument {
  id: string;
  title: string;
  author: string;
  originalUrl: string;
  language: 'ru' | 'en';
  blocks: BookBlock[];
  updatedAt?: string;
  updatedBy?: string;
  version?: number;
}
