import { useParams, Link } from 'react-router-dom';
import { ExternalLink, Star, ArrowLeft, Check, X as XIcon, Tag, Users } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import ToolCard from '@/components/ToolCard';
import BrandLogo from '@/components/BrandLogo';
import { tools, toolCategories } from '@/data';

export default function ToolDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const tool = tools.find(t => t.slug === slug);
  const related = tools.filter(t => t.id !== tool?.id && t.category === tool?.category).slice(0, 3);
  const category = toolCategories.find(c => c.id === tool?.category);

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <div className="text-5xl mb-4">🔍</div>
          <h1 className="text-xl font-semibold text-slate-200 mb-2">工具未找到</h1>
          <Link to="/tools" className="text-indigo-400 hover:underline">返回工具库</Link>
        </div>
      </div>
    );
  }

  const pricingText = { free: '完全免费', freemium: '免费+付费版', paid: '付费订阅' };

  return (
    <>
      <SEOHead
        title={`${tool.name} 详细测评 - 功能、价格、优缺点全解析 - AI导航`}
        description={tool.description}
        keywords={`${tool.name},${tool.tags.join(',')},AI工具测评`}
        canonical={`https://ainavigation.com/tools/${tool.slug}`}
        ogImage={tool.logo}
        type="article"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-6" aria-label="breadcrumb">
          <Link to="/" className="hover:text-slate-300">首页</Link>
          <span>/</span>
          <Link to="/tools" className="hover:text-slate-300">AI工具库</Link>
          <span>/</span>
          {category && <><Link to={`/tools?category=${category.id}`} className="hover:text-slate-300">{category.name}</Link><span>/</span></>}
          <span className="text-slate-300">{tool.name}</span>
        </nav>

        <Link to="/tools" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 mb-8">
          <ArrowLeft size={14} /> 返回工具库
        </Link>

        {/* Header Card */}
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <BrandLogo slug={tool.slug} name={tool.name} size={80} />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-start gap-3 mb-3">
                <h1 className="text-3xl font-bold text-slate-100">{tool.name}</h1>
                <div className="flex gap-2 mt-1">
                  {tool.hot && <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">🔥热门</span>}
                  {tool.new && <span className="text-xs px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-400">NEW</span>}
                </div>
              </div>
              <p className="text-slate-300 mb-4 leading-relaxed">{tool.description}</p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold text-slate-200">{tool.rating}</span>
                  <span className="text-slate-500">({(tool.reviewCount ?? 0).toLocaleString()} 评价)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Tag size={14} />
                  {category?.name}
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Users size={14} />
                  {pricingText[tool.pricing]}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 md:text-right">
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
              >
                <ExternalLink size={16} />
                访问官网
              </a>
              <div className="flex flex-wrap gap-1.5 justify-end">
                {tool.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-400">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Long Description */}
          <div className="md:col-span-2 space-y-6">
            {tool.longDescription && (
              <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-slate-200 mb-3">工具介绍</h2>
                <p className="text-slate-400 leading-relaxed text-sm">{tool.longDescription}</p>
              </div>
            )}

            {/* Pros / Cons */}
            {(tool.pros || tool.cons) && (
              <div className="grid sm:grid-cols-2 gap-4">
                {tool.pros && (
                  <div className="bg-emerald-900/20 border border-emerald-700/30 rounded-xl p-5">
                    <h3 className="font-semibold text-emerald-400 mb-3 text-sm">✅ 优点</h3>
                    <ul className="space-y-2">
                      {tool.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                          <Check size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {tool.cons && (
                  <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-5">
                    <h3 className="font-semibold text-red-400 mb-3 text-sm">❌ 缺点</h3>
                    <ul className="space-y-2">
                      {tool.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                          <XIcon size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="space-y-4">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 text-sm">
              <h3 className="font-semibold text-slate-200 mb-4">基本信息</h3>
              <div className="space-y-3">
                {[
                  { label: '定价方式', value: pricingText[tool.pricing] },
                  { label: '工具分类', value: category?.name || '-' },
                  { label: '评分', value: `${tool.rating} / 5.0` },
                  { label: '评价数', value: (tool.reviewCount ?? 0).toLocaleString() },
                  { label: '收录时间', value: tool.publishedAt },
                ].map(item => (
                  <div key={item.label} className="flex justify-between gap-2">
                    <span className="text-slate-500">{item.label}</span>
                    <span className="text-slate-300 text-right">{item.value}</span>
                  </div>
                ))}
              </div>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block text-center py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
              >
                立即使用 →
              </a>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        {related.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-slate-100 mb-5">相关工具推荐</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map(t => <ToolCard key={t.id} tool={t} />)}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
