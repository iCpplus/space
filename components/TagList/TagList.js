import React from 'react';
import PropTypes from 'prop-types';

import { kebabCase } from 'utils/helpers';
import Tag from '../Tag';

import styles from './TagList.module.scss';

const TagList = function ({ tags, baseUrl = '', ...restProps }) {
    return (
        <ul className={styles['tag-ul']} {...restProps}>
            {tags.map((text) => (
                <li key={text}>
                    <Tag text={text} url={`${baseUrl}/${kebabCase(text)}/`} />
                </li>
            ))}
        </ul>
    );
};

TagList.propTypes = {
    tags: PropTypes.array.isRequired,
    baseUrl: PropTypes.string,
};

export default TagList;
