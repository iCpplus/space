import React from 'react';

import Layout from 'components/Layout';
import SettingForm from 'components/Layout/SettingForm';
import SEO from 'components/SEO';
import { formatMessage } from 'utils/i18n';

const SettingPage = function () {
    const title = formatMessage('tThemeSetting');

    return (
        <Layout title={formatMessage('title')} breadcrumbs={[{ text: title }]}>
            <SEO title={title} />
            <h1>{title}</h1>
            <SettingForm />
        </Layout>
    );
};

export default SettingPage;
