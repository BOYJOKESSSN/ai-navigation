import { Link } from 'react-router-dom';
import type { Article } from '@/types';
import { Clock, Eye, Tag } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  horizontal?: boolean;
  featured?: boolean;
}

export default function ArticleCard({ article, horizontal = false, featured = false }: ArticleCardProps) {
  const slug = article.slug || article.id;

  // 精选大卡（列表顶部）
  if (featured) {
    return (
      <article className="col-span-full bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden group card-hover">
        <div className="flex flex-col sm:flex-row items-stretch">
          <Link to={`/reviews/${slug}`} className="sm:w-72 md:w-80 flex-shrink-0 overflow-hidden h-48 sm:h-auto relative">
            {article.coverImage ? (
              <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-indigo-600/[0.08] to-cyan-600/[0.08]" />
            )}
          </Link>
          <div className="p-6 flex flex-col justify-center flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-indigo-500/15 text-indigo-400 flex items-center gap-1.5">
                <Tag size={10} />{article.category}
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-400 font-medium">精选</span>
            </div>
            <Link to={`/reviews/${slug}`}>
              <h2 className="text-lg md:text-xl font-bold text-slate-100 mb-3 group-hover:text-indigo-400 transition-colors line-clamp-2">{article.title}</h2>
            </Link>
            <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">{article.excerpt}</p>
            <div className="flex items-center gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1.5"><Clock size={12} />{article.readTime ?? '5'} 分钟</span>
              <span className="flex items-center gap-1.5"><Eye size={12} />{(article.views ?? 0).toLocaleString()}</span>
              {article.publishedAt && <span>{new Date(article.publishedAt).toLocaleDateString('zh-CN')}</span>}
            </div>
          </div>
        </div>
      </article>
    );
  }

  // 横向小卡
  if (horizontal) {
    return (
      <article className="flex gap-4 group">
        <Link to={`/reviews/${slug}`} className="flex-shrink-0 w-24 h-16 md:w-32 md:h-20 rounded-xl overflow-hidden">
          {article.coverImage ? (
            <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-600/[0.08] to-cyan-600/[0.08]" />
          )}
        </Link>
        <div className="flex-1 min-w-0">
          <Link to={`/reviews/${slug}`}>
            <h3 className="font-medium text-slate-300 text-sm line-clamp-2 group-hover:text-indigo-400 transition-colors">{article.title}</h3>
          </Link>
          <div className="flex items-center gap-3 mt-2 text-xs text-slate-600">
            <span className="flex items-center gap-1.5"><Clock size={11} />{article.readTime ?? '5'}分钟</span>
            <span className="flex items-center gap-1.5"><Eye size={11} />{(article.views ?? 0).toLocaleString()}</span>
          </div>
        </div>
      </article>
    );
  }

  // 默认卡片
  return (
    <article className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden group card-hover">
      <Link to={`/reviews/${slug}`} className="block overflow-hidden h-48 relative">
        {article.coverImage ? (
          <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-600/[0.08] to-cyan-600/[0.08]" />
        )}
      </Link>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-indigo-500/15 text-indigo-400 flex items-center gap-1.5">
            <Tag size={10} />{article.category}
          </span>
        </div>
        <Link to={`/reviews/${slug}`}>
          <h3 className="font-semibold text-slate-100 text-base leading-snug mb-3 line-clamp-2 group-hover:text-indigo-400 transition-colors">
            {article.title}
          </h3>
        </Link>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">{article.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><Clock size={12} />{article.readTime ?? '5'}分钟</span>
            <span className="flex items-center gap-1.5"><Eye size={12} />{(article.views ?? 0).toLocaleString()}</span>
          </div>
          {article.publishedAt && <span>{new Date(article.publishedAt).toLocaleDateString('zh-CN')}</span>}
        </div>
      </div>
    </article>
  );
}
