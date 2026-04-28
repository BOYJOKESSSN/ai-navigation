import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Zap, Star, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import ToolCard from '../components/ToolCard';
import ArticleCard from '../components/ArticleCard';
import { tools as localTools, articles as localArticles } from '../data';

const CATEGORIES = [
  { id: 'chat', label: 'AI对话', emoji: '💬', desc: 'ChatGPT / Claude / Gemini' },
  { id: 'image', label: 'AI绘图', emoji: '🎨', desc: 'Midjourney / DALL-E / SD' },
  { id: 'code', label: 'AI编程', emoji: '💻', desc: 'Copilot / Cursor / v0' },
  { id: 'writing', label: 'AI写作', emoji: '✍️', desc: 'Notion AI / Jasper / Grammarly' },
  { id: 'video', label: 'AI视频', emoji: '🎬', desc: 'Sora / Runway / Kling' },
  { id: 'audio', label: 'AI音频', emoji: '🎵', desc: 'ElevenLabs / Suno / Descript' },
  { id: 'productivity', label: '效率工具', emoji: '⚡', desc: 'Notion / Perplexity / Gamma' },
  { id: 'community', label: '技术社区', emoji: '🌐', desc: '博客园 / 掘金 / V2EX' },
];

export default function HomePage() {
  const [searchQ, setSearchQ] = useState('');

  const featuredTools = useMemo(() =>
    localTools
      .filter(t => t.featured)
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      .slice(0, 16),
  []);

  const latestArticles = useMemo(() =>
    [...localArticles]
      .sort((a, b) => new Date(b.publishedAt ?? 0).getTime() - new Date(a.publishedAt ?? 0).getTime())
      .slice(0, 3),
  []);

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
      />

      {/* Hero区 */}
      <section className="relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/[0.07] rounded-full blur-[120px]" />
          <div className="absolute top-32 right-1/4 w-64 h-64 bg-cyan-500/[0.05] rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-600/[0.04] rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 text-sm mb-8 animate-fade-in">
            <Sparkles size={14} className="text-indigo-400" />
            持续收录最新 AI 工具
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            找到最适合你的<br />
            <span className="gradient-text">AI 工具</span>
          </h1>

          <p className="text-slate-400 text-lg sm:text-xl mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
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
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 focus:bg-white/[0.06] transition-all text-sm"
              />
            </div>
            <button
              type="submit"
              className="btn-glow px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold whitespace-nowrap text-sm"
            >
              搜索
            </button>
          </form>

          {/* 快捷标签 */}
          <div className="flex flex-wrap justify-center gap-3 mt-6 animate-fade-in" style={{ animationDelay: '0.35s' }}>
            {['ChatGPT', 'Midjourney', 'Claude', 'Cursor', 'Sora', 'Suno'].map(tag => (
              <Link
                key={tag}
                to={`/tools?q=${tag}`}
                className="text-sm text-slate-500 hover:text-indigo-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/[0.03]"
              >
                {tag}
              </Link>
            ))}
          </div>

          {/* 数据展示 */}
          <div className="flex justify-center gap-16 mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {[['200+', 'AI工具收录'], ['50+', '深度测评'], ['8大', '工具分类']].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold gradient-text">{num}</div>
                <div className="text-slate-500 text-sm mt-2">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 分类区 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
            <Zap size={20} className="text-indigo-400" />
            按分类浏览
          </h2>
          <Link to="/tools" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1.5 transition-colors">
            全部工具 <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-4 animate-stagger">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              to={`/tools?category=${cat.id}`}
              className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/30 hover:bg-white/[0.05] transition-all duration-300 text-center"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{cat.emoji}</span>
              <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 精选工具 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
            <Star size={20} className="text-amber-400" />
            精选工具
          </h2>
          <Link to="/tools" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1.5 transition-colors">
            查看全部 <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-stagger">
          {featuredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* 最新测评 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
            <TrendingUp size={20} className="text-cyan-400" />
            最新测评
          </h2>
          <Link to="/reviews" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1.5 transition-colors">
            更多文章 <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-stagger">
          {latestArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* CTA 横幅 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600/[0.08] via-purple-600/[0.06] to-cyan-600/[0.08] border border-white/[0.06] px-8 py-10 sm:px-12 sm:py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">推荐一款好用的 AI 工具？</h3>
            <p className="text-slate-500 text-sm">发现宝藏工具？联系我们收录，帮助更多人发现它</p>
          </div>
          <Link
            to="/about"
            className="btn-glow shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium text-sm"
          >
            联系我们 <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
