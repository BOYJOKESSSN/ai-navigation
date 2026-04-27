# AI导航 · 上线部署指南

## 一、Supabase 数据库配置（5分钟）

### 1. 注册 Supabase 账号
访问 https://supabase.com → 免费注册 → 新建项目

### 2. 执行建表 SQL
进入项目 → SQL Editor → 粘贴 `supabase-setup.sql` 中的全部内容 → 点击 Run

### 3. 获取 API 凭证
Settings → API → 复制：
- `Project URL`（即 VITE_SUPABASE_URL）
- `anon public` key（即 VITE_SUPABASE_ANON_KEY）

---

## 二、Vercel 一键部署（3分钟）

### 方式A：直接上传 dist/
```bash
# 本地构建
cd app
npm run build

# 安装 Vercel CLI
npm i -g vercel

# 部署（首次需登录）
vercel --prod ./dist
```

### 方式B：GitHub 自动部署（推荐）
1. 将代码推送到 GitHub 仓库
2. 登录 https://vercel.com → Import Project → 选择仓库
3. Framework Preset 选 **Vite**
4. 添加环境变量（重要！）：
   - `VITE_SUPABASE_URL` = 你的 Supabase Project URL
   - `VITE_SUPABASE_ANON_KEY` = 你的 anon key
5. 点击 Deploy → 约1分钟完成

### 方式C：Cloudflare Pages
1. 登录 Cloudflare → Pages → Create a project
2. 连接 GitHub 仓库
3. Build command: `npm run build`
4. Build output directory: `dist`
5. 添加环境变量（同上）
6. 部署

---

## 三、自定义域名绑定

### Vercel
Settings → Domains → 添加你的域名 → 按提示配置 DNS

### Cloudflare Pages
Custom domains → 添加域名（如果域名在 CF 则自动配置）

---

## 四、Google Search Console（部署后操作）

1. 访问 https://search.google.com/search-console
2. 添加资源 → 网址前缀 → 输入 `https://你的域名`
3. 验证方式推荐：**HTML 标签**（最简单）
   - 复制 meta 标签内容
   - 打开 `app/index.html`，在 `<head>` 内粘贴
   - 重新构建并部署
   - 回到 Search Console 点击"验证"
4. 验证通过后：Sitemaps → 提交 `https://你的域名/sitemap.xml`

---

## 五、百度搜索资源平台（国内收录）

1. 访问 https://ziyuan.baidu.com
2. 添加网站 → 验证（HTML文件方式）
3. 提交 sitemap：链接提交 → sitemap → 填写 `https://你的域名/sitemap.xml`
4. 开启"自动推送"：在 index.html `<body>` 末尾添加百度提供的 JS 代码

---

## 六、后台管理入口

部署后访问：`https://你的域名/admin`

功能：
- 发布/编辑/删除文章
- 上架/编辑/下架工具
- 数据统计看板

---

## 七、SEO 优化清单

- [x] 每页独立 title/description/canonical
- [x] Open Graph + Twitter Card
- [x] Schema.org 结构化数据（WebSite + Article + Product）
- [x] robots.txt（已排除 /admin）
- [x] sitemap.xml（静态版，上线后可改为动态生成）
- [x] 语义化 HTML（h1/h2/h3 层级规范）
- [x] 图片 alt 属性
- [ ] 提交 Google Search Console
- [ ] 提交百度站长平台
- [ ] 配置 Google Analytics（可选）

---

## 八、环境变量汇总

| 变量名 | 说明 | 必填 |
|--------|------|------|
| VITE_SUPABASE_URL | Supabase 项目 URL | 是 |
| VITE_SUPABASE_ANON_KEY | Supabase 公开密钥 | 是 |

不配置时，网站自动使用本地 Mock 数据正常运行。

---

## 九、内容运营建议

1. **工具入库**：后台 → AI工具管理 → 新增工具，填写名称/分类/链接/评分/描述
2. **测评文章**：后台 → 测评文章 → 新建文章，支持 Markdown 格式
3. **sitemap 更新**：每次新增内容后更新 `public/sitemap.xml`（或部署动态 sitemap API）
4. **关键词布局**：文章 title/description 包含目标关键词，正文自然使用

---

*最后更新：2026-04-27*
