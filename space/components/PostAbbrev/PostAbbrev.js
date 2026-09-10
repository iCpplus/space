import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';

import { formatReadingTime } from 'utils/helpers';
import { formatDate } from 'utils/i18n';

import TagList from '../TagList';

const DEFAULT_LOW_COVER = 'https://img.picgo.net/2023/05/21/108313985_p0_master12009df002d025ea79b9.th.jpeg';
const DEFAULT_COVER = 'https://img.picgo.net/2023/05/21/108313985_p0_master12009df002d025ea79b9.jpeg';

/** Builds the low resolution variant of a cover by inserting `th` before the extension. */
function toLowCover(cover) {
    const arr = cover.split('.');
    arr.splice(arr.length - 1, 0, 'th');
    return arr.join('.');
}

const PostAbbrev = function ({
    slug,
    title = null,
    date,
    timeToRead,
    excerpt = null,
    tags = null,
    base = '',
    cover = '',
}) {
    let excerptPart;
    if (excerpt) {
        excerptPart = <p>{excerpt}</p>;
    }

    let tagsPart;
    if (tags) {
        tagsPart = (
            <TagList style={{ margin: '0.5rem 0 -0.5rem -0.5rem' }} tags={tags} baseUrl={`${base}tags`} />
        );
    }

    const lowCover = cover ? toLowCover(cover) : null;

    return (
        <div className="article" style={{ background: 'var(--bg-article)' }}>
            <div className="article-doc">
                <div className="title">
                    <Link style={{ boxShadow: 'none' }} href={slug} rel="bookmark">
                        {title}
                    </Link>
                </div>
                <div className="other">{tagsPart}</div>
                <div className="desc">{excerptPart}</div>

                <div className="article-bottom">
                    <div className="read-time">{formatReadingTime(timeToRead)}</div>
                    <div className="time">{`${formatDate(date)}`}</div>
                </div>
            </div>
            <div className="img-contain">
                <Link style={{ boxShadow: 'none' }} href={slug} rel="bookmark">
                    <img loading="lazy" decoding="async" src={lowCover || DEFAULT_LOW_COVER} alt="" />
                    <img
                        loading="lazy"
                        decoding="async"
                        style={{ position: 'absolute', top: '0px', left: '0px' }}
                        src={cover || DEFAULT_COVER}
                        alt=""
                    />
                </Link>
            </div>
        </div>
    );
};

PostAbbrev.propTypes = {
    slug: PropTypes.string.isRequired,
    title: PropTypes.string,
    date: PropTypes.string.isRequired,
    timeToRead: PropTypes.number.isRequired,
    excerpt: PropTypes.string,
    tags: PropTypes.array,
    base: PropTypes.string,
    cover: PropTypes.string,
};

export default PostAbbrev;
