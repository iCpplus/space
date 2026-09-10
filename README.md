# space

Next.js + MDX 重写的个人博客（原 `gatsby-simple-blog` / anyspace 的文章相关功能）。

## 技术栈

- **Next.js 15**（Pages Router）+ **JavaScript**
- **Less**（自定义 `next.config.js` webpack patch，让 Next 内置 CSS 管线同时支持 `.less`）
- **MDX**：文章使用 `.mdx`，通过 `next-mdx-remote` + `remark`/`rehype` 渲染
- 样式与交互尽量与原 Gatsby 项目保持一致

## 目录结构

```
config/            站点与多语言配置（index.js、locales/）
content/blog/      文章源文件，每篇一个目录（index.mdx / index.en.mdx + images/）
context/           LanguageContext（语言上下文）
lib/               文章读取、MDX 编译、TOC、路由数据；lib/map-space/ 地图数据与工具
components/        文章相关组件（Layout、Bio、PostAbbrev、Pagination、Tag…）
templates/         页面模板（BlogIndex、BlogPost、Tags、TagPage）
pages/             Next.js 路由（index.js、[...slug].js、404.js、map-space/）
styles/            Less 样式（global、tricks、catalog、map-space、各组件）+ typography
public/            静态资源与文章图片（/blog/<dir>/images/…、/map-space/、/live2d-*）
scripts/           typography CSS 生成脚本
```

## 路由

| 路径 | 说明 |
| --- | --- |
| `/`、`/2/`、`/3/` | 中文文章列表（每页 5 篇） |
| `/en/`、`/en/2/` | 英文文章列表 |
| `/{dir}/`、`/en/{dir}/` | 文章详情 |
| `/tags/`、`/en/tags/` | 全部标签 |
| `/tags/{tag}/`、`/en/tags/{tag}/` | 标签文章列表 |
| `/map-space/` | Mapbox 地球，标注生活/旅行足迹 |

## 开发

```bash
npm install

# 配置环境变量（map-space 需要 Mapbox 公共 token）
cp .env.example .env.local   # 填入自己的 NEXT_PUBLIC_MAPBOX_TOKEN

npm run dev      # http://localhost:3000
npm run build    # 生产构建（会先生成 typography CSS）
npm start
```

## 已实现的功能

- 文章列表 / 分页 / 文章详情（MDX、代码高亮、目录 TOC、封面）
- 标签页与标签详情、多语言切换、翻译链接
- 上一篇/下一篇、相关文章、阅读时长、面包屑、Bio、SEO
- 明暗主题切换、主题背景设置、极简模式
- 私密文章密码锁、爱情标签爱心动画、Valine 评论（按需加载）
- `map-space` 地球地图：省界高亮、按 zoom 显隐的足迹 marker、彩色气泡弹窗（`lib/map-space/`）
- 左下角看板娘：Live2D 模型（嘉然 / Diana、Ava），由 `/live2d-jaran.js` + `/live2d-lib/pio.js` 提供
- 已从原项目迁移的样式全部转为 Less

## 未迁移（原项目中的非文章功能）

- `image-wall` 页面
- Algolia 搜索（原项目中也已注释禁用）
- Google/Baidu 统计、AMP、离线 Service Worker 等

## 说明

- 文章里的封面图引用的是 `img.picgo.net` 等外链；沙箱/离线环境下无法加载属正常现象。
- `map-space` 依赖 Mapbox 在线样式与瓦片，看板娘依赖 jsDelivr / Cubism 的 CDN 资源，都需要联网；看板娘在宽度 ≤650px 时会自动隐藏（与原项目一致）。
- `map-space` 的 Mapbox token 通过 `NEXT_PUBLIC_MAPBOX_TOKEN` 注入（见 `.env.example`），不再硬编码在源码里；未配置时该页会提示「未配置 NEXT_PUBLIC_MAPBOX_TOKEN」。
- 文章内容通过 MDX 的 `format: 'md'` 编译，因此保留了原 Markdown 中的内联 HTML（如 `resume` 的样式块）与自动链接，渲染效果与原项目一致。

## 部署

推送到 `master` 后会触发 `.github/workflows/deploy.yml`，构建静态站点并发布到
GitHub Pages：<https://icpplus.github.io/space/>。

因为站点是**项目页**（`/<repo>/` 子路径），构建时 `basePath` 为 `/space`（见
`config/index.js` 的 `pathPrefix`）。Next 只会自动改写自己管的路径（`next/link`、
`next/image`、`_next/*`），所以 `<img>`、`background-image`、`geojson`、看板娘脚本等
绝对路径都要经过 `utils/basePath.js` 的 `withBasePath()` 补前缀。

`NEXT_PUBLIC_MAPBOX_TOKEN` **不入库**（GitHub push protection 会拒绝包含该 token 的
提交），需要在仓库里配置一次：

> Settings → Secrets and variables → Actions → 新建 `NEXT_PUBLIC_MAPBOX_TOKEN`

Secret 或 Variable 均可；未配置时 `map-space` 页会提示「未配置 NEXT_PUBLIC_MAPBOX_TOKEN」。

### 部署目标只有一个：GitHub Pages

仓库上曾经挂着 Vercel 集成（项目 `anyscripts-projects/space`，Root Directory 指向
`space/`），把站点发布在 `https://anyspace.cc`。迁移到 GitHub Pages 时该目标已废弃，
原因有两个：

- Vercel 的 Root Directory 指向的 `space/` 目录已不存在；
- 更根本的是 `basePath` 冲突：GitHub Pages **项目页**必须用 `/space`，而自定义域名
  **根路径**必须用 `''`，同一份构建无法同时满足。

所以现在只有 `/space/` 这一份产物。若要重新用 `anyspace.cc`，需要把 `basePath`
改成可由环境变量切换（例如 `NEXT_PUBLIC_BASE_PATH`），并把 `config/index.js` 的
`siteUrl` 一并改回。

### `public/sw.js`（旧 Service Worker 清理）

旧 Gatsby 站用了 `gatsby-plugin-offline`，在 `/space/sw.js` 注册过一个 Service
Worker，它缓存了旧的 app shell。迁移后这些 chunk 都不存在了，老访客会被它挡住看到
白屏，而且因为 `sw.js` 一度 404，连自更新都失败、永远不会自愈。

`public/sw.js` 就是为此保留的“自杀式” Worker：装上后清空所有 cache、注销自己、并
重载受控标签页。等足够长时间让老访客都拿到它之后，这个文件就可以删掉了。
