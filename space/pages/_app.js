import React from 'react';
import Head from 'next/head';
import Script from 'next/script';

import { LanguageProvider } from 'context/LanguageContext';

import '../styles/typography.generated.css';
import '../styles/index.less';

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1,user-scalable=no, shrink-to-fit=no"
                />
            </Head>
            <LanguageProvider>
                <Component {...pageProps} />
            </LanguageProvider>
            {/* 看板娘（Live2D 嘉然），对应原项目 gatsby-browser.js 中注入的 /live2d-jaran.js */}
            <Script src="/live2d-jaran.js" strategy="afterInteractive" />
        </>
    );
}
