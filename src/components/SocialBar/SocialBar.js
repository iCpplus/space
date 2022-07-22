import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { formatMessage } from 'utils/i18n';
import '../Tag/Tag.css'

import { Github, Twitter, Facebook, Medium } from '../icons';

const SocialBar = function () {
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
            <div className="round-tag" style={{cursor:'pointer'}}>
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
