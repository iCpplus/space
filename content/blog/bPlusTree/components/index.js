import BPlusTreeDemo from './BPlusTreeDemo';

/**
 * MDX components used by *this* article only.
 *
 * Every key is a tag that can be written directly in `index.mdx` / `index.en.mdx`
 * of this folder, eg. `<b-plus-tree-demo order="3"></b-plus-tree-demo>`.
 *
 * `scripts/gen-article-registry.js` imports this file and wires it to the article
 * folder name, so no other file has to be touched when adding a component here.
 */
export default {
    'b-plus-tree-demo': BPlusTreeDemo,
};
