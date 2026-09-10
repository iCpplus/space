import React, { useEffect, useState } from 'react';
import { rhythm } from 'utils/typography';
import { formatMessage } from 'utils/i18n';
import withBasePath from 'utils/basePath';
import { useLang } from 'context/LanguageContext';

const Footer = function () {
    const { homeLink } = useLang();
    const [goHome, setGoHome] = useState();

    useEffect(() => {
        // `homeLink` is root relative (`/` or `/en/`), so it still needs the
        // deployment base path before it can be used as an absolute URL.
        const u = `${window.location.origin}${withBasePath(homeLink)}`;
        const f = () => {
            window.location.href = u;
        };
        setGoHome(() => f);
    }, [homeLink]);

    return (
        <footer
            style={{
                marginTop: rhythm(2.5),
                paddingTop: rhythm(1),
                textAlign: 'center',
            }}
        >
            <div>
                <div
                    className="footer-contain"
                    role="presentation"
                    onClick={goHome}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                    }}
                >
                    <img
                        className="footer-icon"
                        style={{
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            marginRight: '20px',
                        }}
                        src={withBasePath('/jump.jpg')}
                        alt=""
                    />
                    <span style={{ color: '#ffa5b0' }}>{formatMessage('tfootContent')}</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
