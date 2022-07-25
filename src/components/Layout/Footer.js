import React, { useEffect } from 'react';
import { rhythm } from 'utils/typography';
import { formatMessage } from 'utils/i18n';
import footIcon1 from '../../assets/jump.jpg'

const Footer = function () {
  let url = ''
  useEffect(()=>{
    url = window.location.href.split('/').includes('en') ? 'https://www.inana.cc/en/' : 'https://www.inana.cc/'
  },[])
  return (
    <footer
      style={{
        marginTop: rhythm(2.5),
        paddingTop: rhythm(1),
        textAlign: 'center',
      }}
    >
      <p>
        <a href={url} style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img style={{
            borderRadius: '50%',
            width: '40px',
            heght: '40px',
            marginRight: '20px'
          }} src={footIcon1} alt='' />
          <span style={{ color: '#ffa5b0' }}>{formatMessage('tfootContent')}</span>
        </a>
      </p>
    </footer>
  );
}

export default Footer;
