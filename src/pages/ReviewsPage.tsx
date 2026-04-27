import { useState, useEffect } from 'react';
import { Search, Tag, TrendingUp, Calendar } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import ArticleCard from '../components/ArticleCard';
import { getArticles } from '../services/articlesService';
import type { Article } from '../types';

const TAGS = ['全部', 'ChatGPT', 'Midjourney', 'Claude', '效率提升', 'AI绘图', 'AI编程', '深度评测', '入门教程'];

export default function ReviewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('全部');

  useEffect(() => {
    getArticles().then(setArticles).finally(() => setLoading(false));
  }, []);

  const filtered = articles.filter(a => {
    const q = search.toLowerCase();
    const matchSearch = !q || a.title.toLowerCase().includes(q) || a.excerpt?.toLowerCase().includes(q);
    const matchTag = activeTag === '全部' || a.tags?.includes(activeTag);
    return matchSearch && matchTag;
  });

  const featured = filtered.slice(0, 1)[0];
  const rest = filtered.slice(1);

  return (
    <>
      <SEOHead
        title="干货测评 — AI工具深度评测与使用教程 | AI导航"
        description="专业AI工具深度测评、使用技巧、对比分析，帮助你快速找到最适合自己的AI工具。"
        keywords="AI工具测评,ChatGPT使用,Midjourney教程,AI软件对比,人工智能工具推荐"
        canonical="https://ainavigation.com/reviews"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">干货测评</h1>
          <p className="text-slate-400 text-lg">真实体验 · 深度对比 · 实用教程</p>
        </div>

        {/* 搜索 */}
        <div className="relative mb-6">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="搜索测评文章..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* 标签筛选 */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1.5 transition-all ${
                activeTag === tag
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <Tag size={12} />
              {tag}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 rounded-xl bg-slate-800/40 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <Search size={40} className="mx-auto mb-4 opacity-30" />
            <p>没有找到相关文章</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 主内容 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 精选文章大卡 */}
              {featured && (
                <ArticleCard article={featured} featured />
              )}
              {/* 文章列表 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {rest.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>

            {/* 侧边栏 */}
            <aside className="space-y-6">
              {/* 热门文章 */}
              <div className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/30">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <TrendingUp size={16} className="text-indigo-400" />
                  热门文章
                </h3>
                <ul className="space-y-3">
                  {articles.slice(0, 5).map((a, i) => (
                    <li key={a.id} className="flex items-start gap-3">
                      <span className={`mt-0.5 w-5 h-5 rounded text-xs font-bold flex items-center justify-center flex-shrink-0 ${
                        i === 0 ? 'bg-amber-500 text-white' :
                        i === 1 ? 'bg-slate-500 text-white' :
                        i === 2 ? 'bg-orange-700 text-white' :
                        'bg-slate-700 text-slate-400'
                      }`}>{i + 1}</span>
                      <a href={`/article/${a.slug || a.id}`} className="text-sm text-slate-300 hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
                        {a.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 最新动态 */}
              <div className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/30">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Calendar size={16} className="text-cyan-400" />
                  最新发布
                </h3>
                <ul className="space-y-3">
                  {articles.slice(0, 4).map(a => (
                    <li key={a.id} className="text-sm">
                      <a href={`/article/${a.slug || a.id}`} className="text-slate-300 hover:text-indigo-400 transition-colors line-clamp-1">{a.title}</a>
                      <p className="text-slate-600 text-xs mt-0.5">{a.publishedAt ? new Date(a.publishedAt).toLocaleDateString('zh-CN') : ''}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 标签云 */}
              <div className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/30">
                <h3 className="font-semibold text-white mb-4">标签</h3>
                <div className="flex flex-wrap gap-2">
                  {TAGS.filter(t => t !== '全部').map(tag => (
                    <button
                      key={tag}
                      onClick={() => setActiveTag(tag)}
                      className="px-2.5 py-1 rounded-md bg-slate-700/60 text-slate-400 text-xs hover:text-indigo-400 hover:bg-slate-700 transition-colors"
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
