import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';
import GithubSlugger from 'github-slugger';

function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function buildTree(headings) {
    const root = { children: [], depth: 0 };
    const stack = [root];

    headings.forEach((heading) => {
        const node = { ...heading, children: [] };
        while (stack.length > 1 && stack[stack.length - 1].depth >= heading.depth) {
            stack.pop();
        }
        stack[stack.length - 1].children.push(node);
        stack.push(node);
    });

    return root;
}

function renderTree(node) {
    if (!node.children.length) return '';
    return `<ul>${node.children
        .map(
            (child) =>
                `<li><a href="#${child.slug}">${escapeHtml(child.text)}</a>${renderTree(child)}</li>`,
        )
        .join('')}</ul>`;
}

/**
 * Extracts the headings of a markdown document and renders a nested table of
 * contents, replicating `gatsby-transformer-remark`'s `tableOfContents`.
 * Heading ids match `rehype-slug` (both use github-slugger).
 */
export function buildTableOfContents(markdown) {
    const tree = unified().use(remarkParse).use(remarkGfm).parse(markdown);
    const slugger = new GithubSlugger();
    const headings = [];

    visit(tree, 'heading', (node) => {
        const text = toString(node);
        if (!text) return;
        headings.push({ depth: node.depth, text, slug: slugger.slug(text) });
    });

    if (headings.length === 0) return '';

    return renderTree(buildTree(headings));
}
