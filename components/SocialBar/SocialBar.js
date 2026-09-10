import React, { useEffect, useState } from 'react';

import { useLang } from 'context/LanguageContext';
import withBasePath from 'utils/basePath';
import { formatMessage } from 'utils/i18n';

const SocialBar = function () {
    const { homeLink } = useLang();
    const [goTags, setGoTags] = useState();
    const [goResume, setGoResume] = useState();
    const [goMapSpace, setGoMapSpace] = useState();

    useEffect(() => {
        // `homeLink` is root relative (`/` or `/en/`) and these are *raw* browser
        // navigations, so Next's `basePath` is never applied automatically. The
        // deployment prefix has to be added by hand, otherwise the buttons jump
        // to `/tags/` and `/resume/`, which 404 on GitHub Pages.
        const f1 = () => {
            window.location.href = withBasePath(`${homeLink}tags/`);
        };
        const f2 = () => {
            window.location.href = withBasePath(`${homeLink}resume/`);
        };
        const f3 = () => {
            window.location.href = withBasePath('/map-space/');
        };
        setGoTags(() => f1);
        setGoResume(() => f2);
        setGoMapSpace(() => f3);
    }, [homeLink]);

    return (
        <div
            style={{
                display: 'flex',
                margin: 'auto',
            }}
        >
            <div
                role="presentation"
                className="round-tag"
                onClick={goTags}
                style={{ cursor: 'pointer', display: 'block' }}
            >
                <div className="link">
                    <span className="text">{formatMessage('tCatalog')}</span>
                </div>
            </div>
            <div
                role="presentation"
                className="round-tag"
                onClick={goResume}
                style={{ cursor: 'pointer', display: 'block', marginLeft: '30px' }}
            >
                <div className="link">
                    <span className="text">{formatMessage('tResume')}</span>
                </div>
            </div>
            <div
                role="presentation"
                className="round-tag"
                onClick={goMapSpace}
                style={{ cursor: 'pointer', display: 'block', marginLeft: '30px' }}
            >
                <div className="link">
                    <span className="text">space</span>
                </div>
            </div>
        </div>
    );
};

export default SocialBar;
