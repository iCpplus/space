import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import styles from './LangList.module.scss';

const LangList = function ({ languages, langKey, ...restProps }) {
    return (
        <div className={styles['lang-root']} {...restProps}>
            {Object.keys(languages).map((lang) => {
                const url = lang === langKey ? '/' : `/${lang}/`;

                return (
                    <Link key={lang} href={url} className={styles['lang-link']}>
                        {languages[lang]}
                    </Link>
                );
            })}
        </div>
    );
};

LangList.propTypes = {
    languages: PropTypes.object.isRequired,
    langKey: PropTypes.string.isRequired,
};

export default LangList;
