import { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Edit2, Trash2, Eye, Star, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getArticles, deleteArticle } from '../../services/articlesService';
import { isSupabaseConfigured } from '../../lib/supabase';
import type { Article } from '../../types';

export default function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const loadArticles = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getArticles({});
      setArticles(data);
    } catch {
      showToast('加载失败', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadArticles(); }, [loadArticles]);

  function showToast(msg: string, type: 'success' | 'error' = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleDelete(article: Article) {
    if (!confirm(`确定删除「${article.title}」？此操作不可撤销。`)) return;
    if (!isSupabaseConfigured) { showToast('请先配置 Supabase', 'error'); return; }
    try {
      await deleteArticle(article.id);
      setArticles(prev => prev.filter(a => a.id !== article.id));
      showToast(`已删除「${article.title}」`);
    } catch {
      showToast('删除失败', 'error');
    }
  }

  const categoryLabels: Record<string, string> = {
    review: '深度测评', comparison: '横向对比', tutorial: '使用教程', news: '行业资讯', guide: '选购指南',
  };

  const filtered = articles.filter(a => {
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || a.category === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-lg
          ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.msg}
        </div>
      )}

      {!isSupabaseConfigured && (
        <div className="bg-amber-900/30 border border-amber-600/40 rounded-xl p-4 text-sm text-amber-300">
          ⚠️ 当前使用本地 mock 数据，写操作需先配置 Supabase。
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">文章管理</h1>
          <p className="text-slate-400 text-sm mt-1">共 {articles.length} 篇文章</p>
        </div>
        <div className="flex gap-2">
          <button onClick={loadArticles} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
            <RefreshCw size={16} />
          </button>
          <Link to="/admin/articles/new"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-colors">
            <Plus size={16} /> 写文章
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input type="text" placeholder="搜索文章标题…"
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-indigo-500" />
        </div>
        <div className="flex gap-2">
          {['all','review','comparison','tutorial','news'].map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors
                ${filter === cat ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
              {cat === 'all' ? '全部' : categoryLabels[cat] || cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-500">加载中…</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <p>暂无文章</p>
          <Link to="/admin/articles/new" className="mt-3 inline-block text-indigo-400 text-sm hover:underline">发布第一篇文章 →</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(article => (
            <div key={article.id}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 flex items-start justify-between gap-4 hover:border-slate-600/50 transition-colors">
              <div className="flex gap-4 flex-1 min-w-0">
                {article.coverImage && (
                  <img src={article.coverImage} alt={article.title}
                    className="w-20 h-14 rounded-lg object-cover flex-shrink-0 hidden sm:block" />
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-medium text-sm line-clamp-1">{article.title}</h3>
                    {article.featured && <Star size={12} className="text-amber-400 fill-amber-400 flex-shrink-0" />}
                  </div>
                  <p className="text-slate-500 text-xs mt-1 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                    <span className="px-2 py-0.5 bg-slate-700 rounded-md">
                      {categoryLabels[article.category ?? ''] || article.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={11} /> {article.views ?? 0}
                    </span>
                    <span>{article.readTime ?? 0} 分钟</span>
                    <span>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('zh-CN') : ''}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link to={`/reviews/${article.slug}`} target="_blank"
                  className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-500 hover:text-slate-300 transition-colors">
                  <Eye size={14} />
                </Link>
                <Link to={`/admin/articles/${article.id}`}
                  className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-500 hover:text-indigo-400 transition-colors">
                  <Edit2 size={14} />
                </Link>
                <button onClick={() => handleDelete(article)}
                  className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-500 hover:text-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
