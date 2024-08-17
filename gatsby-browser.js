/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
// custom typefaces
import 'typeface-montserrat';
import 'typeface-merriweather';
import { inject } from '@vercel/analytics';
import { Script } from 'gatsby';

import React from 'react';
import { LanguageProvider } from './src/context/LanguageContext';

export const wrapRootElement = ({ element }) => {
    inject()
    return <>
        <LanguageProvider>{element}</LanguageProvider>
        <Script defer src={location.origin + "/live2d-jaran.js"}></Script>
    </>
}
