/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
// custom typefaces
import 'typeface-montserrat';
import 'typeface-merriweather';
import { inject } from '@vercel/analytics';
import ReactLive2d from 'react-live2d';

import React from 'react';
import { LanguageProvider } from './src/context/LanguageContext';

export const wrapRootElement = ({ element }) => {
    inject()
    return <>
        <LanguageProvider>{element}</LanguageProvider>
        <ReactLive2d
            bottom={'0px'}
            left={'10px'}
            MobileShow={true}
            // ModelList={['Haru']}
            menuList={[]}
            TouchDefault={["欢迎来到coco's space",'请不要乱碰哦']}
            PathFull='http://publicjs.supmiao.com/Resources/'
        />
    </>
}
