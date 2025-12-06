import React, { useEffect, useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { formatMessage } from 'utils/i18n';
import '../Tag/Tag.css'

import { Github, Twitter, Facebook, Medium } from '../icons';

const SocialBar = function () {
  const [goTags, setGoTags] = useState()
  const [goResume, setGoResume] = useState()
  const [goMapSpace, setMapSpace] = useState()
  useEffect(() => {
    const flag = window.location.href.split('/').includes('en')
    const origin = window.location.origin
    const u = flag ? `${origin}/space/en/tags/` : `${origin}/space/tags/`
    const r = flag ? `${origin}/space/en/resume` : `${origin}/space/resume`
    const s = `${origin}/space/map-space`

    const f1 = () => {
      window.location.href = u
    }
    const f2 = () => {
      window.location.href = r
    }
    const f3 = () => {
      window.location.href = s
    }
    setGoTags(() => {
      return f1
    })
    setGoResume(()=>{
      return f2
    })
    setMapSpace(()=>{
      return f3
    })
  }, [])
  return (
    <StaticQuery
      // eslint-disable-next-line no-use-before-define
      query={socialQuery}
      render={data => {
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
            <div role='presentation' className="round-tag" onClick={goResume} style={{ cursor: 'pointer', display: 'block',marginLeft:'30px' }}>
              <div className='link'>
                <span className="text">
                  {formatMessage('tResume')}
                </span>
              </div>
            </div>
            <div role='presentation' className="round-tag" onClick={goMapSpace} style={{ cursor: 'pointer', display: 'block',marginLeft:'30px' }}>
              <div className='link'>
                <span className="text">
                  space
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
