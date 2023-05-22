import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Setting from './setting';


const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const ThemeBackground = () => {

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
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundImage: `url(${themeBackgroundUrl})`, zIndex: -1, transition: 'color 1s, background 1s', }} />
        <Setting changeTheme={changeTheme} />
    </>
}

ThemeBackground.propTypes = propTypes;
ThemeBackground.defaultProps = defaultProps;
// #endregion

export default ThemeBackground;