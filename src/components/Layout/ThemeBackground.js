import React, { useLayoutEffect, useState } from 'react';

import SettingBox from './SettingBox';

const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const ThemeBackground = ({setSimpleTheme}) => {

    const [themeBackgroundUrl, setThemeBackgroundUrl] = useState('')

    const changeTheme = (url) => {
        setThemeBackgroundUrl(url)
    }

    useLayoutEffect(() => {
        const url = localStorage.getItem('themeBackgroundUrl')
        if (url) {
            setThemeBackgroundUrl(url)
        }
    }, [])

    return <>
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundImage: `url(${themeBackgroundUrl})`,backgroundSize: 'cover', zIndex: -1 }} />
        <SettingBox setSimpleTheme={setSimpleTheme} changeTheme={changeTheme} />
    </>
}

ThemeBackground.propTypes = propTypes;
ThemeBackground.defaultProps = defaultProps;
// #endregion

export default ThemeBackground;