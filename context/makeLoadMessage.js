/**
 * Loads and caches the locale message objects. Mirrors the original
 * `src/context/makeLoadMessage.js` but uses static requires so bundlers can
 * resolve every locale on both the server and the client.
 */
const localeLoaders = {
    en: () => require('../config/locales/en'),
    'zh-hans': () => require('../config/locales/zh-hans'),
};

const textCache = {};

function makeLoadMessage(defaultLang = 'en') {
    return function loadMessage(lang) {
        let result = textCache[lang];
        if (!result) {
            // get default language's definitions
            const defMsgs = lang === defaultLang ? {} : loadMessage(defaultLang);

            const loader = localeLoaders[lang];

            // merge with default definitions
            result = {
                ...defMsgs,
                ...(loader ? loader() : {}),
            };
            textCache[lang] = result;
        }

        return result;
    };
}

export default makeLoadMessage;
