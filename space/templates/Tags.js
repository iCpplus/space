import React from 'react';
import PropTypes from 'prop-types';

import Layout from 'components/Layout';
import Tag from 'components/Tag';
import Bio from 'components/Bio';
import SEO from 'components/SEO';
import { useLang } from 'context/LanguageContext';
import { formatMessage } from 'utils/i18n';
import { kebabCase } from 'utils/helpers';

const styles = {
    tagListDiv: {
        marginLeft: '1.5rem',
        lineHeight: 3,
    },
};

const TagsPage = function ({ tagGroups }) {
    const { homeLink } = useLang();
    const tTags = formatMessage('tTags');

    return (
        <Layout title={formatMessage('title')} breadcrumbs={[{ text: tTags }]}>
            <SEO title={tTags} />
            <aside>
                <Bio />
            </aside>
            <div>
                <h1>{tTags}</h1>
                <div style={styles.tagListDiv}>
                    {tagGroups.map((tag) => (
                        <Tag
                            key={tag.fieldValue}
                            text={tag.fieldValue}
                            count={tag.totalCount}
                            url={`${homeLink}tags/${kebabCase(tag.fieldValue)}/`}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

TagsPage.propTypes = {
    tagGroups: PropTypes.array.isRequired,
};

export default TagsPage;
