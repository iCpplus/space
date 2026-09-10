/**
 * The compact ("极简风") article list is the site default: only an explicit `'0'`
 * written by the theme settings page switches the list back to the card layout.
 *
 * Kept in one place because both `templates/BlogIndex.js` and the settings page
 * have to agree on the key and on the default.
 */
export const SIMPLE_THEME_KEY = 'simpleTheme';

/** @returns {boolean} whether the compact list should be used. */
export function getSimpleTheme() {
    if (typeof window === 'undefined') return true;
    try {
        return window.localStorage.getItem(SIMPLE_THEME_KEY) !== '0';
    } catch (err) {
        return true;
    }
}

export function setSimpleTheme(enabled) {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(SIMPLE_THEME_KEY, enabled ? '1' : '0');
    } catch (err) {
        /* storage disabled (private mode): keep the default instead of crashing */
    }
}
