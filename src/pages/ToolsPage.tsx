import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import ToolCard from '../components/ToolCard';
import { tools as localTools } from '../data';
import type { Tool } from '../types';

const CATEGORIES = [
  { id: 'all', label: '全部' },
  { id: 'chat', label: 'AI对话' },
  { id: 'image', label: 'AI绘图' },
  { id: 'code', label: 'AI编程' },
  { id: 'writing', label: 'AI写作' },
  { id: 'video', label: 'AI视频' },
  { id: 'audio', label: 'AI音频' },
  { id: 'productivity', label: '效率工具' },
  { id: 'community', label: '技术社区' },
];

const PRICE_FILTERS = [
  { id: 'all', label: '全部价格' },
  { id: 'free', label: '免费' },
  { id: 'freemium', label: '免费+付费' },
  { id: 'paid', label: '付费' },
];

const SORT_OPTIONS = [
  { id: 'rating', label: '评分最高' },
  { id: 'newest', label: '最新上架' },
  { id: 'popular', label: '最受欢迎' },
];

export default function ToolsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...localTools];

    // 按分类筛选
    if (category !== 'all') {
      result = result.filter(t => t.category === category);
    }

    // 按价格筛选
    if (priceFilter !== 'all') {
      result = result.filter(t => t.pricing === priceFilter);
    }

    // 搜索
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags?.some(tag => tag.toLowerCase().includes(q))
      );
    }

    // 排序
    if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    } else if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.publishedAt ?? 0).getTime() - new Date(a.publishedAt ?? 0).getTime());
    } else if (sortBy === 'popular') {
      result.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
    }

    return result;
  }, [category, priceFilter, search, sortBy]);

  return (
    <>
      <SEOHead
        title="AI工具库 — 200+精选AI工具导航 | AI导航"
        description="收录200+精选AI工具，涵盖AI对话、AI绘图、AI编程、AI写作、AI视频等全品类，持续更新评分与测评。"
        keywords="AI工具,AI导航,人工智能工具,AI软件推荐,ChatGPT,Midjourney,AI绘图"
        canonical="https://ainavigation.com/tools"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 页面头 */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">AI 工具库</h1>
          <p className="text-slate-400 text-lg">精选 200+ AI 工具，所有评分来自真实体验</p>
        </div>

        {/* 搜索栏 */}
        <div className="relative mb-6">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="搜索工具名称、功能、标签..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* 分类Tab */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                category === cat.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`ml-auto px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1.5 transition-all ${
              showFilters ? 'bg-slate-700 text-white' : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            <SlidersHorizontal size={14} />
            筛选
          </button>
        </div>

        {/* 展开筛选 */}
        {showFilters && (
          <div className="mb-6 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 flex flex-wrap gap-6">
            <div>
              <p className="text-xs text-slate-500 mb-2 flex items-center gap-1"><Filter size={12} />价格</p>
              <div className="flex gap-2">
                {PRICE_FILTERS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setPriceFilter(p.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      priceFilter === p.id ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-2">排序</p>
              <div className="flex gap-2">
                {SORT_OPTIONS.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSortBy(s.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      sortBy === s.id ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 结果计数 */}
        <p className="text-slate-500 text-sm mb-6">共找到 <span className="text-indigo-400 font-medium">{filtered.length}</span> 个工具</p>

        {/* 工具列表 */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <Search size={40} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg">没有找到相关工具</p>
            <p className="text-sm mt-1">试试换个关键词？</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
