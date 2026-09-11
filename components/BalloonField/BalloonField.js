import React from 'react';
import PropTypes from 'prop-types';

import styles from './BalloonField.module.scss';

const BalloonField = function ({ children, className = '', ...restProps }) {
    return (
        <div className={`${styles.balloon} ${className}`} {...restProps}>
            {children}
        </div>
    );
};

BalloonField.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
};

export default BalloonField;
