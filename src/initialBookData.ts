import { BookBlock, BookDocument } from './bookTypes';
import ruBlocksJson from '../ru_blocks.json';
import enBlocksJson from '../en_blocks.json';

export const INITIAL_RU_DOC: BookDocument = {
  id: 'cyprus_travels_ru',
  title: 'Прогулки по острову',
  author: 'Яков Кельберт',
  originalUrl: 'https://vozduh.wordpress.com/2025/08/01/travels_cyprus/',
  language: 'ru',
  blocks: ruBlocksJson as BookBlock[],
  updatedAt: new Date().toISOString(),
  updatedBy: 'Original / WordPress'
};

export const INITIAL_EN_DOC: BookDocument = {
  id: 'cyprus_travels_en',
  title: 'Walks Around the Island',
  author: 'Jacob Kelbert',
  originalUrl: 'https://vozduh.wordpress.com/2025/08/01/travels_cyprus/',
  language: 'en',
  blocks: enBlocksJson as BookBlock[],
  updatedAt: new Date().toISOString(),
  updatedBy: 'AI Translated'
};
