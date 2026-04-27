import { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Edit2, Trash2, Star, Flame, ExternalLink, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getTools, deleteTool } from '../../services/toolsService';
import { isSupabaseConfigured } from '../../lib/supabase';
import type { Tool } from '../../types';

export default function AdminTools() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const loadTools = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getTools({ status: undefined } as any);
      setTools(data);
    } catch (e) {
      showToast('加载失败，请刷新重试', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadTools(); }, [loadTools]);

  function showToast(msg: string, type: 'success' | 'error' = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleDelete(tool: Tool) {
    if (!confirm(`确定删除「${tool.name}」？此操作不可撤销。`)) return;
    if (!isSupabaseConfigured) { showToast('请先配置 Supabase 后再操作', 'error'); return; }
    try {
      await deleteTool(tool.id);
      setTools(prev => prev.filter(t => t.id !== tool.id));
      showToast(`已删除「${tool.name}」`);
    } catch {
      showToast('删除失败', 'error');
    }
  }

  const filtered = tools.filter(t => {
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || t.category === filter;
    return matchSearch && matchFilter;
  });

  const categories = ['all', ...Array.from(new Set(tools.map(t => t.category)))];
  const pricingBadge: Record<string, string> = { free: 'bg-green-900/50 text-green-400', freemium: 'bg-blue-900/50 text-blue-400', paid: 'bg-amber-900/50 text-amber-400' };
  const pricingLabel: Record<string, string> = { free: '免费', freemium: '免费增值', paid: '付费' };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-lg transition-all
          ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.msg}
        </div>
      )}

      {/* Supabase 未配置提示 */}
      {!isSupabaseConfigured && (
        <div className="bg-amber-900/30 border border-amber-600/40 rounded-xl p-4 text-sm text-amber-300">
          ⚠️ 当前使用本地 mock 数据，写操作（删除/编辑）需先配置 Supabase 环境变量。
          查看 <code className="bg-amber-900/50 px-1 rounded">.env.example</code> 获取配置说明。
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">工具管理</h1>
          <p className="text-slate-400 text-sm mt-1">共 {tools.length} 个工具</p>
        </div>
        <div className="flex gap-2">
          <button onClick={loadTools} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
            <RefreshCw size={16} />
          </button>
          <Link to="/admin/tools/new"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-colors">
            <Plus size={16} /> 上架工具
          </Link>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text" placeholder="搜索工具名称…"
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.slice(0, 6).map(cat => (
            <button key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors
                ${filter === cat ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
              {cat === 'all' ? '全部' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* 工具列表 */}
      {loading ? (
        <div className="text-center py-20 text-slate-500">加载中…</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <p>暂无工具</p>
          <Link to="/admin/tools/new" className="mt-3 inline-block text-indigo-400 text-sm hover:underline">上架第一个工具 →</Link>
        </div>
      ) : (
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/50 text-slate-400">
                <th className="text-left p-4 font-medium">工具</th>
                <th className="text-left p-4 font-medium hidden md:table-cell">分类</th>
                <th className="text-left p-4 font-medium hidden lg:table-cell">定价</th>
                <th className="text-left p-4 font-medium hidden lg:table-cell">评分</th>
                <th className="text-left p-4 font-medium">状态</th>
                <th className="text-right p-4 font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tool, i) => (
                <tr key={tool.id}
                  className={`border-b border-slate-700/30 hover:bg-slate-700/30 transition-colors ${i === filtered.length - 1 ? 'border-0' : ''}`}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-700 flex items-center justify-center text-base flex-shrink-0">
                        {tool.logo ? <img src={tool.logo} alt={tool.name} className="w-7 h-7 rounded-lg object-cover" /> : '🤖'}
                      </div>
                      <div>
                        <div className="font-medium flex items-center gap-1.5">
                          {tool.name}
                          {tool.isFeatured && <Star size={12} className="text-amber-400 fill-amber-400" />}
                          {tool.isHot && <Flame size={12} className="text-orange-400" />}
                        </div>
                        <div className="text-slate-500 text-xs truncate max-w-[200px]">{tool.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span className="px-2 py-0.5 bg-slate-700 rounded-md text-xs">{tool.category}</span>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <span className={`px-2 py-0.5 rounded-md text-xs ${pricingBadge[tool.pricing] || ''}`}>
                      {pricingLabel[tool.pricing] || tool.pricing}
                    </span>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <span className="text-amber-400 font-medium">★ {tool.rating}</span>
                    <span className="text-slate-500 text-xs ml-1">({tool.reviewCount})</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                      tool.status === 'published' ? 'bg-green-900/50 text-green-400' :
                      tool.status === 'draft'     ? 'bg-slate-700 text-slate-400' :
                      'bg-red-900/50 text-red-400'}`}>
                      {tool.status === 'published' ? '已发布' : tool.status === 'draft' ? '草稿' : '已下架'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <a href={tool.website} target="_blank" rel="noopener noreferrer"
                        className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-500 hover:text-slate-300 transition-colors">
                        <ExternalLink size={14} />
                      </a>
                      <Link to={`/admin/tools/${tool.id}`}
                        className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-500 hover:text-indigo-400 transition-colors">
                        <Edit2 size={14} />
                      </Link>
                      <button onClick={() => handleDelete(tool)}
                        className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-500 hover:text-red-400 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
