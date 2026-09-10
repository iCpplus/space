import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { formatMessage } from 'utils/i18n';

const Breadcrumbs = function ({
    data = null,
    showTop = false,
    base = '',
    langKey = 'en',
    ...restProps
}) {
    if (data == null) {
        return null;
    }

    let topBCli;
    if (showTop) {
        topBCli = (
            <li className="breadcrumbs-item">
                <Link href={base} className="breadcrumbs-element">
                    {formatMessage('tHome')}
                </Link>
            </li>
        );
    }

    return (
        <ul className="breadcrumbs breadcrumbs-ul" {...restProps}>
            {topBCli}
            {data.map(({ text, url }) => {
                if (url != null) {
                    return (
                        <li className="breadcrumbs-item" key={text}>
                            <Link href={url} className="breadcrumbs-element">
                                {text}
                            </Link>
                        </li>
                    );
                }
                return (
                    <li className="breadcrumbs-item_active" key={text}>
                        <span className="breadcrumbs-element">{text}</span>
                    </li>
                );
            })}
        </ul>
    );
};

Breadcrumbs.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            url: PropTypes.string,
        }),
    ),
    showTop: PropTypes.bool,
    base: PropTypes.string,
    langKey: PropTypes.string,
};

export default Breadcrumbs;
