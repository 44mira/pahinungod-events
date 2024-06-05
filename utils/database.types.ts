
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      admin_staff: {
        Row: {
          admin_staff_id: string
          adminStaff_office: string | null
          adminStaff_position: string | null
          volunteer_id: string | null
        }
        Insert: {
          admin_staff_id?: string
          adminStaff_office?: string | null
          adminStaff_position?: string | null
          volunteer_id?: string | null
        }
        Update: {
          admin_staff_id?: string
          adminStaff_office?: string | null
          adminStaff_position?: string | null
          volunteer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_staff_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteer"
            referencedColumns: ["volunteer_id"]
          },
        ]
      }
      alumni: {
        Row: {
          alumni_college: string | null
          alumni_constituent: string | null
          alumni_course: string | null
          alumni_graduatedYr: string | null
          alumni_id: number
          alumni_occupation: string | null
          alumni_office: string | null
          volunteer_id: string | null
        }
        Insert: {
          alumni_college?: string | null
          alumni_constituent?: string | null
          alumni_course?: string | null
          alumni_graduatedYr?: string | null
          alumni_id?: number
          alumni_occupation?: string | null
          alumni_office?: string | null
          volunteer_id?: string | null
        }
        Update: {
          alumni_college?: string | null
          alumni_constituent?: string | null
          alumni_course?: string | null
          alumni_graduatedYr?: string | null
          alumni_id?: number
          alumni_occupation?: string | null
          alumni_office?: string | null
          volunteer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "alumni_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteer"
            referencedColumns: ["volunteer_id"]
          },
        ]
      }
      event_volunteer: {
        Row: {
          event_id: string
          final_attendance: Database["public"]["Enums"]["attendance"] | null
          orientation_attendance:
            | Database["public"]["Enums"]["attendance"]
            | null
          status: Database["public"]["Enums"]["event_volunteer_status"]
          volunteer_id: string
        }
        Insert: {
          event_id?: string
          final_attendance?: Database["public"]["Enums"]["attendance"] | null
          orientation_attendance?:
            | Database["public"]["Enums"]["attendance"]
            | null
          status?: Database["public"]["Enums"]["event_volunteer_status"]
          volunteer_id: string
        }
        Update: {
          event_id?: string
          final_attendance?: Database["public"]["Enums"]["attendance"] | null
          orientation_attendance?:
            | Database["public"]["Enums"]["attendance"]
            | null
          status?: Database["public"]["Enums"]["event_volunteer_status"]
          volunteer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_volunteer_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "event_volunteer_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteer"
            referencedColumns: ["volunteer_id"]
          },
        ]
      }
      events: {
        Row: {
          admin_id: string
          description: string | null
          event_active: boolean
          event_end: string
          event_id: string
          event_start: string
          location: string
          name: string
          orientation_date: string | null
          volunteer_cap: number | null
        }
        Insert: {
          admin_id: string
          description?: string | null
          event_active?: boolean
          event_end: string
          event_id?: string
          event_start: string
          location?: string
          name?: string
          orientation_date?: string | null
          volunteer_cap?: number | null
        }
        Update: {
          admin_id?: string
          description?: string | null
          event_active?: boolean
          event_end?: string
          event_id?: string
          event_start?: string
          location?: string
          name?: string
          orientation_date?: string | null
          volunteer_cap?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "events_admin_id_fkey1"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      faculty: {
        Row: {
          faculty_collegeDep: string | null
          faculty_id: string
          volunteer_id: string | null
        }
        Insert: {
          faculty_collegeDep?: string | null
          faculty_id?: string
          volunteer_id?: string | null
        }
        Update: {
          faculty_collegeDep?: string | null
          faculty_id?: string
          volunteer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "faculty_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteer"
            referencedColumns: ["volunteer_id"]
          },
        ]
      }
      preferences: {
        Row: {
          affiliated_organziation: string | null
          preferences_id: string
          subject: string | null
          volunteer_id: string | null
          volunteer_programs: string | null
          volunteering_days: string | null
        }
        Insert: {
          affiliated_organziation?: string | null
          preferences_id?: string
          subject?: string | null
          volunteer_id?: string | null
          volunteer_programs?: string | null
          volunteering_days?: string | null
        }
        Update: {
          affiliated_organziation?: string | null
          preferences_id?: string
          subject?: string | null
          volunteer_id?: string | null
          volunteer_programs?: string | null
          volunteering_days?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "preferences_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteer"
            referencedColumns: ["volunteer_id"]
          },
        ]
      }
      retiree: {
        Row: {
          retiree_designation: string | null
          retiree_id: string
          retiree_office: string | null
          volunteer_id: string | null
        }
        Insert: {
          retiree_designation?: string | null
          retiree_id?: string
          retiree_office?: string | null
          volunteer_id?: string | null
        }
        Update: {
          retiree_designation?: string | null
          retiree_id?: string
          retiree_office?: string | null
          volunteer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "retiree_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteer"
            referencedColumns: ["volunteer_id"]
          },
        ]
      }
      student: {
        Row: {
          college: string | null
          degree: string | null
          fam_first_college: string | null
          student_id: string
          year: number | null
        }
        Insert: {
          college?: string | null
          degree?: string | null
          fam_first_college?: string | null
          student_id?: string
          year?: number | null
        }
        Update: {
          college?: string | null
          degree?: string | null
          fam_first_college?: string | null
          student_id?: string
          year?: number | null
        }
        Relationships: []
      }
      volunteer: {
        Row: {
          address: string | null
          age: number | null
          birth_date: string | null
          city: string | null
          email: string
          emergency_contact: string | null
          emergency_contact_address: string | null
          emergency_contact_affiliation: string | null
          emergency_contact_name: string | null
          hours_rendered: number
          indigenous_affiliation: string | null
          name: string
          nickname: string | null
          occupation: Database["public"]["Enums"]["volunteer_occupation"] | null
          phone_number: string
          postal_code: number | null
          province: string | null
          region: string | null
          rendered_hours: number | null
          sex: string | null
          volunteer_id: string
        }
        Insert: {
          address?: string | null
          age?: number | null
          birth_date?: string | null
          city?: string | null
          email?: string
          emergency_contact?: string | null
          emergency_contact_address?: string | null
          emergency_contact_affiliation?: string | null
          emergency_contact_name?: string | null
          hours_rendered?: number
          indigenous_affiliation?: string | null
          name?: string
          nickname?: string | null
          occupation?:
            | Database["public"]["Enums"]["volunteer_occupation"]
            | null
          phone_number?: string
          postal_code?: number | null
          province?: string | null
          region?: string | null
          rendered_hours?: number | null
          sex?: string | null
          volunteer_id: string
        }
        Update: {
          address?: string | null
          age?: number | null
          birth_date?: string | null
          city?: string | null
          email?: string
          emergency_contact?: string | null
          emergency_contact_address?: string | null
          emergency_contact_affiliation?: string | null
          emergency_contact_name?: string | null
          hours_rendered?: number
          indigenous_affiliation?: string | null
          name?: string
          nickname?: string | null
          occupation?:
            | Database["public"]["Enums"]["volunteer_occupation"]
            | null
          phone_number?: string
          postal_code?: number | null
          province?: string | null
          region?: string | null
          rendered_hours?: number | null
          sex?: string | null
          volunteer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      attendance: "attended" | "missed"
      event_volunteer_status: "accepted" | "rejected"
      volunteer_occupation:
        | "Student"
        | "Faculty"
        | "Retiree"
        | "Alumni"
        | "Admin Staff"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
