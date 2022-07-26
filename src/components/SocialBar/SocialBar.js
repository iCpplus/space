import React, { useEffect, useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { formatMessage } from 'utils/i18n';
import '../Tag/Tag.css'

import { Github, Twitter, Facebook, Medium } from '../icons';

const SocialBar = function () {
  const [goTags, setGoTags] = useState()
  const [goResume, setGoResume] = useState()
  useEffect(() => {
    const flag = window.location.href.split('/').includes('en')
    const u = flag ? 'https://www.inana.cc/en/tags/' : 'https://www.inana.cc/tags/'
    const r = flag ? 'https://www.inana.cc/en/resume' : 'https://www.inana.cc/resume'
    const f1 = () => {
      window.location.href = u
    }
    const f2 = () => {
      window.location.href = r
    }
    setGoTags(() => {
      return f1
    })
    setGoResume(()=>{
      return f2
    })
  }, [])
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
            <div role='presentation' className="round-tag" onClick={goResume} style={{ cursor: 'pointer', display: 'block',marginLeft:'10px' }}>
              <div className='link'>
                <span className="text">
                  {formatMessage('tResume')}
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
