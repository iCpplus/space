import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { fromPairs } from 'ramda';
import { Link } from 'gatsby';

import { rhythm } from 'utils/typography';
import { formatMessage } from 'utils/i18n';

import LangButton from '../LangButton';
import BalloonField from '../BalloonField';
import LangList from '../LangList/LangList';
import './LanguageBar.css';

import Search from '../Search';

const searchIndices = [
  { name: process.env.GATSBY_ALGOLIA_INDEX_NAME, title: process.env.GATSBY_ALGOLIA_INDEX_NAME },
];

/**
 * base MUST include slash (eg: en/)
 *
 * @param {*object} { lang }
 */
const LanguageBar = function ({ lang: langKey, base }) {
  const [displayLang, toggleDisplayLang] = useState(false);

  const handleToggleLanguage = React.useCallback(() => {
    toggleDisplayLang(!displayLang);
  }, [displayLang]);

  let toggleStyle = {
    maxHeight: null,
  };
  if (displayLang) {
    toggleStyle = {
      maxHeight: 200,
      overflow: 'initial',
    };
  }
  const tTitle = formatMessage('title')

  return (
    <StaticQuery
      // eslint-disable-next-line no-use-before-define
      query={supportedLanguagesQuery}
      render={(data) => {
        const { langsEntries, lang: defaultLang } = data.site.siteMetadata;

        if (langsEntries.length < 2) {
          return null;
        }

        const supportedLanguages = fromPairs(langsEntries);
        const language = supportedLanguages[langKey];

        if (!language) {
          return null;
        }

        return (
          <div
            id='top-bar'
            style={{
              maxWidth: rhythm(28),
              margin: 'auto',
              background: 'var(--bg)',
              position:'absolute',
              top: '0px',
              zIndex: '99',
              width:'100%',
              transition: 'transform 0.5s',
            }}
          >

            <div className="bar">
              <Link
                style={{
                  boxShadow: 'none',
                  textDecoration: 'none',
                  color: 'rgb(255, 167, 196)',
                }}
                to={base}
              >
                <span id='home-link' style={{display:'none',fontWeight:'900'}}>{tTitle}</span>
              </Link>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Search indices={searchIndices} />
                <LangButton lang={language} focused={displayLang} onClick={handleToggleLanguage} />
              </div>


            </div>
            <div className="toggle-content" style={toggleStyle}>
              <BalloonField style={{ padding: 20 }}>
                <LangList languages={supportedLanguages} langKey={defaultLang} />
              </BalloonField>
            </div>
          </div>
        );
      }}
    />
  );
}

LanguageBar.propTypes = {
  lang: PropTypes.string,
};

LanguageBar.defaultProps = {
  lang: 'en',
};

const supportedLanguagesQuery = graphql`
  query SupportedLanguagesQuery {
    site {
      siteMetadata {
        lang
        langsEntries
      }
    }
  }
`;

export default LanguageBar;
