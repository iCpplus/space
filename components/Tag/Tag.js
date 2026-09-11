import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

// `round` (the outer wrapper), `link` and `text` are shared with
// `components/SocialBar`, so they are global utilities declared in
// `styles/global.scss` rather than a CSS module.
const Tag = function ({ url, text, count = null, ...restProps }) {
    let countPart;
    if (count != null) {
        countPart = `  (${count})`;
    }
    return (
        <div className="round" {...restProps}>
            <Link className="link" href={url}>
                <span className="text">
                    {text}
                    {countPart}
                </span>
            </Link>
        </div>
    );
};

Tag.propTypes = {
    url: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    count: PropTypes.number,
};

export default Tag;
