import firebaseConfig from './firebase-applet-config.json';

const PROJECT_ID = firebaseConfig.projectId;
const DATABASE_ID = firebaseConfig.firestoreDatabaseId || '(default)';
const API_KEY = firebaseConfig.apiKey;

const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/${DATABASE_ID}/documents`;

export interface FirestoreDocRef {
  collection: string;
  id: string;
  path: string;
}

export interface FirestoreDocSnapshot<T = any> {
  id: string;
  exists: () => boolean;
  data: () => T | null;
}

export const db = {
  projectId: PROJECT_ID,
  databaseId: DATABASE_ID
};

export function doc(_db: any, collection: string, id: string): FirestoreDocRef {
  return {
    collection,
    id,
    path: `${collection}/${id}`
  };
}

export async function getDoc<T = any>(docRef: FirestoreDocRef): Promise<FirestoreDocSnapshot<T>> {
  try {
    const url = `${BASE_URL}/${docRef.path}?key=${API_KEY}&_cb=${Date.now()}`;
    const res = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    if (!res.ok) {
      if (res.status === 404) {
        return {
          id: docRef.id,
          exists: () => false,
          data: () => null
        };
      }
      throw new Error(`Firestore GET failed: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    let data: any = null;
    if (json.fields?.payload?.stringValue) {
      try {
        data = JSON.parse(json.fields.payload.stringValue);
      } catch {
        data = null;
      }
    } else if (json.fields) {
      // Fallback decode standard fields
      data = {};
      for (const [key, val] of Object.entries<any>(json.fields)) {
        data[key] = val.stringValue ?? val.integerValue ?? val.booleanValue ?? null;
      }
    }

    return {
      id: docRef.id,
      exists: () => data !== null,
      data: () => data as T
    };
  } catch (err) {
    console.warn(`Firestore getDoc error for ${docRef.path}:`, err);
    return {
      id: docRef.id,
      exists: () => false,
      data: () => null
    };
  }
}

export async function setDoc<T = any>(docRef: FirestoreDocRef, data: T): Promise<void> {
  const url = `${BASE_URL}/${docRef.path}?key=${API_KEY}&_cb=${Date.now()}`;
  const payload = {
    fields: {
      payload: {
        stringValue: JSON.stringify(data)
      },
      updatedAt: {
        stringValue: new Date().toISOString()
      }
    }
  };

  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache'
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Firestore write failed (${res.status}): ${errorText}`);
  }
}

export function onSnapshot<T = any>(
  docRef: FirestoreDocRef,
  onNext: (snapshot: FirestoreDocSnapshot<T>) => void,
  onError?: (error: any) => void
): () => void {
  let isCancelled = false;

  const poll = async () => {
    if (isCancelled) return;
    try {
      const snap = await getDoc<T>(docRef);
      if (!isCancelled && snap.exists()) {
        onNext(snap);
      }
    } catch (err) {
      if (!isCancelled && onError) {
        onError(err);
      }
    }
  };

  // Initial fetch
  poll();

  // Periodic check every 30 seconds for collaborative updates
  const intervalId = setInterval(poll, 30000);

  return () => {
    isCancelled = true;
    clearInterval(intervalId);
  };
}
