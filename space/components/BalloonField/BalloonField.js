import React from 'react';
import PropTypes from 'prop-types';

const BalloonField = function ({ children, className = '', ...restProps }) {
    return (
        <div className={`balloon ${className}`} {...restProps}>
            {children}
        </div>
    );
};

BalloonField.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
};

export default BalloonField;
