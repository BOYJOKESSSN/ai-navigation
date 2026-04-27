import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Zap, Star, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import ToolCard from '../components/ToolCard';
import ArticleCard from '../components/ArticleCard';
import { getFeaturedTools } from '../services/toolsService';
import { getArticles } from '../services/articlesService';
import type { Tool, Article } from '../types';

const CATEGORIES = [
  { id: 'chat', label: 'AI对话', emoji: '💬', desc: 'ChatGPT / Claude / Gemini' },
  { id: 'image', label: 'AI绘图', emoji: '🎨', desc: 'Midjourney / DALL-E / SD' },
  { id: 'code', label: 'AI编程', emoji: '💻', desc: 'Copilot / Cursor / v0' },
  { id: 'writing', label: 'AI写作', emoji: '✍️', desc: 'Notion AI / Jasper / Grammarly' },
  { id: 'video', label: 'AI视频', emoji: '🎬', desc: 'Sora / Runway / Kling' },
  { id: 'audio', label: 'AI音频', emoji: '🎵', desc: 'ElevenLabs / Suno / Descript' },
  { id: 'productivity', label: '效率工具', emoji: '⚡', desc: 'Notion / Perplexity / Gamma' },
  { id: 'seo', label: 'SEO/营销', emoji: '📈', desc: 'Jasper / Copy.ai / Surfer' },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AI导航',
  url: 'https://ainavigation.com',
  description: '专注AI工具测评与导航，帮助你从海量工具中找到最适合的那一款',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: 'https://ainavigation.com/tools?q={search_term_string}' },
    'query-input': 'required name=search_term_string',
  },
};

export default function HomePage() {
  const [featuredTools, setFeaturedTools] = useState<Tool[]>([]);
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQ, setSearchQ] = useState('');

  useEffect(() => {
    Promise.all([getFeaturedTools(8), getArticles({ limit: 3 })])
      .then(([tools, articles]) => {
        setFeaturedTools(tools);
        setLatestArticles(articles);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQ.trim()) window.location.href = `/tools?q=${encodeURIComponent(searchQ.trim())}`;
  };

  return (
    <>
      <SEOHead
        title="AI导航 — 最权威的AI工具聚合与深度测评平台"
        description="收录200+精选AI工具，提供ChatGPT、Midjourney、Claude等主流AI工具的深度测评、使用教程与横向对比，持续更新。"
        keywords="AI工具导航,AI工具测评,ChatGPT,Midjourney,Claude,AI软件推荐,人工智能工具"
        canonical="https://ainavigation.com"
        schema={SCHEMA}
      />

      {/* Hero区 */}
      <section className="relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/[0.07] rounded-full blur-[120px]" />
          <div className="absolute top-32 right-1/4 w-64 h-64 bg-cyan-500/[0.05] rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-600/[0.04] rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 text-sm mb-8 animate-fade-in">
            <Sparkles size={14} className="text-indigo-400" />
            持续收录最新 AI 工具
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            找到最适合你的<br />
            <span className="gradient-text">AI 工具</span>
          </h1>

          <p className="text-slate-400 text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            收录 200+ 精选 AI 工具，所有评分均来自真实体验，帮你少走弯路
          </p>

          {/* 搜索框 */}
          <form onSubmit={handleSearch} className="flex items-center gap-3 max-w-xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="search"
                placeholder="搜索 ChatGPT、Midjourney、Cursor..."
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 focus:bg-white/[0.06] transition-all text-sm"
              />
            </div>
            <button
              type="submit"
              className="btn-glow px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold whitespace-nowrap text-sm"
            >
              搜索
            </button>
          </form>

          {/* 快捷标签 */}
          <div className="flex flex-wrap justify-center gap-3 mt-5 animate-fade-in" style={{ animationDelay: '0.35s' }}>
            {['ChatGPT', 'Midjourney', 'Claude', 'Cursor', 'Sora', 'Suno'].map(tag => (
              <Link
                key={tag}
                to={`/tools?q=${tag}`}
                className="text-xs text-slate-500 hover:text-indigo-400 transition-colors px-2 py-1 rounded-md hover:bg-white/[0.03]"
              >
                {tag}
              </Link>
            ))}
          </div>

          {/* 数据展示 */}
          <div className="flex justify-center gap-12 mt-14 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {[['200+', 'AI工具收录'], ['50+', '深度测评'], ['8大', '工具分类']].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold gradient-text">{num}</div>
                <div className="text-slate-500 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 分类区 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Zap size={18} className="text-indigo-400" />
            按分类浏览
          </h2>
          <Link to="/tools" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1 transition-colors">
            全部工具 <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 animate-stagger">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              to={`/tools?category=${cat.id}`}
              className="group flex flex-col items-center gap-2.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/30 hover:bg-white/[0.05] transition-all duration-300 text-center"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{cat.emoji}</span>
              <span className="text-xs font-medium text-slate-400 group-hover:text-white transition-colors">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 精选工具 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Star size={18} className="text-amber-400" />
            精选工具
          </h2>
          <Link to="/tools" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1 transition-colors">
            查看全部 <ArrowRight size={14} />
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-52 rounded-xl bg-white/[0.02] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 animate-stagger">
            {featuredTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </section>

      {/* 最新测评 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp size={18} className="text-cyan-400" />
            最新测评
          </h2>
          <Link to="/reviews" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1 transition-colors">
            更多文章 <ArrowRight size={14} />
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-56 rounded-xl bg-white/[0.02] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-stagger">
            {latestArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block p-px rounded-2xl bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-cyan-500/50">
            <div className="bg-[#0a0e1a] rounded-2xl px-10 py-10">
              <h3 className="text-xl font-bold text-white mb-3">想推荐一款AI工具？</h3>
              <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">如果你发现了好用的AI工具，欢迎投稿或联系我们收录</p>
              <Link
                to="/about"
                className="btn-glow inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-medium text-sm"
              >
                联系我们 <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
