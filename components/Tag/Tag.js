import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

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
