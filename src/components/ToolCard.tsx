import { Link } from 'react-router-dom';
import type { Tool } from '@/types';
import { ExternalLink, Star } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
}

const pricingLabel: Record<Tool['pricing'], { label: string; class: string }> = {
  free: { label: '免费', class: 'bg-emerald-500/20 text-emerald-400' },
  freemium: { label: '免费+付费', class: 'bg-blue-500/20 text-blue-400' },
  paid: { label: '付费', class: 'bg-orange-500/20 text-orange-400' },
};

export default function ToolCard({ tool }: ToolCardProps) {
  const pricing = pricingLabel[tool.pricing];

  return (
    <article className="relative group bg-slate-800/60 border border-slate-700/50 rounded-xl p-5 card-hover flex flex-col gap-3">
      {/* Badges */}
      <div className="flex items-center gap-2 absolute top-4 right-4">
        {tool.hot && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-400">🔥热门</span>}
        {tool.new && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400">NEW</span>}
      </div>

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center overflow-hidden flex-shrink-0">
          <img
            src={tool.logo}
            alt={tool.name}
            className="w-8 h-8 object-contain"
            onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${tool.name}&background=6366f1&color=fff&size=40`; }}
          />
        </div>
        <div>
          <h3 className="font-semibold text-slate-100 text-sm">{tool.name}</h3>
          <div className="flex items-center gap-1 mt-0.5">
            <Star size={11} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs text-slate-400">{tool.rating} ({tool.reviewCount.toLocaleString()})</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{tool.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${pricing.class}`}>
          {pricing.label}
        </span>
        {tool.tags.slice(0, 3).map(tag => (
          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-400">
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 mt-auto pt-2">
        <Link
          to={`/tools/${tool.slug}`}
          className="flex-1 text-center text-xs font-medium py-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors"
        >
          查看详情
        </Link>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-medium py-1.5 px-3 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
          aria-label={`访问 ${tool.name} 官网`}
        >
          <ExternalLink size={12} />
          访问
        </a>
      </div>
    </article>
  );
}
