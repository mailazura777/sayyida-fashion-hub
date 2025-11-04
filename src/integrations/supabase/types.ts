export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      asset: {
        Row: {
          created_at: string | null
          id: string
          jenis_asset: string | null
          keterangan: string | null
          nama_asset: string
          nilai_asset: number
          tanggal: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          jenis_asset?: string | null
          keterangan?: string | null
          nama_asset: string
          nilai_asset: number
          tanggal: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          jenis_asset?: string | null
          keterangan?: string | null
          nama_asset?: string
          nilai_asset?: number
          tanggal?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      karyawan: {
        Row: {
          alamat: string | null
          created_at: string | null
          id: string
          jabatan: string | null
          nama: string
          no_hp: string | null
          no_rek: string | null
          status_karyawan: string | null
          updated_at: string | null
        }
        Insert: {
          alamat?: string | null
          created_at?: string | null
          id?: string
          jabatan?: string | null
          nama: string
          no_hp?: string | null
          no_rek?: string | null
          status_karyawan?: string | null
          updated_at?: string | null
        }
        Update: {
          alamat?: string | null
          created_at?: string | null
          id?: string
          jabatan?: string | null
          nama?: string
          no_hp?: string | null
          no_rek?: string | null
          status_karyawan?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      kerugian: {
        Row: {
          created_at: string | null
          id: string
          kategori: string | null
          keterangan: string | null
          nominal: number
          tanggal: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          kategori?: string | null
          keterangan?: string | null
          nominal: number
          tanggal: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          kategori?: string | null
          keterangan?: string | null
          nominal?: number
          tanggal?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      pengeluaran: {
        Row: {
          created_at: string | null
          id: string
          kategori: string | null
          keterangan: string | null
          nominal: number
          tanggal: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          kategori?: string | null
          keterangan?: string | null
          nominal: number
          tanggal: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          kategori?: string | null
          keterangan?: string | null
          nominal?: number
          tanggal?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      penjualan: {
        Row: {
          biaya_marketplace: number | null
          created_at: string | null
          harga_beli: number
          harga_jual: number
          id: string
          jenis_produk: string | null
          keterangan: string | null
          metode_pembayaran: string | null
          nama_pelanggan: string
          tanggal: string
          updated_at: string | null
        }
        Insert: {
          biaya_marketplace?: number | null
          created_at?: string | null
          harga_beli: number
          harga_jual: number
          id?: string
          jenis_produk?: string | null
          keterangan?: string | null
          metode_pembayaran?: string | null
          nama_pelanggan: string
          tanggal: string
          updated_at?: string | null
        }
        Update: {
          biaya_marketplace?: number | null
          created_at?: string | null
          harga_beli?: number
          harga_jual?: number
          id?: string
          jenis_produk?: string | null
          keterangan?: string | null
          metode_pembayaran?: string | null
          nama_pelanggan?: string
          tanggal?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      slip_gaji: {
        Row: {
          bonus: number | null
          bulan_tahun: string
          created_at: string | null
          hari_hadir: number | null
          hari_ijin: number | null
          hari_sakit: number | null
          id: string
          karyawan_id: string
          kerugian_ditanggung: number | null
          keterangan: string | null
          lembur: number | null
          total_take_home_pay: number
          updated_at: string | null
        }
        Insert: {
          bonus?: number | null
          bulan_tahun: string
          created_at?: string | null
          hari_hadir?: number | null
          hari_ijin?: number | null
          hari_sakit?: number | null
          id?: string
          karyawan_id: string
          kerugian_ditanggung?: number | null
          keterangan?: string | null
          lembur?: number | null
          total_take_home_pay: number
          updated_at?: string | null
        }
        Update: {
          bonus?: number | null
          bulan_tahun?: string
          created_at?: string | null
          hari_hadir?: number | null
          hari_ijin?: number | null
          hari_sakit?: number | null
          id?: string
          karyawan_id?: string
          kerugian_ditanggung?: number | null
          keterangan?: string | null
          lembur?: number | null
          total_take_home_pay?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "slip_gaji_karyawan_id_fkey"
            columns: ["karyawan_id"]
            isOneToOne: false
            referencedRelation: "karyawan"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          is_active: boolean | null
          password_hash: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          password_hash: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          password_hash?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      v_monthly_sales: {
        Row: {
          bulan: string | null
          qty_transaksi: number | null
          total_beli: number | null
          total_marketplace: number | null
          total_omset: number | null
        }
        Relationships: []
      }
      v_ranking_pengeluaran: {
        Row: {
          kategori: string | null
          persentase: number | null
          qty: number | null
          total: number | null
        }
        Relationships: []
      }
      v_ranking_produk: {
        Row: {
          jenis_produk: string | null
          persentase: number | null
          qty: number | null
          total_omset: number | null
        }
        Relationships: []
      }
      v_summary: {
        Row: {
          total_biaya_marketplace: number | null
          total_harga_beli: number | null
          total_kerugian: number | null
          total_omset: number | null
          total_pengeluaran: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
