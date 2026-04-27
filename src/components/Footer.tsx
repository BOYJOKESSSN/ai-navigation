import { Link } from 'react-router-dom';
import { Mail, ArrowUpRight, Heart, Sparkles } from 'lucide-react';

const QUICK_LINKS = [
  { label: 'AI工具库', to: '/tools' },
  { label: '干货测评', to: '/reviews' },
  { label: 'AI绘图', to: '/tools?category=image' },
  { label: 'AI编程', to: '/tools?category=code' },
  { label: 'AI写作', to: '/tools?category=writing' },
  { label: 'AI视频', to: '/tools?category=video' },
];

const ABOUT_LINKS = [
  { label: '关于我们', to: '/about' },
  { label: '投稿合作', to: '/about' },
  { label: '免责声明', to: '/about' },
  { label: '网站地图', to: '/sitemap.xml' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04]">
      {/* 上层 - 品牌区 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-8">
          {/* 品牌介绍 */}
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-2.5 font-bold text-xl mb-4 group">
              <img src="/logo.svg" alt="AI导航" className="w-9 h-9 rounded-xl shadow-lg shadow-indigo-500/10 group-hover:shadow-indigo-500/20 transition-shadow" />
              <span className="gradient-text">AI导航</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-6">
              专注 AI 工具测评与导航，收录 200+ 精选工具，所有评分均来自真实体验，帮你从海量工具中找到最适合的那一款。
            </p>
            {/* 社交链接 */}
            <div className="flex items-center gap-2">
              <a href="https://github.com/BOYJOKESSSN/ai-navigation" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-slate-600 hover:text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-500/20 transition-all" aria-label="GitHub" title="GitHub">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a href="https://www.cnblogs.com/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-slate-600 hover:text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-500/20 transition-all text-xs font-bold" aria-label="cnblogs" title="博客园">
                博
              </a>
              <a href="mailto:hi@ainavigation.com" className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-slate-600 hover:text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-500/20 transition-all" aria-label="Email" title="邮箱">
                <Mail size={13} />
              </a>
            </div>
          </div>

          {/* 快速导航 */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">快速导航</h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="group inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-200 transition-colors">
                    {link.label}
                    <ArrowUpRight size={11} className="opacity-0 -translate-y-px group-hover:opacity-40 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 关于 */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">关于</h3>
            <ul className="space-y-2.5">
              {ABOUT_LINKS.map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="group inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-200 transition-colors">
                    {link.label}
                    <ArrowUpRight size={11} className="opacity-0 -translate-y-px group-hover:opacity-40 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 订阅/推荐 */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">推荐工具</h3>
            <p className="text-slate-600 text-xs leading-relaxed mb-4">发现好用的 AI 工具？<br />欢迎联系我们收录</p>
            <Link
              to="/about"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              联系我们 <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* 底部版权条 */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-slate-700 text-xs flex items-center gap-1">
            © 2024-{new Date().getFullYear()} AI导航
            <span className="text-slate-800">·</span>
            All Rights Reserved
          </p>
          <p className="text-slate-700 text-xs flex items-center gap-1">
            <Sparkles size={10} className="text-indigo-500/40" />
            收录 200+ AI 工具
            <span className="text-slate-800">·</span>
            用
            <Heart size={10} className="text-pink-500/40 inline mx-0.5" />
            打造
          </p>
        </div>
      </div>
    </footer>
  );
}
