import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Tables, TablesInsert } from '@/integrations/supabase/types';

type Penjualan = Tables<'penjualan'>;
type PenjualanInsert = TablesInsert<'penjualan'>;

export function usePenjualan(dateFrom?: Date, dateTo?: Date) {
  const queryClient = useQueryClient();

  const { data: penjualan = [], isLoading } = useQuery({
    queryKey: ['penjualan', dateFrom, dateTo],
    queryFn: async () => {
      let query = supabase
        .from('penjualan')
        .select('*')
        .order('tanggal', { ascending: false });

      if (dateFrom) {
        query = query.gte('tanggal', dateFrom.toISOString());
      }
      if (dateTo) {
        query = query.lte('tanggal', dateTo.toISOString());
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Penjualan[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: PenjualanInsert) => {
      const { error } = await supabase.from('penjualan').insert(data);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['penjualan'] });
      toast.success('Data penjualan berhasil ditambahkan');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Gagal menambahkan data');
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Penjualan> }) => {
      const { error } = await supabase
        .from('penjualan')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['penjualan'] });
      toast.success('Data berhasil diupdate');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Gagal mengupdate data');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('penjualan').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['penjualan'] });
      toast.success('Data berhasil dihapus');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Gagal menghapus data');
    },
  });

  return {
    penjualan,
    isLoading,
    createPenjualan: createMutation.mutate,
    updatePenjualan: updateMutation.mutate,
    deletePenjualan: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
