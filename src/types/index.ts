export interface Tool {
  id: string;
  name: string;
  slug?: string;
  description: string;
  longDescription?: string;
  category: string;
  tags?: string[];
  logo?: string;
  url?: string;
  pricing?: 'free' | 'freemium' | 'paid';
  rating?: number;
  reviewCount?: number;
  featured?: boolean;
  hot?: boolean;
  isNew?: boolean;
  createdAt?: string;
  publishedAt?: string;
  pros?: string[];
  cons?: string[];
  status?: string;
}

export interface Article {
  id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  tags?: string[];
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
  readTime?: number;
  coverImage?: string;
  featured?: boolean;
  views?: number;
  status?: string;
}

export type ToolCategory = {
  id: string;
  name: string;
  icon: string;
  count: number;
};
