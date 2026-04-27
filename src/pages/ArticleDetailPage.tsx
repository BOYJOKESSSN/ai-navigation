import { useParams, Link } from 'react-router-dom';
import { Clock, Eye, ArrowLeft, Tag, Share2, Sparkles } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import ArticleCard from '@/components/ArticleCard';
import { articles } from '@/data';

/** 简易 Markdown 渲染：支持标题、粗体、行内代码、表格、列表、引用、分割线 */
function MarkdownContent({ md }: { md: string }) {
  const lines = md.split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  const renderInline = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**'))
        return <strong key={idx} className="text-slate-100 font-semibold">{part.slice(2, -2)}</strong>;
      if (part.startsWith('`') && part.endsWith('`'))
        return <code key={idx} className="px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 text-xs font-mono">{part.slice(1, -1)}</code>;
      if (part.startsWith('*') && part.endsWith('*'))
        return <em key={idx} className="text-indigo-300">{part.slice(1, -1)}</em>;
      return <span key={idx}>{part}</span>;
    });
  };

  while (i < lines.length) {
    const line = lines[i];

    // 空行
    if (line.trim() === '') { i++; continue; }

    // 分割线
    if (line.trim() === '---') {
      blocks.push(<hr key={key++} className="border-white/[0.06] my-6" />);
      i++; continue;
    }

    // 标题 h2/h3/h4
    const headingMatch = line.match(/^(#{2,4})\s+(.+)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      const cls = level === 2 ? 'text-xl md:text-2xl' : level === 3 ? 'text-lg' : 'text-base';
      blocks.push(
        <h2 key={key++} className={`${cls} font-bold text-slate-100 mt-10 mb-4 pb-3 border-b border-white/[0.04]`}>
          {renderInline(text)}
        </h2>
      );
      i++; continue;
    }

    // 引用
    if (line.trim().startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].replace(/^>\s*/, ''));
        i++;
      }
      blocks.push(
        <blockquote key={key++} className="border-l-[3px] border-indigo-500 pl-4 py-3 mb-6 bg-indigo-500/[0.04] rounded-r-lg pr-4">
          {quoteLines.map((ql, qi) => (
            <p key={qi} className="text-slate-300 leading-relaxed text-sm">{renderInline(ql)}</p>
          ))}
        </blockquote>
      );
      continue;
    }

    // 表格
    if (line.includes('|') && line.trim().startsWith('|')) {
      const tableRows: string[][] = [];
      while (i < lines.length && lines[i].includes('|') && lines[i].trim().startsWith('|')) {
        if (lines[i].match(/^\|[\s-|]+\|$/)) { i++; continue; }
        const cells = lines[i].split('|').filter(c => c.trim() !== '').map(c => c.trim());
        tableRows.push(cells);
        i++;
      }
      if (tableRows.length > 0) {
        blocks.push(
          <div key={key++} className="overflow-x-auto mb-6 rounded-lg border border-white/[0.06]">
            <table className="w-full text-sm">
              {tableRows[0] && (
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {tableRows[0].map((cell, ci) => (
                      <th key={ci} className="px-4 py-3 text-left font-semibold text-slate-200 bg-white/[0.02]">{renderInline(cell)}</th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {tableRows.slice(1).map((row, ri) => (
                  <tr key={ri} className="border-b border-white/[0.04] last:border-0">
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-4 py-2.5 text-slate-400">{renderInline(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // 无序列表
    if (line.match(/^\s*[-*]\s+/)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\s*[-*]\s+/)) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ''));
        i++;
      }
      blocks.push(
        <ul key={key++} className="list-disc pl-6 space-y-1.5 mb-5 text-slate-300 text-sm">
          {items.map((item, ii) => <li key={ii} className="leading-relaxed">{renderInline(item)}</li>)}
        </ul>
      );
      continue;
    }

    // 有序列表
    if (line.match(/^\s*\d+\.\s+/)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\s*\d+\.\s+/)) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ''));
        i++;
      }
      blocks.push(
        <ol key={key++} className="list-decimal pl-6 space-y-1.5 mb-5 text-slate-300 text-sm">
          {items.map((item, ii) => <li key={ii} className="leading-relaxed">{renderInline(item)}</li>)}
        </ol>
      );
      continue;
    }

    // 普通段落
    blocks.push(
      <p key={key++} className="text-slate-300 leading-relaxed mb-4 text-[15px]">{renderInline(line)}</p>
    );
    i++;
  }

  return <>{blocks}</>;
}

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
          <span className="text-slate-700">/</span>
          <Link to="/reviews" className="hover:text-slate-300">干货测评</Link>
          <span className="text-slate-700">/</span>
          <span className="text-slate-400 line-clamp-1">{article.title}</span>
        </nav>

        <Link to="/reviews" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 mb-6 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> 返回测评列表
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-400 font-medium flex items-center gap-1">
              <Tag size={10} />{article.category}
            </span>
            {article.featured && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 font-medium flex items-center gap-1">
                <Sparkles size={10} />精选
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-100 leading-tight mb-4">{article.title}</h1>
          <p className="text-slate-400 text-base leading-relaxed mb-5">{article.excerpt}</p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500 pb-5 border-b border-white/[0.06]">
            <span className="font-medium text-slate-300">{article.author}</span>
            <span className="flex items-center gap-1"><Clock size={13} />{article.readTime} 分钟阅读</span>
            <span className="flex items-center gap-1"><Eye size={13} />{(article.views ?? 0).toLocaleString()} 次阅读</span>
            <span>{article.publishedAt}</span>
          </div>
        </header>

        {/* Cover Image */}
        {article.coverImage && (
          <div className="rounded-xl overflow-hidden mb-8 border border-white/[0.06]">
            <img src={article.coverImage} alt={article.title} className="w-full object-cover" />
          </div>
        )}

        {/* Article Content */}
        <article className="mb-10">
          {article.content ? (
            <MarkdownContent md={article.content} />
          ) : (
            <p className="text-slate-500">暂无正文内容</p>
          )}
        </article>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-white/[0.06]">
          {article.tags.map(tag => (
            <Link key={tag} to={`/reviews?q=${tag}`} className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] text-slate-500 hover:bg-indigo-500/15 hover:text-indigo-400 transition-colors border border-white/[0.04]">
              #{tag}
            </Link>
          ))}
        </div>

        {/* Share */}
        <div className="flex items-center gap-3 mt-6">
          <span className="text-sm text-slate-400">分享本文：</span>
          <button
            onClick={() => navigator.clipboard?.writeText(shareUrl)}
            className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] border border-white/[0.06] transition-colors"
          >
            <Share2 size={13} /> 复制链接
          </button>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mt-14 pt-8 border-t border-white/[0.06]">
            <h2 className="text-xl font-bold text-slate-100 mb-5 flex items-center gap-2">
              <Sparkles size={18} className="text-indigo-400" />相关测评
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map(a => <ArticleCard key={a.id} article={a} />)}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
