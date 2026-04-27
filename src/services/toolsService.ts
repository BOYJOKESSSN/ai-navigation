/**
 * AI工具数据服务
 * - 已配置 Supabase：读取数据库
 * - 未配置 / 离线：自动 fallback 到本地 mock 数据
 */
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { tools as mockTools } from '../data';
import type { Tool } from '../types';

/* ── 查询参数 ── */
export interface ToolsQuery {
  category?: string;
  search?: string;
  pricing?: string;
  sort?: 'rating' | 'newest' | 'popular';
  featured?: boolean;
  hot?: boolean;
  limit?: number;
  offset?: number;
}

/* ── 读取工具列表 ── */
export async function getTools(query: ToolsQuery = {}): Promise<Tool[]> {
  if (!isSupabaseConfigured) return applyLocalFilter(mockTools, query);

  let q = supabase
    .from('tools')
    .select('*')
    .eq('status', 'published');

  if (query.category && query.category !== 'all') q = q.eq('category', query.category);
  if (query.pricing && query.pricing !== 'all')   q = q.eq('pricing', query.pricing);
  if (query.featured)                             q = q.eq('is_featured', true);
  if (query.hot)                                  q = q.eq('is_hot', true);
  if (query.search)                               q = q.ilike('name', `%${query.search}%`);
  if (query.sort === 'rating')   q = q.order('rating', { ascending: false });
  else if (query.sort === 'newest') q = q.order('created_at', { ascending: false });
  else                           q = q.order('sort_order', { ascending: false });
  if (query.limit)  q = q.limit(query.limit);
  if (query.offset) q = q.range(query.offset, query.offset + (query.limit || 20) - 1);

  const { data, error } = await q;
  if (error) { console.error('[getTools]', error); return applyLocalFilter(mockTools, query); }
  return (data || []) as Tool[];
}

/* ── 读取单个工具 ── */
export async function getToolBySlug(slug: string): Promise<Tool | null> {
  if (!isSupabaseConfigured) return mockTools.find(t => t.slug === slug) || null;

  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) return mockTools.find(t => t.slug === slug) || null;
  return data as Tool;
}

/* ── 新增工具（后台使用） ── */
export async function createTool(tool: Omit<Tool, 'id'>): Promise<Tool> {
  const { data, error } = await supabase
    .from('tools')
    .insert({ ...tool, updated_at: new Date().toISOString() })
    .select()
    .single();
  if (error) throw error;
  return data as Tool;
}

/* ── 更新工具（后台使用） ── */
export async function updateTool(id: string, updates: Partial<Tool>): Promise<Tool> {
  const { data, error } = await supabase
    .from('tools')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Tool;
}

/* ── 删除工具（后台使用） ── */
export async function deleteTool(id: string): Promise<void> {
  const { error } = await supabase.from('tools').delete().eq('id', id);
  if (error) throw error;
}

/* ── 获取精选工具（首页用） ── */
export async function getFeaturedTools(limit = 8): Promise<Tool[]> {
  return getTools({ featured: true, sort: 'rating', limit });
}

/* ── 本地 mock 筛选（fallback） ── */
function applyLocalFilter(tools: Tool[], query: ToolsQuery): Tool[] {
  let result = [...tools];
  if (query.category && query.category !== 'all')
    result = result.filter(t => t.category === query.category);
  if (query.pricing && query.pricing !== 'all')
    result = result.filter(t => t.pricing === query.pricing);
  if (query.featured) result = result.filter(t => t.featured);
  if (query.hot)      result = result.filter(t => t.hot);
  if (query.search)   result = result.filter(t => t.name.toLowerCase().includes(query.search!.toLowerCase()));
  if (query.sort === 'rating') result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  if (query.limit) result = result.slice(query.offset || 0, (query.offset || 0) + query.limit);
  return result;
}
