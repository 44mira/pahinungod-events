export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      admin: {
        Row: {
          admin_id: string;
          email: string;
          name: string;
          password: string;
        };
        Insert: {
          admin_id?: string;
          email?: string;
          name?: string;
          password?: string;
        };
        Update: {
          admin_id?: string;
          email?: string;
          name?: string;
          password?: string;
        };
        Relationships: [];
      };
      event_volunteer: {
        Row: {
          event_id: string;
          role: string;
          status: string;
          time_logged: number;
          volunteer_id: string;
        };
        Insert: {
          event_id?: string;
          role: string;
          status?: string;
          time_logged?: number;
          volunteer_id: string;
        };
        Update: {
          event_id?: string;
          role?: string;
          status?: string;
          time_logged?: number;
          volunteer_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "event_volunteer_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["event_id"];
          },
          {
            foreignKeyName: "event_volunteer_volunteer_id_fkey";
            columns: ["volunteer_id"];
            isOneToOne: false;
            referencedRelation: "volunteers";
            referencedColumns: ["volunteer_id"];
          },
        ];
      };
      events: {
        Row: {
          admin_id: string;
          description: string | null;
          event_end: string;
          event_id: string;
          event_start: string;
          location: string;
          name: string;
        };
        Insert: {
          admin_id?: string;
          description?: string | null;
          event_end: string;
          event_id?: string;
          event_start: string;
          location?: string;
          name?: string;
        };
        Update: {
          admin_id?: string;
          description?: string | null;
          event_end?: string;
          event_id?: string;
          event_start?: string;
          location?: string;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "events_admin_id_fkey";
            columns: ["admin_id"];
            isOneToOne: false;
            referencedRelation: "admin";
            referencedColumns: ["admin_id"];
          },
        ];
      };
      volunteers: {
        Row: {
          email: string;
          name: string;
          password: string;
          phone_number: string | null;
          volunteer_id: string;
        };
        Insert: {
          email?: string;
          name?: string;
          password?: string;
          phone_number?: string | null;
          volunteer_id?: string;
        };
        Update: {
          email?: string;
          name?: string;
          password?: string;
          phone_number?: string | null;
          volunteer_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

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
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

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
    : never;
