// Database types for Supabase tables
export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          slug: string
          title: string
          subtitle: string | null
          location: 'delhi' | 'bali'
          location_label: string | null
          status: 'completed' | 'ongoing'
          type: string | null
          area: string | null
          year: string | null
          thumbnail: string | null
          gallery: any[] // JSON array
          floor_plans: any[] // JSON array
          tour_embed_url: string | null
          description: string | null
          highlights: string[] // JSON array
          amenities: string[] // JSON array
          specs: Record<string, string> // JSON object
          timeline: any[] // JSON array
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          subtitle?: string | null
          location: 'delhi' | 'bali'
          location_label?: string | null
          status?: 'completed' | 'ongoing'
          type?: string | null
          area?: string | null
          year?: string | null
          thumbnail?: string | null
          gallery?: any[]
          floor_plans?: any[]
          tour_embed_url?: string | null
          description?: string | null
          highlights?: string[]
          amenities?: string[]
          specs?: Record<string, string>
          timeline?: any[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          subtitle?: string | null
          location?: 'delhi' | 'bali'
          location_label?: string | null
          status?: 'completed' | 'ongoing'
          type?: string | null
          area?: string | null
          year?: string | null
          thumbnail?: string | null
          gallery?: any[]
          floor_plans?: any[]
          tour_embed_url?: string | null
          description?: string | null
          highlights?: string[]
          amenities?: string[]
          specs?: Record<string, string>
          timeline?: any[]
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string
          location: string
          quote: string
          rating: number
          profession: string | null
          image: string | null
          video_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          location: string
          quote: string
          rating: number
          profession?: string | null
          image?: string | null
          video_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          location?: string
          quote?: string
          rating?: number
          profession?: string | null
          image?: string | null
          video_url?: string | null
          updated_at?: string
        }
      }
      media: {
        Row: {
          id: string
          name: string
          logo_url: string
          article_url: string | null
          date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          logo_url: string
          article_url?: string | null
          date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          logo_url?: string
          article_url?: string | null
          date?: string | null
          updated_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          name: string
          phone: string
          email: string
          location: string
          interest: string
          message: string
          status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
          source: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          phone: string
          email: string
          location: string
          interest: string
          message: string
          status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
          source: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          phone?: string
          email?: string
          location?: string
          interest?: string
          message?: string
          status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
          source?: string
          notes?: string | null
          updated_at?: string
        }
      }
    }
  }
}