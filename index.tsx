
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { ErrorBoundary } from './components/ErrorBoundary';

// Purge legacy caches and register Service Worker for PWA
if (typeof window !== 'undefined' && 'caches' in window) {
  caches.keys().then((keys) => {
    keys.forEach((key) => {
      if (key !== 'oracle-v6') {
        caches.delete(key).catch(() => {});
      }
    });
  }).catch(() => {});
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => {
        // Immediately check for updates
        registration.update().catch(() => {});
        
        // Check for updates periodically
        setInterval(() => {
          registration.update().catch(() => {});
        }, 1000 * 60 * 15); // Every 15 minutes

        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('New content available, refreshing...');
                window.location.reload();
              }
            };
          }
        };
      })
      .catch(error => {
        console.log('Oracle SW registration failed:', error);
      });
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

