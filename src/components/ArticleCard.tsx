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

  // 精选大卡（首页/列表顶部）
  if (featured) {
    return (
      <article className="col-span-full bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden card-hover group">
        <div className="flex flex-col sm:flex-row">
          <Link to={`/reviews/${slug}`} className="sm:w-64 md:w-80 flex-shrink-0 overflow-hidden h-48 sm:h-auto">
            {article.coverImage ? (
              <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-indigo-900/50 to-cyan-900/50 flex items-center justify-center">
                <span className="text-4xl opacity-30">📝</span>
              </div>
            )}
          </Link>
          <div className="p-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center gap-1">
                <Tag size={10} />{article.category}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-medium">精选</span>
            </div>
            <Link to={`/reviews/${slug}`}>
              <h2 className="text-xl font-bold text-slate-100 mb-2 hover:text-indigo-400 transition-colors line-clamp-2">{article.title}</h2>
            </Link>
            <p className="text-sm text-slate-400 line-clamp-2 mb-4">{article.excerpt}</p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1"><Clock size={11} />{article.readTime ?? '5'}分钟阅读</span>
              <span className="flex items-center gap-1"><Eye size={11} />{(article.views ?? 0).toLocaleString()}次浏览</span>
              {article.publishedAt && <span>{new Date(article.publishedAt).toLocaleDateString('zh-CN')}</span>}
            </div>
          </div>
        </div>
      </article>
    );
  }

  // 横向小卡（侧边栏）
  if (horizontal) {
    return (
      <article className="flex gap-4 group">
        <Link to={`/reviews/${slug}`} className="flex-shrink-0 w-24 h-16 md:w-32 md:h-20 rounded-lg overflow-hidden bg-slate-800">
          {article.coverImage ? (
            <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-900/50 to-cyan-900/50" />
          )}
        </Link>
        <div className="flex-1 min-w-0">
          <Link to={`/reviews/${slug}`}>
            <h3 className="font-medium text-slate-200 text-sm line-clamp-2 group-hover:text-indigo-400 transition-colors">{article.title}</h3>
          </Link>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
            <span className="flex items-center gap-1"><Clock size={11} />{article.readTime ?? '5'}分钟</span>
            <span className="flex items-center gap-1"><Eye size={11} />{(article.views ?? 0).toLocaleString()}</span>
          </div>
        </div>
      </article>
    );
  }

  // 默认卡片
  return (
    <article className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden card-hover group">
      <Link to={`/reviews/${slug}`} className="block overflow-hidden h-44">
        {article.coverImage ? (
          <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        ) : (
          <div className="w-full h-44 bg-gradient-to-br from-indigo-900/40 to-cyan-900/40 flex items-center justify-center">
            <span className="text-3xl opacity-30">📝</span>
          </div>
        )}
      </Link>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center gap-1">
            <Tag size={10} />{article.category}
          </span>
        </div>
        <Link to={`/reviews/${slug}`}>
          <h3 className="font-semibold text-slate-100 text-sm leading-snug mb-2 line-clamp-2 hover:text-indigo-400 transition-colors">
            {article.title}
          </h3>
        </Link>
        <p className="text-xs text-slate-400 line-clamp-2 mb-3">{article.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Clock size={11} />{article.readTime ?? '5'}分钟</span>
            <span className="flex items-center gap-1"><Eye size={11} />{(article.views ?? 0).toLocaleString()}</span>
          </div>
          {article.publishedAt && <span>{new Date(article.publishedAt).toLocaleDateString('zh-CN')}</span>}
        </div>
      </div>
    </article>
  );
}
