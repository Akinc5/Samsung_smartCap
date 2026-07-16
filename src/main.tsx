import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// This is a single-page app with no real routes/history entries, so there's
// nothing meaningful for the browser to "restore" — but its default 'auto'
// scroll restoration can still re-apply a stale scrollY (e.g. left over from
// a bug that scrolled the window) onto a fresh reload. Force manual + reset to
// top so every load starts at the top regardless of prior scroll state.
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
