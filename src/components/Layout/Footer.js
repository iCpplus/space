import React from 'react';

import { rhythm } from 'utils/typography';

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

        <a
        >
          Copyright:  PRC . Province Japan
        </a>
        <a href='https://www.inana.cc/tags' style={{
          display:'inline-block',
          borderRadius:'6px',
          marginLeft:'20px',
          background:'#f7a046'
        }}> 分类tags</a>
      </p>
    </footer>
  );
}

export default Footer;
