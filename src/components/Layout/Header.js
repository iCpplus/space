import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'gatsby';
import { formatMessage } from 'utils/i18n';
import { scale } from 'utils/typography';

/**
 * base MUST include slash (eg: en/)
 *
 * @param {*object} { location, title, base}
 */
const Header = function ({ location, title, base }) {
  console.log(title); // 不使用配置文件的title，使用英汉配置的title
  // eslint-disable-next-line no-undef
  const rootPath = `${__PATH_PREFIX__}${base}`;
  const tTitle = formatMessage('title')

  if (location.pathname === rootPath) {
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
          to={base}
        >
          {tTitle}
        </Link>
      </h1>
    );
  }
  return (
    <h3
      style={{
        fontFamily: 'Montserrat, sans-serif',
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
        to={base}
      >
        {tTitle}
      </Link>
    </h3>
  );
}

Header.propTypes = {
  location: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  title: PropTypes.string,
  base: PropTypes.string,
};

Header.defaultProps = {
  title: null,
  base: '',
};

export default Header;
