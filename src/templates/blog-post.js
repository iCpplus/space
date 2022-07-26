import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

import Bio from 'components/Bio';
import Layout from 'components/Layout';
import SEO from 'components/SEO';
import TagList from 'components/TagList';
import RelativePosts from 'components/RelativePosts';
import TranslationsLink from 'components/TranslationsLink';
import Valine from 'gatsby-plugin-valine'
import './valine.css'

import { formatReadingTime } from 'utils/helpers';
import { formatDate, formatMessage } from 'utils/i18n';
import { rhythm, scale } from 'utils/typography';
import { useLang } from 'context/LanguageContext';

import './catalog.css'

const BlogPostTemplate = function ({ data, pageContext, location }) {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next, previousInSameTag, nextInSameTag, translationsLink } = pageContext;
  const [language, setLanguage] = useState('zh-CN')
  const [placeholder, setPlaceholder] = useState('')
  useEffect(() => {
    const flag = window.location.href.split('/').includes('en')
    const u = flag ? 'en' : 'zh-CN'
    const p = flag ? `
    Please kindly comment`: `
    • 请大家友善评论,遵纪守法。爱国、敬业、诚信、友善
    • 昵称输入qq账号,将自动引用qq相关头像昵称邮箱哦`
    setLanguage(u)
    setPlaceholder(p)
  }, [])

  const { lang, homeLink } = useLang();

  let tags;
  if (post.frontmatter.tags) {
    tags = <TagList tags={post.frontmatter.tags} baseUrl={`${homeLink}tags`} />;
  }

  return (
    <Layout location={location} title={siteTitle} breadcrumbs={[{ text: post.frontmatter.title }]}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <h1>{post.frontmatter.title}</h1>
      <p
        style={{
          ...scale(-1 / 5),
          display: `block`,
          marginBottom: rhythm(1),
          marginTop: rhythm(-1),
        }}
      >
        {formatDate(post.frontmatter.date)}
        {` • ${formatReadingTime(post.timeToRead)}`}

        <span style={{ marginLeft: '20px', color: 'var(--tag-bg)' }} id={post.fields.slug} className="leancloud_visitors" data-flag-title={post.fields.slug}>
          <span>{formatMessage('tRead') + ' : '}</span>
          <span className="leancloud-visitors-count">•••</span>
        </span>
      </p>

      {tags}
      <TranslationsLink
        translationsLink={translationsLink}
        langKey={lang}
        style={{ margin: '-0.5rem 0 1.5rem' }}
      />

      <div className='css-post' dangerouslySetInnerHTML={{ __html: post.html }} />
      <div className='css-toc' dangerouslySetInnerHTML={{ __html: post.tableOfContents }} />
      {
        post.frontmatter.relative && <RelativePosts postNodes={[previousInSameTag, nextInSameTag]} lang={lang} />
      }
      
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <Bio />

      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
          marginLeft: 0,
        }}
      >
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </ul>
      {
        post.frontmatter.disqus && <Valine className='valine' lang={language} placeholder={placeholder} pageSize={5} path={post.fields.slug} enableQQ visitor recordIP meta={['nick', 'mail']} />
      }
      
    </Layout>
  );
};

BlogPostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        lang
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      tableOfContents(pathToSlugField:"frontmatter.path")
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        disqus
        relative
      }
      fields {
        langKey,
        slug
      }
    }
  }
`;
