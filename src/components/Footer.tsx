import { Link } from 'react-router-dom';
import { Zap, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-700/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="gradient-text">AI导航</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              专注 AI 工具测评与导航，帮助你从海量工具中找到最适合的那一款。所有测评均为真实体验，客观公正。
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors text-xs font-medium" aria-label="Twitter/X">
                𝕏
              </a>
              <a href="#" className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors text-xs font-medium" aria-label="GitHub">
                GitHub
              </a>
              <a href="mailto:hi@ainavigation.com" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors" aria-label="Email">
                <Mail size={16} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-200 mb-4 text-sm">快速导航</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/tools" className="hover:text-indigo-400 transition-colors">AI工具库</Link></li>
              <li><Link to="/reviews" className="hover:text-indigo-400 transition-colors">干货测评</Link></li>
              <li><Link to="/tools?category=image" className="hover:text-indigo-400 transition-colors">AI绘图工具</Link></li>
              <li><Link to="/tools?category=code" className="hover:text-indigo-400 transition-colors">AI编程工具</Link></li>
              <li><Link to="/tools?category=writing" className="hover:text-indigo-400 transition-colors">AI写作工具</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-200 mb-4 text-sm">关于本站</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/about" className="hover:text-indigo-400 transition-colors">关于我们</Link></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">投稿/合作</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">免责声明</a></li>
              <li><a href="/sitemap.xml" className="hover:text-indigo-400 transition-colors">网站地图</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700/50 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© 2025 AI导航 · 版权所有</p>
          <p className="text-slate-600 text-xs">收录 200+ AI工具 · 持续更新中</p>
        </div>
      </div>
    </footer>
  );
}
