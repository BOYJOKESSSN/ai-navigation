import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { LayoutDashboard, Wrench, FileText, Plus, ArrowLeft, Menu, X } from 'lucide-react';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: '控制台', exact: true },
  { to: '/admin/tools', icon: Wrench, label: '工具管理' },
  { to: '/admin/tools/new', icon: Plus, label: '上架工具' },
  { to: '/admin/articles', icon: FileText, label: '文章管理' },
  { to: '/admin/articles/new', icon: Plus, label: '发布文章' },
];

export default function AdminLayout() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-950">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-56 bg-slate-900 border-r border-slate-700/50 flex flex-col transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:block`}>
        <div className="p-5 border-b border-slate-700/50 flex items-center justify-between">
          <Link to="/" className="text-sm font-bold text-indigo-400">AI导航后台</Link>
          <button className="md:hidden text-slate-400" onClick={() => setOpen(false)}><X size={16} /></button>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => {
            const active = item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to) && item.to !== '/admin';
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <item.icon size={15} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-700/50">
          <Link to="/" className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300">
            <ArrowLeft size={12} /> 返回前台
          </Link>
        </div>
      </aside>

      {/* Overlay */}
      {open && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-slate-900/80 border-b border-slate-700/50 flex items-center px-4 gap-3 md:hidden">
          <button onClick={() => setOpen(true)} className="text-slate-400"><Menu size={18} /></button>
          <span className="text-sm font-medium text-slate-200">后台管理</span>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
