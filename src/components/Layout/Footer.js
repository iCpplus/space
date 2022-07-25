import React, { useEffect, useState } from 'react';
import { rhythm } from 'utils/typography';
import { formatMessage } from 'utils/i18n';
import footIcon1 from '../../assets/jump.jpg'

const Footer = function () {
  const [goHome, setGoHome] = useState()
  useEffect(() => {
    const u = window.location.href.split('/').includes('en') ? 'https://www.inana.cc/en/' : 'https://www.inana.cc/'
    const f = () => {
      window.location.href = u
    }
    setGoHome(f)
  }, [])

  return (
    <footer
      style={{
        marginTop: rhythm(2.5),
        paddingTop: rhythm(1),
        textAlign: 'center',
      }}
    >
      <p>
        <div role='presentation' onClick={()=>goHome} style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor:'pointer'
        }}>
          <img style={{
            borderRadius: '50%',
            width: '40px',
            heght: '40px',
            marginRight: '20px'
          }} src={footIcon1} alt='' />
          <span style={{ color: '#ffa5b0' }}>{formatMessage('tfootContent')}</span>
        </div>
      </p>
    </footer>
  );
}

export default Footer;
