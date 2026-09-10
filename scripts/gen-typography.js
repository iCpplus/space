/**
 * Generates `styles/typography.generated.css` from the same typography theme used
 * by the original Gatsby project, so the base typographic styles are identical.
 * Run with: `npm run typography`.
 */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const Typography = require('typography').default || require('typography');
const Wordpress2016 =
    require('typography-theme-wordpress-2016').default || require('typography-theme-wordpress-2016');

Wordpress2016.overrideThemeStyles = () => ({
    'a.gatsby-resp-image-link': {
        boxShadow: 'none',
    },
});

delete Wordpress2016.googleFonts;

const typography = new Typography(Wordpress2016);
const outFile = path.join(__dirname, '..', 'styles', 'typography.generated.css');

fs.writeFileSync(outFile, typography.toString());

console.log(`Wrote ${outFile} (${fs.statSync(outFile).size} bytes)`);
