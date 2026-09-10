import React from 'react';
import PropTypes from 'prop-types';

import BlogIndex from '../templates/BlogIndex';
import { getRouteStaticProps } from '../lib/routeProps';

const HomePage = function ({ pageData }) {
    return <BlogIndex pageData={pageData} />;
};

HomePage.propTypes = {
    pageData: PropTypes.object.isRequired,
};

export default HomePage;

export async function getStaticProps() {
    return getRouteStaticProps([]);
}
