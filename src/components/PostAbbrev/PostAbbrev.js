import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import { rhythm } from 'utils/typography';
import { formatReadingTime } from 'utils/helpers';
import { formatDate } from 'utils/i18n';


import TagList from '../TagList';
import './index.css'

const PostAbbrev = function ({ slug, title, date, timeToRead, excerpt, tags, base, cover, layoutFlag }) {
  let excerptPart;
  if (excerpt) {
    excerptPart = (
      <p
        dangerouslySetInnerHTML={{
          __html: excerpt,
        }}
      />
    );
  }

  let tagsPart;
  if (tags) {
    tagsPart = (
      <TagList style={{ margin: '0.5rem 0 -0.5rem -0.5rem' }} tags={tags} baseUrl={`${base}tags`} />
    );
  }
  const arr = cover.split('.')
  arr.splice(arr.length - 1, 0, 'th')
  const lowCover = arr.join('.')
  console.log(lowCover);
  return (
    <div className='article' style={{ background: 'var(--bg-article)' }} >
      <div className='article-doc'>
        <div className='title'>
          <Link style={{ boxShadow: 'none' }} to={slug} rel="bookmark">
            <a>{title}</a>
          </Link>
        </div>
        <div className='other'>{tagsPart}</div>
        <div className='desc'>{excerptPart}</div>

        <div className='article-bottom'>
          <div className='read-time'>{formatReadingTime(timeToRead)}</div>
          <div className='time'>{`${formatDate(date)}`}</div>
        </div>

      </div>
      <div className='img-contain'>
        <Link style={{ boxShadow: 'none' }} to={slug} rel="bookmark">
          <img loading='lazy' decoding="async" src={lowCover || 'https://img.picgo.net/2023/05/21/108313985_p0_master12009df002d025ea79b9.jpeg'} alt='' />
          <img loading='lazy' decoding="async" style={{position:'absolute',top:'0px',left:'0px'}} src={cover || 'https://img.picgo.net/2023/05/21/108313985_p0_master12009df002d025ea79b9.jpeg'} alt='' />
        </Link>
      </div>
    </div >
  );
}

PostAbbrev.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string,
  date: PropTypes.string.isRequired,
  timeToRead: PropTypes.number.isRequired,
  excerpt: PropTypes.string,
  tags: PropTypes.array,
  base: PropTypes.string,
  cover: PropTypes.string,
  layoutFlag: PropTypes.number
};

PostAbbrev.defaultProps = {
  title: null,
  excerpt: null,
  tags: null,
  base: '',
  cover: '',
  layoutFlag: 0
};

export default PostAbbrev;
