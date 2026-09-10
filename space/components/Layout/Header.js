import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { formatMessage } from 'utils/i18n';
import { scale } from 'utils/typography';

/**
 * `base` MUST include a trailing slash (eg: `en/`).
 */
const Header = function ({ title = null, base = '' }) {
    const router = useRouter();
    const pathname = (router.asPath || '/').split('?')[0].split('#')[0];
    const rootPath = base;
    const tTitle = formatMessage('title');

    if (pathname === rootPath) {
        return (
            <h1
                style={{
                    ...scale(0.75),
                    marginBottom: 0,
                    marginTop: 0,
                }}
            >
                <Link
                    style={{
                        boxShadow: 'none',
                        textDecoration: 'none',
                        color: 'var(--textTitle)',
                    }}
                    href={base}
                >
                    {tTitle}
                </Link>
            </h1>
        );
    }
    return (
        <h3
            style={{
                marginTop: 0,
                marginBottom: 0,
                height: 42,
                lineHeight: '2.625rem',
            }}
        >
            <Link
                style={{
                    boxShadow: 'none',
                    textDecoration: 'none',
                    color: 'rgb(255, 167, 196)',
                }}
                href={base}
            >
                {tTitle}
            </Link>
        </h3>
    );
};

Header.propTypes = {
    title: PropTypes.string,
    base: PropTypes.string,
};

export default Header;
