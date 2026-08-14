import { db, doc, getDoc, setDoc, onSnapshot } from './firebase';
import { BookDocument } from './bookTypes';
import { INITIAL_RU_DOC, INITIAL_EN_DOC } from './initialBookData';

const COLLECTION_NAME = 'book_documents';

export async function fetchBookDocument(lang: 'ru' | 'en'): Promise<BookDocument> {
  const docId = lang === 'ru' ? 'cyprus_travels_ru' : 'cyprus_travels_en';
  try {
    const docRef = doc(db, COLLECTION_NAME, docId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as BookDocument;
    } else {
      // Initialize with base scraped content
      const initial = lang === 'ru' ? INITIAL_RU_DOC : INITIAL_EN_DOC;
      await setDoc(docRef, initial);
      return initial;
    }
  } catch (err) {
    console.warn(`Firestore read failed, falling back to local snapshot for ${lang}:`, err);
    return lang === 'ru' ? INITIAL_RU_DOC : INITIAL_EN_DOC;
  }
}

export async function saveBookDocument(document: BookDocument): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, document.id);
    const updatedDoc: BookDocument = {
      ...document,
      updatedAt: new Date().toISOString()
    };
    await setDoc(docRef, updatedDoc);
  } catch (err) {
    console.error('Failed to save to Firestore:', err);
    throw err;
  }
}

export function subscribeToBookDocument(lang: 'ru' | 'en', callback: (doc: BookDocument) => void): () => void {
  const docId = lang === 'ru' ? 'cyprus_travels_ru' : 'cyprus_travels_en';
  const docRef = doc(db, COLLECTION_NAME, docId);

  const unsubscribe = onSnapshot(docRef, (snap) => {
    if (snap.exists()) {
      callback(snap.data() as BookDocument);
    }
  }, (err) => {
    console.warn('Firestore subscription notice:', err);
  });

  return unsubscribe;
}
