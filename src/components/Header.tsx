import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: '首页' },
  { href: '/tools', label: 'AI工具库' },
  { href: '/reviews', label: '干货测评' },
  { href: '/about', label: '关于我们' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06]" style={{ background: 'rgba(10, 14, 26, 0.75)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 font-bold text-xl group">
            <img src="/logo.svg" alt="AI导航" className="w-9 h-9 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow" />
            <span className="gradient-text">AI导航</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.href
                    ? 'text-indigo-400 bg-indigo-500/10'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              className="btn-glow ml-3 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/20"
            >
              后台管理
            </Link>
          </nav>

          {/* Mobile Menu */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.04] transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden border-t border-white/[0.06]" style={{ background: 'rgba(10, 14, 26, 0.95)', backdropFilter: 'blur(20px)' }}>
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`block px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  location.pathname === link.href
                    ? 'text-indigo-400 bg-indigo-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              className="block px-4 py-2.5 rounded-lg text-sm text-center bg-gradient-to-r from-indigo-600 to-indigo-500 text-white mt-2 shadow-lg shadow-indigo-500/20"
              onClick={() => setOpen(false)}
            >
              后台管理
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
