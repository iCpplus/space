import React from 'react';

import Layout from 'components/Layout';
import SEO from 'components/SEO';
import { formatMessage } from 'utils/i18n';

const NotFoundPage = function () {
    return (
        <Layout title={formatMessage('title')}>
            <SEO title={formatMessage('t404Title')} />
            <h1>{formatMessage('t404Title')}</h1>
            <p>{formatMessage('t404Content')}</p>
        </Layout>
    );
};

export default NotFoundPage;
