import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import type { Tool } from '@/types';
import { toolCategories } from '@/data';

type FormData = Omit<Tool, 'id' | 'rating' | 'reviewCount' | 'publishedAt'> & {
  rating: string;
  reviewCount: string;
};

const defaultForm: FormData = {
  name: '', slug: '', description: '', longDescription: '',
  category: 'chat', tags: [], logo: '', url: '',
  pricing: 'freemium', rating: '4.5', reviewCount: '0',
  featured: false, hot: false, isNew: true,
  pros: [], cons: [],
};

export default function ToolForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>(defaultForm);
  const [tagInput, setTagInput] = useState('');
  const [saved, setSaved] = useState(false);

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: POST to API. For demo, show success.
    setSaved(true);
    setTimeout(() => navigate('/admin/tools'), 1500);
  };

  const addTag = () => {
    if (tagInput.trim() && !(form.tags ?? []).includes(tagInput.trim())) {
      update('tags', [...(form.tags ?? []), tagInput.trim()]);
      setTagInput('');
    }
  };

  const inputClass = "w-full px-3 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500";
  const labelClass = "block text-sm font-medium text-slate-300 mb-1.5";

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-800">
          <ArrowLeft size={16} />
        </button>
        <h1 className="text-xl font-bold text-slate-100">上架新工具</h1>
      </div>

      {saved && (
        <div className="mb-5 px-4 py-3 rounded-lg bg-emerald-900/40 border border-emerald-700/50 text-emerald-400 text-sm">
          ✅ 工具已成功保存！正在跳转...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
          <h2 className="font-semibold text-slate-200 mb-4 text-sm">基本信息</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>工具名称 *</label>
              <input required value={form.name} onChange={e => update('name', e.target.value)} className={inputClass} placeholder="如：ChatGPT" />
            </div>
            <div>
              <label className={labelClass}>URL Slug *</label>
              <input required value={form.slug} onChange={e => update('slug', e.target.value)} className={inputClass} placeholder="如：chatgpt" />
            </div>
            <div>
              <label className={labelClass}>Logo URL</label>
              <input value={form.logo} onChange={e => update('logo', e.target.value)} className={inputClass} placeholder="https://..." />
            </div>
            <div>
              <label className={labelClass}>官网地址 *</label>
              <input required value={form.url} onChange={e => update('url', e.target.value)} className={inputClass} placeholder="https://..." />
            </div>
            <div>
              <label className={labelClass}>分类</label>
              <select value={form.category} onChange={e => update('category', e.target.value)} className={inputClass}>
                {toolCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>定价方式</label>
              <select value={form.pricing} onChange={e => update('pricing', e.target.value as Tool['pricing'])} className={inputClass}>
                <option value="free">免费</option>
                <option value="freemium">免费+付费</option>
                <option value="paid">付费订阅</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>评分 (1-5)</label>
              <input type="number" min="1" max="5" step="0.1" value={form.rating} onChange={e => update('rating', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>评价数</label>
              <input type="number" min="0" value={form.reviewCount} onChange={e => update('reviewCount', e.target.value)} className={inputClass} />
            </div>
          </div>

          <div className="mt-4">
            <label className={labelClass}>简短描述 *</label>
            <textarea required rows={2} value={form.description} onChange={e => update('description', e.target.value)} className={inputClass} placeholder="一句话介绍工具核心功能（50-100字）" />
          </div>

          <div className="mt-4">
            <label className={labelClass}>详细介绍</label>
            <textarea rows={4} value={form.longDescription} onChange={e => update('longDescription', e.target.value)} className={inputClass} placeholder="详细描述工具的功能、适用场景等（200字以上）" />
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
          <h2 className="font-semibold text-slate-200 mb-4 text-sm">标签与状态</h2>
          <div className="mb-4">
            <label className={labelClass}>标签</label>
            <div className="flex gap-2 mb-2">
              <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                className={`${inputClass} flex-1`} placeholder="输入标签按Enter添加" />
              <button type="button" onClick={addTag} className="px-4 py-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 text-sm">添加</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(form.tags ?? []).map(tag => (
                <span key={tag} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-400">
                  {tag}
                  <button type="button" onClick={() => update('tags', (form.tags ?? []).filter(t => t !== tag))} className="hover:text-red-400">×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-5">
            {([
              { key: 'featured', label: '设为精选' },
              { key: 'hot', label: '标记热门' },
              { key: 'isNew', label: '标记新上架' },
            ] as const).map(opt => (
              <label key={opt.key} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form[opt.key as keyof FormData] as boolean} onChange={e => update(opt.key as keyof FormData, e.target.checked)}
                  className="w-4 h-4 rounded accent-indigo-500" />
                <span className="text-sm text-slate-300">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors">
            <Save size={15} /> 保存并上架
          </button>
          <button type="button" onClick={() => navigate(-1)} className="px-6 py-2.5 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 text-sm">
            取消
          </button>
        </div>
      </form>
    </div>
  );
}
