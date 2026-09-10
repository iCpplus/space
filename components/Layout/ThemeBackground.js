import React, { useLayoutEffect, useState } from 'react';

import { getThemeBackground, THEME_BACKGROUND_EVENT } from 'utils/themeBackground';

import SettingButton from './SettingButton';

/**
 * Renders the configurable page background plus the floating entry point to the
 * theme settings page.
 */
const ThemeBackground = () => {
    const [themeBackgroundUrl, setThemeBackgroundUrl] = useState('');

    useLayoutEffect(() => {
        // The settings page lives on another route, so the background is read from
        // the shared store and kept in sync through its change event.
        const sync = () => setThemeBackgroundUrl(getThemeBackground());
        sync();
        window.addEventListener(THEME_BACKGROUND_EVENT, sync);
        return () => window.removeEventListener(THEME_BACKGROUND_EVENT, sync);
    }, []);

    return (
        <>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundImage: `url(${themeBackgroundUrl})`,
                    backgroundSize: 'cover',
                    zIndex: -1,
                }}
            />
            <SettingButton />
        </>
    );
};

export default ThemeBackground;
