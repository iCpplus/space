import React from 'react';
import { rhythm } from 'utils/typography';
import { formatMessage } from 'utils/i18n';
import footIcon1 from '../../assets/pig.jpg'

const Footer = function () {
  return (
    <footer
      style={{
        marginTop: rhythm(2.5),
        paddingTop: rhythm(1),
        textAlign: 'center',
      }}
    >
      <p>
        <a href='https://www.inana.cc/' style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img style={{
            borderRadius: '50%',
            width: '30px',
            heght: '30px',
            marginRight:'20px'
          }} src={footIcon1} alt='' />
          <span style={{color:'#ffa5b0'}}>{formatMessage('tfootContent')}</span>
        </a>
      </p>
    </footer>
  );
}

export default Footer;
