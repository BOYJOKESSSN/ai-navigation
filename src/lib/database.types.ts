// Supabase 数据库类型定义（与建表 SQL 同步）
export type Database = {
  public: {
    Tables: {
      tools: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string;
          full_description: string | null;
          logo: string | null;
          website: string;
          category: string;
          tags: string[];
          rating: number;
          review_count: number;
          pricing: 'free' | 'freemium' | 'paid';
          price_detail: string | null;
          pros: string[];
          cons: string[];
          features: string[];
          status: 'published' | 'draft' | 'archived';
          is_featured: boolean;
          is_hot: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['tools']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['tools']['Insert']>;
      };
      articles: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          cover_image: string | null;
          author: string;
          category: string;
          tags: string[];
          read_time: number;
          view_count: number;
          like_count: number;
          status: 'published' | 'draft';
          is_featured: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['articles']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['articles']['Insert']>;
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          icon: string | null;
          tool_count: number;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['categories']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['categories']['Insert']>;
      };
    };
  };
};
