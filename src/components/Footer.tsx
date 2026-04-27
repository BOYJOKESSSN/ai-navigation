import { Link } from 'react-router-dom';
import { Zap, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 font-bold text-xl mb-5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/10 group-hover:shadow-indigo-500/20 transition-shadow">
                <Zap size={16} className="text-white" />
              </div>
              <span className="gradient-text">AI导航</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              专注 AI 工具测评与导航，帮助你从海量工具中找到最适合的那一款。所有测评均为真实体验，客观公正。
            </p>
            <div className="flex items-center gap-2.5 mt-5">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.1] transition-all text-xs" aria-label="Twitter/X">
                𝕏
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.1] transition-all text-xs" aria-label="GitHub">
                GH
              </a>
              <a href="mailto:hi@ainavigation.com" className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.1] transition-all" aria-label="Email">
                <Mail size={14} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-200 mb-5 text-sm">快速导航</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link to="/tools" className="hover:text-indigo-400 transition-colors">AI工具库</Link></li>
              <li><Link to="/reviews" className="hover:text-indigo-400 transition-colors">干货测评</Link></li>
              <li><Link to="/tools?category=image" className="hover:text-indigo-400 transition-colors">AI绘图工具</Link></li>
              <li><Link to="/tools?category=code" className="hover:text-indigo-400 transition-colors">AI编程工具</Link></li>
              <li><Link to="/tools?category=writing" className="hover:text-indigo-400 transition-colors">AI写作工具</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-200 mb-5 text-sm">关于本站</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link to="/about" className="hover:text-indigo-400 transition-colors">关于我们</Link></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">投稿/合作</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">免责声明</a></li>
              <li><a href="/sitemap.xml" className="hover:text-indigo-400 transition-colors">网站地图</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">© 2024-{new Date().getFullYear()} AI导航 · All Rights Reserved</p>
          <p className="text-slate-700 text-xs">收录 200+ AI工具 · 持续更新中</p>
        </div>
      </div>
    </footer>
  );
}
