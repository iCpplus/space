import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Bio from 'components/Bio';
import Layout from 'components/Layout';
import SEO from 'components/SEO';
import PostAbbrev from 'components/PostAbbrev';
import PostAbbrevSimple from 'components/PostAbbrev/PostAbbrevSimple';

import Pagination from 'components/Pagination';
import { useLang } from 'context/LanguageContext';
import { formatMessage } from 'utils/i18n';

const BlogIndex = function ({ pageContext, data, location }) {
  const { from, to, currentPage, numPages } = pageContext;
  // const siteTitle = data.site.siteMetadata.title;
  const siteTitle = formatMessage('title');
  const posts = data.allMarkdownRemark.edges;

  const { lang, homeLink } = useLang();

  const [simpleTheme, setSimpleTheme] = useState('0')

  useLayoutEffect(() => {
    const flag = localStorage.getItem('simpleTheme')==='1'
    if (flag) {
      setSimpleTheme('1')
    }else{
      setSimpleTheme('0')
    }
  }, [])

  return (
    <Layout location={location} title={siteTitle} setSimpleTheme={setSimpleTheme}>
      <SEO title={formatMessage('tIndTitle')} keywords={formatMessage('taIndKeywords')} />
      <aside>
        <Bio />
      </aside>
      <div style={{ fontWeight: '700', fontSize: '22px' }}>
        {formatMessage('tfIndCountPosts', { count: data.allMarkdownRemark.totalCount, from, to })}
      </div>
      {posts.map(({ node }, index) => {
        const layoutFlag = index % 2 === 0 ? 0 : 1
        const title = node.frontmatter.title || node.fields.slug;
        return (
          simpleTheme==='1' ? <PostAbbrevSimple
            lang={lang}
            base={homeLink}
            key={node.fields.slug}
            slug={node.fields.slug}
            date={node.frontmatter.date}
            timeToRead={node.timeToRead}
            title={title}
            excerpt={node.frontmatter.description || node.excerpt}
            tags={node.frontmatter.tags}
            cover={node.frontmatter.cover}
            layoutFlag={layoutFlag}
          /> : <PostAbbrev
            lang={lang}
            base={homeLink}
            key={node.fields.slug}
            slug={node.fields.slug}
            date={node.frontmatter.date}
            timeToRead={node.timeToRead}
            title={title}
            excerpt={node.frontmatter.description || node.excerpt}
            tags={node.frontmatter.tags}
            cover={node.frontmatter.cover}
            layoutFlag={layoutFlag}
          />
        );
      })}
      <Pagination currentPage={currentPage} totalPageNumber={numPages} />
    </Layout>
  );
};

BlogIndex.propTypes = {
  pageContext: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

BlogIndex.defaultProps = {};

export default BlogIndex;

export const pageQuery = graphql`
  query ($langKey: String!, $skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fields: { langKey: { eq: $langKey } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      totalCount
      edges {
        node {
          excerpt
          timeToRead
          fields {
            slug
            langKey
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
            cover
          }
        }
      }
    }
  }
`;
