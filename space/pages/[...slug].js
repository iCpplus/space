import React from 'react';
import PropTypes from 'prop-types';

import BlogIndex from '../templates/BlogIndex';
import BlogPost from '../templates/BlogPost';
import Tags from '../templates/Tags';
import TagPage from '../templates/TagPage';
import { getRouteStaticPaths, getRouteStaticProps } from '../lib/routeProps';

const RoutePage = function ({
  kind,
  pageData = null,
  tagGroups = null,
  tag = null,
  posts = null,
  ...rest
}) {
  if (kind === 'index') return <BlogIndex pageData={pageData} />;
  if (kind === 'post') return <BlogPost {...rest} />;
  if (kind === 'tags') return <Tags tagGroups={tagGroups} />;
  if (kind === 'tag') return <TagPage tag={tag} posts={posts} />;
  return null;
};

RoutePage.propTypes = {
  kind: PropTypes.string.isRequired,
  pageData: PropTypes.object,
  tagGroups: PropTypes.array,
  tag: PropTypes.string,
  posts: PropTypes.array,
};

export default RoutePage;

export async function getStaticPaths() {
  // `blocking` keeps every page statically generated at build time, while also
  // letting newly added articles resolve on demand during `next dev` (and for
  // any path that was not part of the last build).
  return { paths: getRouteStaticPaths(), fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  return getRouteStaticProps(params.slug);
}
