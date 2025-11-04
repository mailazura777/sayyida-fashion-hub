import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DataTable } from '@/components/DataTable';
import { ExportButtons } from '@/components/ExportButtons';
import { formatCurrency, formatDate } from '@/lib/formatting';
import { Calendar as CalendarIcon, Plus, Search, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const kategoriPengeluaran = [
  'Gaji karyawan', 'Lakban', 'Operasional', 
  'Transportasi', 'Makan', 'Lainnya'
];

const formSchema = z.object({
  tanggal: z.date(),
  kategori: z.string().min(1, 'Kategori harus dipilih'),
  nominal: z.number().min(0, 'Nominal harus positif'),
  keterangan: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function Pengeluaran() {
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: pengeluaran = [], isLoading } = useQuery({
    queryKey: ['pengeluaran'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pengeluaran')
        .select('*')
        .order('tanggal', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase.from('pengeluaran').insert(data);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pengeluaran'] });
      toast.success('Data pengeluaran berhasil ditambahkan');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('pengeluaran').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pengeluaran'] });
      toast.success('Data berhasil dihapus');
    },
  });

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tanggal: new Date(),
    },
  });

  const selectedDate = watch('tanggal');

  const onSubmit = (data: FormData) => {
    createMutation.mutate({
      tanggal: data.tanggal.toISOString(),
      kategori: data.kategori,
      nominal: data.nominal,
      keterangan: data.keterangan || null,
    });
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId);
      setDeleteId(null);
    }
  };

  const filteredData = pengeluaran.filter(item => 
    (item.kategori || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const thisMonthData = pengeluaran.filter(item => {
    const itemDate = new Date(item.tanggal);
    const now = new Date();
    return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
  });

  const totalNominal = thisMonthData.reduce((sum, item) => sum + item.nominal, 0);

  const columns = [
    { header: 'Tanggal', accessor: (row: any) => formatDate(row.tanggal) },
    { header: 'Kategori', accessor: 'kategori' as keyof typeof pengeluaran[0] },
    { header: 'Nominal', accessor: (row: any) => formatCurrency(row.nominal), className: 'text-orange-600 font-semibold' },
    { header: 'Keterangan', accessor: 'keterangan' as keyof typeof pengeluaran[0] },
    {
      header: 'Aksi',
      accessor: (row: any) => (
        <Button variant="destructive" size="sm" onClick={() => setDeleteId(row.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pengeluaran</h1>
          <p className="text-muted-foreground mt-2">Kelola pengeluaran operasional</p>
        </div>
        <ExportButtons />
      </div>

      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Total Pengeluaran Bulan Ini</p>
            <p className="text-3xl font-bold text-orange-600 mt-1">{formatCurrency(totalNominal)}</p>
            <p className="text-sm text-muted-foreground mt-1">{thisMonthData.length} transaksi</p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Tambah Data Pengeluaran
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Tanggal Transaksi</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn('w-full justify-start text-left font-normal', !selectedDate && 'text-muted-foreground')}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, 'PPP') : 'Pilih tanggal'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={selectedDate} onSelect={(date) => date && setValue('tanggal', date)} initialFocus className="pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Kategori Pengeluaran</Label>
                <Select onValueChange={(value) => setValue('kategori', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    {kategoriPengeluaran.map((item) => (
                      <SelectItem key={item} value={item}>{item}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.kategori && <p className="text-xs text-destructive">{errors.kategori.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="nominal">Nominal (Rp)</Label>
                <Input id="nominal" type="number" {...register('nominal', { valueAsNumber: true })} placeholder="0" />
                {errors.nominal && <p className="text-xs text-destructive">{errors.nominal.message}</p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="keterangan">Keterangan (Optional)</Label>
                <Textarea id="keterangan" {...register('keterangan')} placeholder="Catatan tambahan..." rows={3} />
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={createMutation.isPending} className="gradient-primary">
                {createMutation.isPending ? 'Menyimpan...' : 'Simpan Data'}
              </Button>
              <Button type="button" variant="outline" onClick={() => reset()}>Reset</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Cari kategori..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Data Pengeluaran</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable data={filteredData} columns={columns} loading={isLoading} />
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
            <AlertDialogDescription>Apakah Anda yakin ingin menghapus data ini?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
