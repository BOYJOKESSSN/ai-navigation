-- ============================================================
-- AI导航网站 · Supabase 建表脚本
-- 使用方法：登录 https://supabase.com → SQL Editor → 粘贴执行
-- ============================================================

-- ① 工具分类表
CREATE TABLE IF NOT EXISTS public.categories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT,
  icon        TEXT,
  tool_count  INT  NOT NULL DEFAULT 0,
  sort_order  INT  NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ② AI工具表
CREATE TABLE IF NOT EXISTS public.tools (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name             TEXT NOT NULL,
  slug             TEXT NOT NULL UNIQUE,
  description      TEXT NOT NULL,
  full_description TEXT,
  logo             TEXT,
  website          TEXT NOT NULL,
  category         TEXT NOT NULL,
  tags             TEXT[]  NOT NULL DEFAULT '{}',
  rating           NUMERIC(3,1) NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  review_count     INT  NOT NULL DEFAULT 0,
  pricing          TEXT NOT NULL DEFAULT 'freemium' CHECK (pricing IN ('free','freemium','paid')),
  price_detail     TEXT,
  pros             TEXT[] NOT NULL DEFAULT '{}',
  cons             TEXT[] NOT NULL DEFAULT '{}',
  features         TEXT[] NOT NULL DEFAULT '{}',
  status           TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published','draft','archived')),
  is_featured      BOOLEAN NOT NULL DEFAULT false,
  is_hot           BOOLEAN NOT NULL DEFAULT false,
  sort_order       INT  NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ③ 测评文章表
CREATE TABLE IF NOT EXISTS public.articles (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  slug         TEXT NOT NULL UNIQUE,
  excerpt      TEXT NOT NULL,
  content      TEXT NOT NULL DEFAULT '',
  cover_image  TEXT,
  author       TEXT NOT NULL DEFAULT '编辑部',
  category     TEXT NOT NULL DEFAULT 'review',
  tags         TEXT[] NOT NULL DEFAULT '{}',
  read_time    INT  NOT NULL DEFAULT 5,
  view_count   INT  NOT NULL DEFAULT 0,
  like_count   INT  NOT NULL DEFAULT 0,
  status       TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published','draft')),
  is_featured  BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ④ 自动更新 updated_at 的触发器
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS tools_updated_at ON public.tools;
CREATE TRIGGER tools_updated_at
  BEFORE UPDATE ON public.tools
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS articles_updated_at ON public.articles;
CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ⑤ 行级安全策略（RLS）：前台只读，管理后台通过 service_role 写入
ALTER TABLE public.tools     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- 公开读取已发布的数据
CREATE POLICY "public read tools"
  ON public.tools FOR SELECT USING (status = 'published');
CREATE POLICY "public read articles"
  ON public.articles FOR SELECT USING (status = 'published');
CREATE POLICY "public read categories"
  ON public.categories FOR SELECT USING (true);

-- 后台管理：需要通过 service_role key 写入（在 Supabase Dashboard 的 API 设置中获取）
-- 本站后台管理页面使用 service_role key，永远不要暴露到前端公共 Bundle 中
-- 推荐做法：将写操作封装为 Supabase Edge Function 或自建轻量 API

-- ⑥ 预置分类数据
INSERT INTO public.categories (name, slug, description, icon, sort_order) VALUES
  ('文本写作', 'writing',    'AI写作、内容生成、文案助手',   '✍️', 1),
  ('图像生成', 'image',      'AI绘图、图片生成、设计工具',   '🎨', 2),
  ('代码编程', 'code',       'AI编程助手、代码补全、调试',   '💻', 3),
  ('视频创作', 'video',      'AI视频生成、剪辑、配音',       '🎬', 4),
  ('音频语音', 'audio',      'AI配音、音乐生成、语音克隆',   '🎵', 5),
  ('对话助手', 'chat',       'AI聊天、知识问答、多模态',     '💬', 6),
  ('效率提升', 'productivity','AI办公、自动化、总结摘要',    '⚡', 7),
  ('数据分析', 'data',       'AI数据分析、可视化、报告',     '📊', 8)
ON CONFLICT (slug) DO NOTHING;

-- ⑦ 预置示例工具数据（可删除，仅供参考）
INSERT INTO public.tools (name, slug, description, website, category, tags, rating, review_count, pricing, is_featured, is_hot) VALUES
  ('ChatGPT',  'chatgpt',  'OpenAI 旗下最强对话 AI，支持多模态、代码、写作、分析等全场景',
   'https://chat.openai.com',  'chat',  ARRAY['对话','GPT-4','OpenAI','多模态'], 4.8, 12580, 'freemium', true, true),
  ('Midjourney','midjourney','专业级 AI 图像生成工具，以艺术风格细腻著称，设计师首选',
   'https://midjourney.com',   'image', ARRAY['绘图','艺术','设计','Discord'],   4.7, 8920,  'paid',     true, true),
  ('GitHub Copilot','github-copilot','GitHub 官方 AI 编程助手，实时代码补全，支持 VS Code、JetBrains 等主流 IDE',
   'https://github.com/features/copilot','code', ARRAY['编程','代码补全','VS Code'], 4.6, 6540, 'paid', true, false),
  ('Notion AI', 'notion-ai','内嵌在 Notion 中的 AI 写作助手，一键总结、续写、翻译',
   'https://notion.so',        'writing',ARRAY['写作','笔记','总结','翻译'],     4.4, 3210,  'freemium', false, false),
  ('Suno AI',   'suno-ai',  '一句话生成完整歌曲，支持多种风格，音乐创作零门槛',
   'https://suno.com',         'audio', ARRAY['音乐','生成','创作'],             4.5, 2890,  'freemium', true, true),
  ('Runway',    'runway',   '专业 AI 视频生成与编辑平台，Gen-3 模型效果惊艳',
   'https://runwayml.com',     'video', ARRAY['视频','生成','编辑'],             4.5, 4120,  'freemium', true, false)
ON CONFLICT (slug) DO NOTHING;

-- ⑧ 预置示例文章（可删除）
INSERT INTO public.articles (title, slug, excerpt, content, author, category, tags, read_time, is_featured) VALUES
  ('2025年最值得用的10个AI写作工具深度横评',
   '2025-best-ai-writing-tools',
   '我们花了30天真实测试市面上主流AI写作工具，从质量、速度、价格三个维度全面评测，帮你找到最适合的那一款。',
   '## 前言\n\n本文将从实际使用角度，对10款主流AI写作工具进行深度横向评测...\n\n（正文内容）',
   '测评组', 'review', ARRAY['AI写作','横评','工具推荐'], 12, true),
  ('ChatGPT vs Claude vs Gemini：2025最新实测对比',
   'chatgpt-vs-claude-vs-gemini-2025',
   '三大AI模型同题PK：代码、写作、逻辑推理、中文理解，到底谁更强？',
   '## 测试方法\n\n我们设计了20道不同类型的题目...\n\n（正文内容）',
   '测评组', 'comparison', ARRAY['ChatGPT','Claude','Gemini','横评'], 15, true)
ON CONFLICT (slug) DO NOTHING;

-- 完成！
SELECT 'Supabase 建表成功 🎉' AS message;
