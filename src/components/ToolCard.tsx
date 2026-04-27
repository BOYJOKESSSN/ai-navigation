import { Link } from 'react-router-dom';
import type { Tool } from '@/types';
import { ExternalLink, Star } from 'lucide-react';
import BrandLogo from './BrandLogo';

interface ToolCardProps {
  tool: Tool;
}

const pricingLabel: Record<Tool['pricing'], { label: string; class: string }> = {
  free: { label: '免费', class: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' },
  freemium: { label: '免费+付费', class: 'bg-blue-500/10 text-blue-400 border border-blue-500/20' },
  paid: { label: '付费', class: 'bg-amber-500/10 text-amber-400 border border-amber-500/20' },
};

export default function ToolCard({ tool }: ToolCardProps) {
  const pricing = pricingLabel[tool.pricing];

  return (
    <article className="relative group bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 card-hover flex flex-col gap-3.5">
      {/* Badges */}
      <div className="flex items-center gap-2 absolute top-4 right-4">
        {tool.hot && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-red-500/10 text-red-400 border border-red-500/20">🔥热门</span>}
        {tool.new && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">NEW</span>}
      </div>

      {/* Header */}
      <div className="flex items-center gap-3">
        <BrandLogo slug={tool.slug} name={tool.name} size={42} />
        <div>
          <h3 className="font-semibold text-slate-100 text-sm">{tool.name}</h3>
          <div className="flex items-center gap-1 mt-1">
            <Star size={11} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs text-slate-500">{tool.rating}</span>
            <span className="text-xs text-slate-600">({(tool.reviewCount ?? 0).toLocaleString()})</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{tool.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${pricing.class}`}>
          {pricing.label}
        </span>
        {tool.tags.slice(0, 2).map(tag => (
          <span key={tag} className="tag-pill text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-500 border border-white/[0.06] cursor-default">
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 mt-auto pt-2">
        <Link
          to={`/tools/${tool.slug}`}
          className="flex-1 text-center text-xs font-medium py-2 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border border-indigo-500/20 hover:border-indigo-500/30 transition-all"
        >
          查看详情
        </Link>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-medium py-2 px-3 rounded-lg bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06] transition-all"
          aria-label={`访问 ${tool.name} 官网`}
        >
          <ExternalLink size={11} />
          访问
        </a>
      </div>
    </article>
  );
}
