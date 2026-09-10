/**
 * /blog/ja/aaa, [en, ja], en, /blog -> ja
 * /blog/zh-hans/aaa, [en, ja], en, /blog -> en
 * /ja/aaa, [en, ja], en, /blog -> ja
 *
 * @param {*} url
 * @param {*} langList
 * @param {*} defaultLang
 * @param {*} pathPrefix
 */
const getCurrentLangKey = (url, langList, defaultLang, pathPrefix = '') => {
    const normalized = url.replace(new RegExp(`^${pathPrefix}/`), '/');

    const langKey = normalized.split('/')[1];

    return langList.includes(langKey) ? langKey : defaultLang;
};

module.exports = getCurrentLangKey;
