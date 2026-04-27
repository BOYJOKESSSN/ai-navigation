/**
 * 测评文章数据服务
 */
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { articles as mockArticles } from '../data';
import type { Article } from '../types';

export interface ArticlesQuery {
  category?: string;
  tag?: string;
  search?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
}

/* ── 读取文章列表 ── */
export async function getArticles(query: ArticlesQuery = {}): Promise<Article[]> {
  if (!isSupabaseConfigured) return applyLocalFilter(mockArticles, query);

  let q = supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (query.category && query.category !== 'all') q = q.eq('category', query.category);
  if (query.featured)                             q = q.eq('is_featured', true);
  if (query.search)                               q = q.ilike('title', `%${query.search}%`);
  if (query.tag)                                  q = q.contains('tags', [query.tag]);
  if (query.limit)  q = q.limit(query.limit);
  if (query.offset) q = q.range(query.offset, query.offset + (query.limit || 20) - 1);

  const { data, error } = await q;
  if (error) { console.error('[getArticles]', error); return applyLocalFilter(mockArticles, query); }
  return (data || []).map(mapArticle);
}

/* ── 读取单篇文章 ── */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!isSupabaseConfigured) return mockArticles.find(a => a.slug === slug) || null;

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) return mockArticles.find(a => a.slug === slug) || null;

  // 增加浏览量
  supabase
    .from('articles')
    .update({ view_count: (data.view_count || 0) + 1 })
    .eq('id', data.id)
    .then(() => {});

  return mapArticle(data);
}

/* ── 新增文章（后台使用） ── */
export async function createArticle(article: Omit<Article, 'id'>): Promise<Article> {
  const { data, error } = await supabase
    .from('articles')
    .insert(reverseMapArticle(article))
    .select()
    .single();
  if (error) throw error;
  return mapArticle(data);
}

/* ── 更新文章（后台使用） ── */
export async function updateArticle(id: string, updates: Partial<Article>): Promise<Article> {
  const { data, error } = await supabase
    .from('articles')
    .update(reverseMapArticle(updates as Article))
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return mapArticle(data);
}

/* ── 删除文章（后台使用） ── */
export async function deleteArticle(id: string): Promise<void> {
  const { error } = await supabase.from('articles').delete().eq('id', id);
  if (error) throw error;
}

/* ── 字段映射（数据库 snake_case → 前端 camelCase） ── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapArticle(row: any): Article {
  return {
    id:          row.id,
    title:       row.title,
    slug:        row.slug,
    excerpt:     row.excerpt,
    content:     row.content,
    coverImage:  row.cover_image,
    author:      row.author,
    category:    row.category,
    tags:        row.tags || [],
    readTime:    row.read_time,
    viewCount:   row.view_count,
    likeCount:   row.like_count,
    isFeatured:  row.is_featured,
    publishedAt: row.published_at || row.created_at,
    createdAt:   row.created_at,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function reverseMapArticle(article: Partial<Article>): any {
  const result: Record<string, unknown> = {};
  if (article.title !== undefined)       result.title        = article.title;
  if (article.slug !== undefined)        result.slug         = article.slug;
  if (article.excerpt !== undefined)     result.excerpt      = article.excerpt;
  if (article.content !== undefined)     result.content      = article.content;
  if (article.coverImage !== undefined)  result.cover_image  = article.coverImage;
  if (article.author !== undefined)      result.author       = article.author;
  if (article.category !== undefined)    result.category     = article.category;
  if (article.tags !== undefined)        result.tags         = article.tags;
  if (article.readTime !== undefined)    result.read_time    = article.readTime;
  if (article.isFeatured !== undefined)  result.is_featured  = article.isFeatured;
  return result;
}

function applyLocalFilter(articles: Article[], query: ArticlesQuery): Article[] {
  let result = [...articles];
  if (query.category && query.category !== 'all')
    result = result.filter(a => a.category === query.category);
  if (query.featured) result = result.filter(a => a.isFeatured);
  if (query.search)   result = result.filter(a => a.title.toLowerCase().includes(query.search!.toLowerCase()));
  if (query.tag)      result = result.filter(a => a.tags.includes(query.tag!));
  if (query.limit)    result = result.slice(query.offset || 0, (query.offset || 0) + query.limit);
  return result;
}
