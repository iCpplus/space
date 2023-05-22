import React, { useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useLang } from 'context/LanguageContext';
import { rhythm } from 'utils/typography';

import LanguageBar from './LanguageBar';
import Header from './Header';
import Footer from './Footer';
import ReadModeToggle from './ReadModeToggle';
import Breadcrumbs from '../Breadcrumbs';
import ThemeBackground from './ThemeBackground';

const Layout = function ({ children, location, title, breadcrumbs }) {
  const { lang, homeLink, refresh } = useLang();
  const [themeBackgroundUrl, setThemeBackgroundUrl] = useState('')

  const changeTheme = (url) => {
    setThemeBackgroundUrl(url)
  }

  React.useEffect(() => {
    refresh(location);
  }, [location, refresh]);
  
  useLayoutEffect(() => {
    const url = localStorage.getItem('themeBackgroundUrl')
    if (url) {
        setThemeBackgroundUrl(url)
    }
}, [])

  return (
    <div
      style={{
        color: 'var(--textNormal)',
        background: 'var(--bg-outer)',
        transition: 'color 1s, background 1s',
        maxHeight: '100vh',
        fontFamily: 'var(--systemFont)',
        height: '100vh',
        overflow: 'auto',
        scrollBehavior: 'smooth'
      }}
    >
      <ThemeBackground />
      
      <LanguageBar lang={lang} />
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(28),
          padding: `2.625rem ${rhythm(3 / 4)}`,
          background: 'var(--bg)',
        }}
      >
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2.625rem',
          }}
        >
          <Header base={homeLink} location={location} title={title} />
          <ReadModeToggle />
        </header>
        <Breadcrumbs
          base={homeLink}
          langKey={lang}
          data={breadcrumbs}
          showTop={true}
          style={{ marginTop: '-1.5rem' }}
        />
        {children}
        <Footer />
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object.isRequired,
  title: PropTypes.string,
  breadcrumbs: PropTypes.array,
};

Layout.defaultProps = {
  children: null,
  title: null,
  breadcrumbs: null,
};

export default Layout;
