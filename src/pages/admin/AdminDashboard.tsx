import { Link } from 'react-router-dom';
import { tools, articles } from '@/data';
import { Wrench, FileText, Eye, Star, TrendingUp, Plus } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';

export default function AdminDashboard() {
  const totalViews = articles.reduce((sum, a) => sum + (a.views ?? 0), 0);
  const avgRating = (tools.reduce((sum, t) => sum + (t.rating ?? 0), 0) / tools.length).toFixed(1);

  const stats = [
    { label: '收录工具', value: tools.length, icon: Wrench, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { label: '测评文章', value: articles.length, icon: FileText, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { label: '累计阅读', value: (totalViews ?? 0).toLocaleString(), icon: Eye, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: '平均评分', value: avgRating, icon: Star, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">控制台</h1>
          <p className="text-slate-400 text-sm mt-1">欢迎回来，管理员</p>
        </div>
        <div className="flex gap-2">
          <Link to="/admin/tools/new" className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors">
            <Plus size={14} /> 上架工具
          </Link>
          <Link to="/admin/articles/new" className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors">
            <Plus size={14} /> 发布文章
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(stat => (
          <div key={stat.label} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
            <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon size={18} className={stat.color} />
            </div>
            <div className="text-2xl font-bold text-slate-100 mb-1">{stat.value}</div>
            <div className="text-sm text-slate-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Tools */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-200 flex items-center gap-2"><Wrench size={15} /> 最近收录工具</h2>
            <Link to="/admin/tools" className="text-xs text-indigo-400 hover:text-indigo-300">管理全部</Link>
          </div>
          <div className="space-y-3">
            {tools.slice(0, 5).map(tool => (
              <div key={tool.id} className="flex items-center gap-3">
                <BrandLogo slug={tool.slug ?? tool.id} name={tool.name} size={28} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-slate-200 font-medium truncate">{tool.name}</div>
                  <div className="text-xs text-slate-500">{tool.category} · {tool.pricing}</div>
                </div>
                <div className="flex items-center gap-1 text-xs text-yellow-400">
                  <Star size={10} fill="currentColor" /> {tool.rating}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Articles */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-200 flex items-center gap-2"><TrendingUp size={15} /> 热门文章</h2>
            <Link to="/admin/articles" className="text-xs text-indigo-400 hover:text-indigo-300">管理全部</Link>
          </div>
          <div className="space-y-3">
            {articles.slice(0, 5).map(article => (
              <div key={article.id} className="flex items-start gap-3">
                {article.coverImage ? (
                  <img src={article.coverImage} alt={article.title} className="w-12 h-8 rounded object-cover flex-shrink-0" />
                ) : (
                  <div className="w-12 h-8 rounded bg-slate-700 flex items-center justify-center flex-shrink-0 text-xs text-slate-500">📄</div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-slate-200 line-clamp-1">{article.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{article.publishedAt} · {(article.views ?? 0).toLocaleString()} 阅读</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
