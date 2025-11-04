import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // Get summary data
      const { data: summary } = await supabase
        .from('v_summary')
        .select('*')
        .single();

      // Get monthly sales
      const { data: monthlySales } = await supabase
        .from('v_monthly_sales')
        .select('*')
        .order('bulan', { ascending: true })
        .limit(12);

      // Get product ranking
      const { data: productRanking } = await supabase
        .from('v_ranking_produk')
        .select('*')
        .order('total_omset', { ascending: false })
        .limit(5);

      // Get expense ranking
      const { data: expenseRanking } = await supabase
        .from('v_ranking_pengeluaran')
        .select('*')
        .order('total', { ascending: false })
        .limit(5);

      // Calculate derived values
      const totalOmset = summary?.total_omset || 0;
      const totalHargaBeli = summary?.total_harga_beli || 0;
      const totalPengeluaran = summary?.total_pengeluaran || 0;
      const totalKerugian = summary?.total_kerugian || 0;
      const totalBiayaMP = summary?.total_biaya_marketplace || 0;

      const penghasilanKotor = totalOmset - totalHargaBeli - totalPengeluaran - totalKerugian;
      const infaq = penghasilanKotor * 0.025;
      const penghasilanBersih = penghasilanKotor - infaq;

      return {
        summary: {
          totalOmset,
          totalHargaBeli,
          totalPengeluaran,
          totalKerugian,
          totalBiayaMP,
          penghasilanKotor,
          infaq,
          penghasilanBersih,
        },
        monthlySales: monthlySales || [],
        productRanking: productRanking || [],
        expenseRanking: expenseRanking || [],
      };
    },
  });
}
