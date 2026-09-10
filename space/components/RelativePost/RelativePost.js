import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { rhythm } from 'utils/typography';
import { formatDate } from 'utils/i18n';

const RelativePost = function ({ post }) {
    return (
        <Link style={{ boxShadow: 'none' }} href={post.slug} rel="bookmark">
            <article
                style={{
                    marginBottom: rhythm(1 / 2),
                }}
            >
                <header>
                    <h3
                        style={{
                            fontSize: rhythm(1),
                            margin: `${rhythm(1 / 2)} ${rhythm(1 / 4)} 0`,
                        }}
                    >
                        {post.title}
                    </h3>
                    <small
                        style={{
                            marginLeft: rhythm(1 / 4),
                        }}
                    >
                        {formatDate(post.date)}
                    </small>
                </header>
            </article>
        </Link>
    );
};

RelativePost.propTypes = {
    post: PropTypes.object.isRequired,
};

export default RelativePost;
