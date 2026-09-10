/**
 * Site wide configuration. Mirrors the original Gatsby project's `config/index.js`.
 */
const site = {
    // The original site is deployed under a `/space` path prefix. The Next.js app
    // is served from the domain root, so the prefix is empty here.
    pathPrefix: '',
    title: 'anyspace',
    author: 'Kou ShiXiang',
    description: '一个记录知识和生活的神秘小空间',
    siteUrl: 'https://anyspace.cc',
    disqusShortName: 'anyspace',
    googleTrackingId: 'G-E7NM1ZBB2T',
    lang: 'zh-hans',
    displayTranslations: true,
    postsPerPage: 5,
};

const supportedLanguages = {
    en: 'English',
    'zh-hans': '简体中文',
};

module.exports = {
    site,
    supportedLanguages,
};
