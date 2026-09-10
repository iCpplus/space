/**
 * Custom page background, shared between the settings page (which writes it) and
 * `components/Layout/ThemeBackground.js` (which renders it).
 *
 * Because both live on different routes, a plain React state would not stay in
 * sync: writing dispatches a window event so the currently mounted background
 * updates immediately instead of only after a navigation.
 */
export const THEME_BACKGROUND_KEY = 'themeBackgroundUrl';
export const THEME_BACKGROUND_EVENT = 'theme-background-change';

/** @returns {string} the configured background image URL, or `''`. */
export function getThemeBackground() {
    if (typeof window === 'undefined') return '';
    try {
        return window.localStorage.getItem(THEME_BACKGROUND_KEY) || '';
    } catch (err) {
        return '';
    }
}

/** Stores (or clears, when `url` is empty) the background and notifies listeners. */
export function setThemeBackground(url) {
    if (typeof window === 'undefined') return;
    try {
        if (url) {
            window.localStorage.setItem(THEME_BACKGROUND_KEY, url);
        } else {
            window.localStorage.removeItem(THEME_BACKGROUND_KEY);
        }
    } catch (err) {
        /* storage disabled (private mode): still emit the event so the UI reacts */
    }
    window.dispatchEvent(new Event(THEME_BACKGROUND_EVENT));
}
