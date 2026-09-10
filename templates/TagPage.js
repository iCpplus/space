import React from 'react';
import PropTypes from 'prop-types';

import Layout from 'components/Layout';
import SEO from 'components/SEO';
import PostAbbrevSimple from 'components/PostAbbrev/PostAbbrevSimple';
import Bio from 'components/Bio';
import { useLang } from 'context/LanguageContext';
import { formatMessage } from 'utils/i18n';

const TagPageTemplate = function ({ tag, posts }) {
    const siteTitle = formatMessage('title');
    const { lang, homeLink } = useLang();

    const tagHeader = formatMessage('tfTagHeader', posts.length, tag);

    return (
        <Layout
            title={siteTitle}
            breadcrumbs={[{ text: formatMessage('tTags'), url: `${homeLink}tags/` }, { text: tag }]}
        >
            <SEO title={tagHeader} description={tagHeader} />
            <h1>{tagHeader}</h1>
            <main>
                {posts.map((post) => {
                    const title = post.frontmatter.title || post.slug;
                    return (
                        <PostAbbrevSimple
                            key={post.slug}
                            base={homeLink}
                            lang={lang}
                            slug={post.slug}
                            date={post.frontmatter.date}
                            timeToRead={post.timeToRead}
                            title={title}
                        />
                    );
                })}
            </main>
            <div style={{ marginTop: 50 }} />
            <aside>
                <Bio />
            </aside>
        </Layout>
    );
};

TagPageTemplate.propTypes = {
    tag: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
};

export default TagPageTemplate;
