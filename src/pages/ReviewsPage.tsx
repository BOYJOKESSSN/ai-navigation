import { useState, useMemo } from 'react';
import { Search, Tag, TrendingUp, Calendar, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import ArticleCard from '../components/ArticleCard';
import { articles as localArticles } from '../data';
import type { Article } from '../types';

const TAGS = ['全部', '工具测评', '深度对比', '实战指南', '模型测评', '选购指南', 'AI编程', 'AI绘图', 'AI写作', 'AI变现', 'ChatGPT', 'Claude', 'GPT-4o'];

export default function ReviewsPage() {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('全部');

  const filtered = useMemo(() => {
    let result = [...localArticles];
    const q = search.toLowerCase();
    if (q) result = result.filter(a => a.title.toLowerCase().includes(q) || a.excerpt?.toLowerCase().includes(q));
    if (activeTag !== '全部') result = result.filter(a => a.tags?.includes(activeTag) || a.category === activeTag);
    return result;
  }, [search, activeTag]);

  const allSorted = useMemo(() =>
    [...localArticles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()),
  []);

  const popular = useMemo(() =>
    [...localArticles].sort((a, b) => (b.views ?? 0) - (a.views ?? 0)).slice(0, 5),
  []);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <SEOHead
        title="干货测评 — AI工具深度评测与使用教程 | AI导航"
        description="专业AI工具深度测评、使用技巧、对比分析，帮助你快速找到最适合自己的AI工具。"
        keywords="AI工具测评,ChatGPT使用,Midjourney教程,AI软件对比,人工智能工具推荐"
        canonical="https://ainavigation.com/reviews"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* 标题 */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-slate-400 text-xs mb-4">
            <Sparkles size={12} className="text-indigo-400" />
            专业测评团队出品
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">干货测评</h1>
          <p className="text-slate-400 text-base">真实体验 · 深度对比 · 实用教程</p>
        </div>

        {/* 搜索 + 标签 */}
        <div className="relative mb-5">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            placeholder="搜索测评文章..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all text-sm"
          />
        </div>

        <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
          {TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex items-center gap-1.5 transition-all ${
                activeTag === tag
                  ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                  : 'bg-white/[0.03] text-slate-500 hover:text-white hover:bg-white/[0.06] border border-white/[0.04]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <Search size={40} className="mx-auto mb-4 opacity-30" />
            <p className="text-sm">没有找到相关文章</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 主内容 */}
            <div className="lg:col-span-2 space-y-6">
              {featured && <ArticleCard article={featured} featured />}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {rest.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>

            {/* 侧边栏 */}
            <aside className="space-y-5">
              {/* 热门文章 */}
              <div className="bg-white/[0.02] rounded-xl p-5 border border-white/[0.06]">
                <h3 className="font-semibold text-slate-200 text-sm mb-4 flex items-center gap-2">
                  <TrendingUp size={14} className="text-indigo-400" />
                  热门文章
                </h3>
                <ul className="space-y-3">
                  {popular.map((a, i) => (
                    <li key={a.id} className="flex items-start gap-3">
                      <span className={`mt-0.5 w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center flex-shrink-0 ${
                        i === 0 ? 'bg-amber-500/20 text-amber-400' :
                        i === 1 ? 'bg-slate-500/20 text-slate-400' :
                        i === 2 ? 'bg-orange-500/15 text-orange-400' :
                        'bg-white/[0.04] text-slate-600'
                      }`}>{i + 1}</span>
                      <Link to={`/reviews/${a.slug || a.id}`} className="text-sm text-slate-400 hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
                        {a.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 最新发布 */}
              <div className="bg-white/[0.02] rounded-xl p-5 border border-white/[0.06]">
                <h3 className="font-semibold text-slate-200 text-sm mb-4 flex items-center gap-2">
                  <Calendar size={14} className="text-cyan-400" />
                  最新发布
                </h3>
                <ul className="space-y-3">
                  {allSorted.slice(0, 4).map(a => (
                    <li key={a.id} className="text-sm">
                      <Link to={`/reviews/${a.slug || a.id}`} className="text-slate-400 hover:text-indigo-400 transition-colors line-clamp-1">{a.title}</Link>
                      <p className="text-slate-700 text-xs mt-0.5">{a.publishedAt ? new Date(a.publishedAt).toLocaleDateString('zh-CN') : ''}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 标签云 */}
              <div className="bg-white/[0.02] rounded-xl p-5 border border-white/[0.06]">
                <h3 className="font-semibold text-slate-200 text-sm mb-4">标签</h3>
                <div className="flex flex-wrap gap-2">
                  {TAGS.filter(t => t !== '全部').map(tag => (
                    <button
                      key={tag}
                      onClick={() => setActiveTag(tag)}
                      className={`px-2.5 py-1 rounded-md text-xs transition-colors ${
                        activeTag === tag
                          ? 'bg-indigo-500/20 text-indigo-400'
                          : 'bg-white/[0.03] text-slate-600 hover:text-indigo-400 hover:bg-white/[0.05]'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
    </>
  );
}
