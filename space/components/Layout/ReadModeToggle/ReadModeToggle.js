import React from 'react';
import Head from 'next/head';

import withThemeFlag from 'utils/withThemeFlag';
import Toggle from '../../Toggle';

// eslint-disable-next-line react/prop-types
const ReadModeToggle = function ({ isLightTheme }) {
    return (
        <>
            <Head>
                <meta name="theme-color" content={isLightTheme ? '#ffa8c5' : '#282c35'} />
            </Head>
            {isLightTheme != null ? (
                <Toggle
                    icons={{
                        checked: (
                            <img
                                src="/moon.png"
                                alt="night"
                                width="16"
                                height="16"
                                role="presentation"
                                style={{ pointerEvents: 'none' }}
                            />
                        ),
                        unchecked: (
                            <img
                                src="/sun.png"
                                alt="day"
                                width="16"
                                height="16"
                                role="presentation"
                                style={{ pointerEvents: 'none' }}
                            />
                        ),
                    }}
                    checked={!isLightTheme}
                    onChange={(e) => window.__setPreferredTheme(e.target.checked ? 'dark' : 'light')}
                />
            ) : (
                <div style={{ height: '24px' }} />
            )}
        </>
    );
};

export default withThemeFlag(ReadModeToggle);
