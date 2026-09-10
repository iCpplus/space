import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Bio from 'components/Bio';
import Layout from 'components/Layout';
import SEO from 'components/SEO';
import PostAbbrev from 'components/PostAbbrev';
import PostAbbrevSimple from 'components/PostAbbrev/PostAbbrevSimple';
import Pagination from 'components/Pagination';
import { useLang } from 'context/LanguageContext';
import { formatMessage } from 'utils/i18n';

const BlogIndex = function ({ pageData }) {
    const { from, to, currentPage, numPages, posts, totalCount } = pageData;
    const siteTitle = formatMessage('title');

    const { lang, homeLink } = useLang();

    const [simpleTheme, setSimpleTheme] = useState('0');

    useLayoutEffect(() => {
        const flag = localStorage.getItem('simpleTheme') === '1';
        setSimpleTheme(flag ? '1' : '0');
    }, []);

    return (
        <Layout title={siteTitle} setSimpleTheme={setSimpleTheme}>
            <SEO title={formatMessage('tIndTitle')} keywords={formatMessage('taIndKeywords')} />
            <aside>
                <Bio />
            </aside>
            <div style={{ fontWeight: '700', fontSize: '22px' }}>
                {formatMessage('tfIndCountPosts', { count: totalCount, from, to })}
            </div>
            {posts.map((post, index) => {
                const layoutFlag = index % 2 === 0 ? 0 : 1;
                const title = post.frontmatter.title || post.slug;

                const commonProps = {
                    lang,
                    base: homeLink,
                    slug: post.slug,
                    date: post.frontmatter.date,
                    timeToRead: post.timeToRead,
                    title,
                    excerpt: post.frontmatter.description || post.excerpt,
                    tags: post.frontmatter.tags,
                    cover: post.frontmatter.cover,
                    layoutFlag,
                };

                return simpleTheme === '1' ? (
                    <PostAbbrevSimple key={post.slug} {...commonProps} />
                ) : (
                    <PostAbbrev key={post.slug} {...commonProps} />
                );
            })}
            <Pagination currentPage={currentPage} totalPageNumber={numPages} />
        </Layout>
    );
};

BlogIndex.propTypes = {
    pageData: PropTypes.object.isRequired,
};

export default BlogIndex;
