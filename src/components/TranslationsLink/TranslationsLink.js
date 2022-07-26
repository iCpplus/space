import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'gatsby';

import './TranslationsLink.css';

const TranslationsLink = function({ translationsLink, langKey, ...restProps }) {
  if (translationsLink == null || translationsLink.length === 0) {
    return null;
  }

  return (
    <div className="translation-root" {...restProps}>
      <span style={{color:'var(--tag-bg)',marginRight:'10px'}}>翻译/translate into: </span>
      {translationsLink.map(({ name, url }) => (
        <Link key={name} to={url} className="translation-link">
          {name}
        </Link>
      ))}
    </div>
  );
}

TranslationsLink.propTypes = {
  translationsLink: PropTypes.array.isRequired,
  langKey: PropTypes.string.isRequired,
};

export default TranslationsLink;
