import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import drawLove from 'utils/drawLove';

/**
 * Floating hearts canvas animation shown on posts tagged with `爱情` / `love`.
 */
const Love = function ({ show = false }) {
    useEffect(() => {
        const canvas = document.getElementById('cavs');
        if (show && canvas) {
            drawLove(canvas);
        }
    }, [show]);

    return (
        <canvas
            id="cavs"
            style={{
                position: 'fixed',
                zIndex: '9999',
                left: '0',
                right: '0',
                top: '0',
                bottom: '0',
                pointerEvents: 'none',
            }}
        />
    );
};

Love.propTypes = {
    show: PropTypes.bool,
};

export default Love;
