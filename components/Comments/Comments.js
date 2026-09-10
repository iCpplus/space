import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const VALINE_SCRIPT = 'https://unpkg.com/valine/dist/Valine.min.js';

let scriptPromise;

function loadValineScript() {
    if (typeof window === 'undefined') return Promise.resolve();
    if (window.Valine) return Promise.resolve();
    if (scriptPromise) return scriptPromise;

    scriptPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = VALINE_SCRIPT;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });

    return scriptPromise;
}

/**
 * Client side Valine comment widget, replacing `gatsby-plugin-valine`.
 */
const Comments = function ({
    path,
    lang = 'zh-CN',
    placeholder = '',
    pageSize = 5,
}) {
    const containerRef = useRef(null);

    useEffect(() => {
        let cancelled = false;

        loadValineScript()
            .then(() => {
                if (cancelled || !containerRef.current || !window.Valine) return;
                containerRef.current.innerHTML = '';
                // eslint-disable-next-line no-new
                new window.Valine({
                    el: containerRef.current,
                    appId: 'y5NRkY47PYzeHEOlgSaXDI9P-gzGzoHsz',
                    appKey: 'UP7Xe10qeba3wTdIWWMAsr0j',
                    avatar: 'robohash',
                    lang,
                    placeholder,
                    pageSize,
                    path,
                    enableQQ: true,
                    visitor: true,
                    recordIP: true,
                    meta: ['nick', 'mail'],
                });
            })
            .catch(() => {
                /* comments are best-effort: ignore CDN failures */
            });

        return () => {
            cancelled = true;
        };
    }, [path, lang, placeholder, pageSize]);

    return <div className="valine" ref={containerRef} />;
};

Comments.propTypes = {
    path: PropTypes.string.isRequired,
    lang: PropTypes.string,
    placeholder: PropTypes.string,
    pageSize: PropTypes.number,
};

export default Comments;
