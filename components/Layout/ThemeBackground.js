import React, { useLayoutEffect, useState } from 'react';

import SettingBox from './SettingBox';

/**
 * Renders the configurable page background plus the theme settings box.
 */
const ThemeBackground = ({ setSimpleTheme }) => {
    const [themeBackgroundUrl, setThemeBackgroundUrl] = useState('');

    const changeTheme = (url) => {
        setThemeBackgroundUrl(url);
    };

    useLayoutEffect(() => {
        const url = localStorage.getItem('themeBackgroundUrl');
        if (url) {
            setThemeBackgroundUrl(url);
        }
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
            <SettingBox setSimpleTheme={setSimpleTheme} changeTheme={changeTheme} />
        </>
    );
};

export default ThemeBackground;
