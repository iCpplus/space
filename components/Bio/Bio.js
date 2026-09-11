import React from 'react';
import Image from 'next/image';

import { site } from 'config';
import withBasePath from 'utils/basePath';
import { rhythm } from 'utils/typography';
import { formatMessage } from 'utils/i18n';

import SocialBar from '../SocialBar';

import styles from './Bio.module.scss';

const Bio = function () {
    const { author } = site;
    const description = formatMessage('desc');

    return (
        <div
            style={{
                marginBottom: rhythm(0.6),
            }}
        >
            <div className={styles.bio}>
                <div style={{ width: '70px', height: '70px', marginRight: '10px' }}>
                    <Image
                        src={withBasePath('/profile-pic.jpg')}
                        alt={author}
                        className={styles.pic}
                        width={70}
                        height={70}
                        style={{ borderRadius: '50%' }}
                    />
                </div>

                <div className={styles.description}>
                    <p>{description}</p>
                    <SocialBar />
                </div>
            </div>
        </div>
    );
};

export default Bio;
