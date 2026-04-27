import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Eye } from 'lucide-react';

const categories = ['工具测评', '深度对比', '横向对比', '实战指南', '模型测评', '选购指南'];

export default function ArticleForm() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [preview, setPreview] = useState(false);
  const [form, setForm] = useState({
    title: '', slug: '', excerpt: '', content: '',
    category: categories[0], tags: '', author: '',
    coverImage: '', readTime: '5', featured: false,
  });

  const update = (key: string, value: string | boolean) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => navigate('/admin/articles'), 1500);
  };

  const inputClass = "w-full px-3 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500";
  const labelClass = "block text-sm font-medium text-slate-300 mb-1.5";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-800"><ArrowLeft size={16} /></button>
          <h1 className="text-xl font-bold text-slate-100">发布新文章</h1>
        </div>
        <button type="button" onClick={() => setPreview(!preview)} className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600">
          <Eye size={14} />{preview ? '编辑模式' : '预览'}
        </button>
      </div>

      {saved && (
        <div className="mb-5 px-4 py-3 rounded-lg bg-emerald-900/40 border border-emerald-700/50 text-emerald-400 text-sm">
          ✅ 文章已成功发布！正在跳转...
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 space-y-4">
              <div>
                <label className={labelClass}>文章标题 *</label>
                <input required value={form.title} onChange={e => update('title', e.target.value)}
                  className={inputClass} placeholder="输入文章标题（建议含关键词，50字以内）" />
              </div>
              <div>
                <label className={labelClass}>文章摘要 *</label>
                <textarea required rows={3} value={form.excerpt} onChange={e => update('excerpt', e.target.value)}
                  className={inputClass} placeholder="文章摘要，用于SEO描述和列表展示（100-200字）" />
              </div>
              <div>
                <label className={labelClass}>正文内容 *</label>
                <textarea required rows={16} value={form.content} onChange={e => update('content', e.target.value)}
                  className={`${inputClass} font-mono text-xs leading-relaxed resize-y`}
                  placeholder="在这里写文章正文...&#10;&#10;支持 Markdown 格式：&#10;# 一级标题&#10;## 二级标题&#10;**粗体** *斜体*&#10;- 列表项&#10;> 引用" />
                <p className="text-xs text-slate-500 mt-1">支持 Markdown 格式，{form.content.length} 字符</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 space-y-4">
              <h3 className="font-semibold text-slate-200 text-sm">文章设置</h3>
              <div>
                <label className={labelClass}>URL Slug *</label>
                <input required value={form.slug} onChange={e => update('slug', e.target.value)}
                  className={inputClass} placeholder="article-slug" />
              </div>
              <div>
                <label className={labelClass}>文章分类</label>
                <select value={form.category} onChange={e => update('category', e.target.value)} className={inputClass}>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>作者</label>
                <input value={form.author} onChange={e => update('author', e.target.value)} className={inputClass} placeholder="作者名" />
              </div>
              <div>
                <label className={labelClass}>标签（逗号分隔）</label>
                <input value={form.tags} onChange={e => update('tags', e.target.value)}
                  className={inputClass} placeholder="AI写作, 测评, ChatGPT" />
              </div>
              <div>
                <label className={labelClass}>预计阅读时间（分钟）</label>
                <input type="number" min="1" value={form.readTime} onChange={e => update('readTime', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>封面图 URL</label>
                <input value={form.coverImage} onChange={e => update('coverImage', e.target.value)}
                  className={inputClass} placeholder="https://..." />
                {form.coverImage && <img src={form.coverImage} alt="预览" className="mt-2 w-full h-28 object-cover rounded-lg" />}
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={e => update('featured', e.target.checked)}
                  className="w-4 h-4 rounded accent-indigo-500" />
                <span className="text-sm text-slate-300">设为精选文章</span>
              </label>
            </div>

            <div className="flex flex-col gap-2">
              <button type="submit" className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors">
                <Save size={15} /> 发布文章
              </button>
              <button type="button" className="py-2.5 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 text-sm">
                保存草稿
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
