module.exports = {
  tHome: '主页',
  tRelativePosts: '相关文章',
  tTags: '所有标签',
  tCatalog: '所有标签',
  tIndTitle: '所有文章',
  taIndKeywords: [`博客`, `gatsby`, `javascript`, `react`],
  tfIndCountPosts: ({ count, from, to }) => `共 ${count} 篇文章 (第${from} 到 ${to}篇)`,
  tfTagHeader: (totalCount, tag) => `在 "${tag}" 里共有 ${totalCount} 篇文章`,
  tfootContent: '欢迎来到CoCo\'s Space',
  desc:'一个记录知识和生活的神秘小空间',
  title:'CoCo的小空间',
  tRead:'阅读量',
  tResume:'个人简历'
};
