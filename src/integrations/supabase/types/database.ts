export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          created_at: string
          created_by: string
          email: string
          id: string
          name: string
          tools: string[] | null
        }
        Insert: {
          created_at?: string
          created_by: string
          email: string
          id?: string
          name: string
          tools?: string[] | null
        }
        Update: {
          created_at?: string
          created_by?: string
          email?: string
          id?: string
          name?: string
          tools?: string[] | null
        }
      }
      profiles: {
        Row: {
          business_type: string | null
          company_name: string | null
          contact_person: string | null
          created_at: string
          email: string | null
          id: string
          other_business_type: string | null
          other_tools: string[] | null
          phone: string | null
          selected_tools: string[] | null
          updated_at: string
        }
        Insert: {
          business_type?: string | null
          company_name?: string | null
          contact_person?: string | null
          created_at?: string
          email?: string | null
          id: string
          other_business_type?: string | null
          other_tools?: string[] | null
          phone?: string | null
          selected_tools?: string[] | null
          updated_at?: string
        }
        Update: {
          business_type?: string | null
          company_name?: string | null
          contact_person?: string | null
          created_at?: string
          email?: string | null
          id?: string
          other_business_type?: string | null
          other_tools?: string[] | null
          phone?: string | null
          selected_tools?: string[] | null
          updated_at?: string
        }
      }
      user_roles: {
        Row: {
          id: string
          user_id: string | null
          role: "admin" | "user"
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          role?: "admin" | "user"
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          role?: "admin" | "user"
          created_at?: string
        }
      }
    }
  }
}