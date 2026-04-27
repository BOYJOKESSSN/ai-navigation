import { useParams, Link } from 'react-router-dom';
import { Clock, Eye, ArrowLeft, Tag, Share2 } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import ArticleCard from '@/components/ArticleCard';
import { articles } from '@/data';

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find(a => a.slug === slug);
  const related = articles.filter(a => a.id !== article?.id && a.category === article?.category).slice(0, 3);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <div className="text-5xl mb-4">📭</div>
          <h1 className="text-xl font-semibold text-slate-200 mb-2">文章未找到</h1>
          <Link to="/reviews" className="text-indigo-400 hover:underline">返回测评列表</Link>
        </div>
      </div>
    );
  }

  const shareUrl = `https://ainavigation.com/reviews/${article.slug}`;

  return (
    <>
      <SEOHead
        title={`${article.title} - AI导航`}
        description={article.excerpt}
        keywords={article.tags.join(',')}
        canonical={shareUrl}
        ogImage={article.coverImage}
        type="article"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-6" aria-label="breadcrumb">
          <Link to="/" className="hover:text-slate-300">首页</Link>
          <span>/</span>
          <Link to="/reviews" className="hover:text-slate-300">干货测评</Link>
          <span>/</span>
          <span className="text-slate-400 line-clamp-1">{article.title}</span>
        </nav>

        <Link to="/reviews" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 mb-6">
          <ArrowLeft size={14} /> 返回测评列表
        </Link>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Article */}
          <article className="lg:col-span-3">
            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-400 font-medium flex items-center gap-1">
                  <Tag size={10} />{article.category}
                </span>
                {article.featured && <span className="text-xs px-2.5 py-1 rounded-full bg-yellow-500/20 text-yellow-400">⭐精选</span>}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-100 leading-tight mb-4">{article.title}</h1>
              <p className="text-slate-400 text-base leading-relaxed mb-5">{article.excerpt}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 pb-5 border-b border-slate-700/50">
                <span className="font-medium text-slate-400">✍️ {article.author}</span>
                <span className="flex items-center gap-1"><Clock size={13} />{article.readTime} 分钟阅读</span>
                <span className="flex items-center gap-1"><Eye size={13} />{(article.views ?? 0).toLocaleString()} 次阅读</span>
                <span>发布于 {article.publishedAt}</span>
                {article.updatedAt !== article.publishedAt && <span>更新于 {article.updatedAt}</span>}
              </div>
            </header>

            {/* Cover Image */}
            <div className="rounded-xl overflow-hidden mb-8 h-56 md:h-72">
              <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
            </div>

            {/* Content */}
            <div className="prose-custom space-y-5 text-slate-300">
              {/* Demo article content since no CMS backend */}
              <p className="leading-relaxed">
                本文是一篇深度测评文章。我们团队花费大量时间对相关AI工具进行了全面、客观的测试，以下是我们的测评结果与使用建议。
              </p>
              <h2 className="text-xl font-bold text-slate-100 mt-8 mb-3">测评概述</h2>
              <p className="leading-relaxed">{article.excerpt}</p>
              <h2 className="text-xl font-bold text-slate-100 mt-8 mb-3">核心功能分析</h2>
              <p className="leading-relaxed">
                在实际使用过程中，我们重点测试了以下几个方面：核心功能的完整性与稳定性、用户界面的易用程度、输出质量与准确率、价格定位与性价比，以及与同类竞品的差异化优势。
              </p>
              <h2 className="text-xl font-bold text-slate-100 mt-8 mb-3">使用建议</h2>
              <p className="leading-relaxed">
                综合以上测试结果，我们认为该工具在 <strong className="text-slate-200">{article.tags.slice(0, 2).join('、')}</strong> 等场景下表现尤为突出，适合对应需求的用户使用。如果你正在寻找此类工具，本测评可以作为重要参考。
              </p>
              <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-xl p-5 mt-8">
                <p className="font-medium text-indigo-300 mb-1">📌 测评结论</p>
                <p className="text-sm text-slate-300">{article.excerpt}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-slate-700/50">
              {article.tags.map(tag => (
                <Link key={tag} to={`/reviews?q=${tag}`} className="text-xs px-3 py-1.5 rounded-full bg-slate-700 text-slate-400 hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors">
                  #{tag}
                </Link>
              ))}
            </div>

            {/* Share */}
            <div className="flex items-center gap-3 mt-6">
              <span className="text-sm text-slate-400">分享本文：</span>
              <button
                onClick={() => navigator.clipboard?.writeText(shareUrl)}
                className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600"
              >
                <Share2 size={13} /> 复制链接
              </button>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50 sticky top-20">
              <h3 className="font-semibold text-slate-200 mb-4 text-sm">目录</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="hover:text-indigo-400 cursor-pointer">· 测评概述</li>
                <li className="hover:text-indigo-400 cursor-pointer">· 核心功能分析</li>
                <li className="hover:text-indigo-400 cursor-pointer">· 使用建议</li>
                <li className="hover:text-indigo-400 cursor-pointer">· 测评结论</li>
              </ul>
            </div>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl font-bold text-slate-100 mb-5">相关测评</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map(a => <ArticleCard key={a.id} article={a} />)}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
