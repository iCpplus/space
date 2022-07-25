import React, { useEffect, useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { formatMessage } from 'utils/i18n';
import '../Tag/Tag.css'

import { Github, Twitter, Facebook, Medium } from '../icons';

const SocialBar = function () {
  const [goTags,setGoTags] = useState()
  useEffect(()=>{
    const u = window.location.href.split('/').includes('en') ? 'https://www.inana.cc/en/tags/' : 'https://www.inana.cc/tags/'
    const f = ()=>{
      window.location.href = u
    }
    setGoTags(f)
  },[])
  return (
    <StaticQuery
      // eslint-disable-next-line no-use-before-define
      query={socialQuery}
      render={data => {
        const { twitter, github, medium, facebook } = data.site.siteMetadata.social;
        return (
          <div
            style={{
              display: 'flex',
              margin: 'auto',
            }}
          >
            {/* {facebook && <Facebook username={facebook} />}
            {twitter && <Twitter username={twitter} />}
            {github && <Github username={github} />}
            {medium && <Medium username={medium} />} */}
            <div role='presentation' className="round-tag" onClick={goTags} style={{ cursor: 'pointer', display: 'block' }}>
              <div className='link'>
                <span className="text">
                  {formatMessage('tCatalog')}
                </span>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
}

const socialQuery = graphql`
  query SocialQuery {
    site {
      siteMetadata {
        social {
          twitter
          github
          medium
          facebook
        }
      }
    }
  }
`;
export default SocialBar;
