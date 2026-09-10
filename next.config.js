/**
 * Next.js only supports `.css`, `.scss` and `.sass` out of the box. This project
 * is authored with **Less**, so we patch Next's built-in CSS webpack rules to
 * also match `.less` and run `less-loader` before the existing css/postcss
 * pipeline. Doing it this way (instead of adding a standalone `style-loader`
 * rule) keeps SSR CSS extraction, CSS Modules, code-splitting and HMR working
 * exactly like plain CSS.
 */

const LESS_REGEX = /\.less$/;

/** Turn a css regexp into its less equivalent (e.g. `/\.module\.css$/` -> `/\.module\.less$/`). */
function lessify(re) {
    if (!(re instanceof RegExp) || !re.source.includes('css')) return null;
    return new RegExp(re.source.replace(/css/g, 'less'), re.flags);
}

function isCssTest(test) {
    if (test instanceof RegExp) return test.source.includes('css');
    if (Array.isArray(test)) return test.some((t) => t instanceof RegExp && t.source.includes('css'));
    return false;
}

function buildLessTest(test) {
    const tests = Array.isArray(test) ? test : [test];
    const lessTests = tests.map(lessify).filter(Boolean);
    if (lessTests.length === 0) return null;
    return lessTests.length === 1 ? lessTests[0] : lessTests;
}

function withLessLoader(use) {
    const lessLoader = {
        loader: require.resolve('less-loader'),
        options: { lessOptions: { javascriptEnabled: true } },
    };

    // Never touch error-loader rules, they must keep throwing.
    if (use && !Array.isArray(use) && use.loader === 'error-loader') return use;
    if (Array.isArray(use)) {
        // Pre-processors go last: webpack runs `use` from right to left.
        return [...use, lessLoader];
    }
    if (use && typeof use === 'object') {
        return [use, lessLoader];
    }
    return use;
}

function patchRules(rules) {
    if (!Array.isArray(rules)) return;

    rules.forEach((rule) => {
        if (!rule || typeof rule !== 'object') return;

        if (Array.isArray(rule.oneOf)) {
            const cloneRules = [];
            rule.oneOf.forEach((entry) => {
                cloneRules.push(entry);
                if (!entry || typeof entry !== 'object' || !entry.test || !isCssTest(entry.test)) return;

                const lessTest = buildLessTest(entry.test);
                if (!lessTest) return;

                cloneRules.push({ ...entry, test: lessTest, use: withLessLoader(entry.use) });
            });
            rule.oneOf = cloneRules;
        }

        if (Array.isArray(rule.rules)) patchRules(rule.rules);
    });
}

/** Let `url()` references inside Less files be emitted as assets. */
function addLessAssetRule(config) {
    config.module.rules.push({
        oneOf: [
            {
                issuer: LESS_REGEX,
                exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/, /\.webpack\[[^\]]+\]$/],
                type: 'asset/resource',
            },
        ],
    });
}

const { site } = require('./config');

const basePath = site.pathPrefix || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
    // GitHub Pages only serves static files, so `next build` has to emit a fully
    // static site into `out/` instead of a server rendered app.
    output: 'export',
    // Deployed as a project page (`https://icpplus.github.io/space/`), which
    // requires every route and `_next/*` asset to be prefixed with the repo name.
    ...(basePath ? { basePath } : {}),
    reactStrictMode: false,
    trailingSlash: true,
    outputFileTracingRoot: __dirname,
    images: {
        // The original blog references remote covers/avatars from image hosts.
        remotePatterns: [
            { protocol: 'https', hostname: 'img.picgo.net' },
            { protocol: 'https', hostname: 'npm.elemecdn.com' },
        ],
        unoptimized: true,
    },
    webpack(config) {
        patchRules(config.module.rules);
        addLessAssetRule(config);
        return config;
    },
};

module.exports = nextConfig;
