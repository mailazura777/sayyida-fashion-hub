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
import { usePenjualan } from '@/hooks/usePenjualan';
import { formatCurrency, formatDate } from '@/lib/formatting';
import { Calendar as CalendarIcon, Plus, Search, Filter, Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
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

const jenisProduk = [
  'Rajut', 'Celana', 'Kaos', 'Hoodie', 'Dress', 'Rok', 
  'Jeans', 'Jaket', 'Sweater', 'Kemeja', 'Kulot', 'Vest', 
  'PL Pribadi', 'Lainnya'
];

const metodePembayaran = [
  'Full payment', 'Bayar ongkir di tempat', 'Split payment shopee', 
  'COD', 'Cash', 'Offline'
];

const formSchema = z.object({
  tanggal: z.date(),
  nama_pelanggan: z.string().min(1, 'Nama pelanggan harus diisi'),
  jenis_produk: z.string().min(1, 'Jenis produk harus dipilih'),
  metode_pembayaran: z.string().min(1, 'Metode pembayaran harus dipilih'),
  harga_beli: z.number().min(0, 'Harga beli harus positif'),
  harga_jual: z.number().min(0, 'Harga jual harus positif'),
  biaya_marketplace: z.number().min(0, 'Biaya marketplace harus positif'),
  keterangan: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function Penjualan() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState<Date>();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  const { penjualan, isLoading, createPenjualan, deletePenjualan, isCreating } = usePenjualan();

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tanggal: new Date(),
      biaya_marketplace: 0,
    },
  });

  const selectedDate = watch('tanggal');

  const onSubmit = (data: FormData) => {
    createPenjualan({
      tanggal: data.tanggal.toISOString(),
      nama_pelanggan: data.nama_pelanggan,
      jenis_produk: data.jenis_produk,
      metode_pembayaran: data.metode_pembayaran,
      harga_beli: data.harga_beli,
      harga_jual: data.harga_jual,
      biaya_marketplace: data.biaya_marketplace,
      keterangan: data.keterangan || null,
    });
  };

  const handleReset = () => {
    reset({
      tanggal: new Date(),
      nama_pelanggan: '',
      jenis_produk: '',
      metode_pembayaran: '',
      harga_beli: 0,
      harga_jual: 0,
      biaya_marketplace: 0,
      keterangan: '',
    });
  };

  const handleDelete = () => {
    if (deleteId) {
      deletePenjualan(deleteId);
      setDeleteId(null);
    }
  };

  const filteredData = penjualan.filter(item => 
    item.nama_pelanggan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const thisMonthData = penjualan.filter(item => {
    const itemDate = new Date(item.tanggal);
    const now = new Date();
    return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
  });

  const totalQty = thisMonthData.length;
  const totalOmset = thisMonthData.reduce((sum, item) => sum + item.harga_jual, 0);

  const columns = [
    {
      header: 'Tanggal',
      accessor: (row: any) => formatDate(row.tanggal),
    },
    {
      header: 'Pelanggan',
      accessor: 'nama_pelanggan' as keyof typeof penjualan[0],
    },
    {
      header: 'Jenis Produk',
      accessor: 'jenis_produk' as keyof typeof penjualan[0],
    },
    {
      header: 'Metode',
      accessor: 'metode_pembayaran' as keyof typeof penjualan[0],
    },
    {
      header: 'Harga Beli',
      accessor: (row: any) => formatCurrency(row.harga_beli),
    },
    {
      header: 'Harga Jual',
      accessor: (row: any) => formatCurrency(row.harga_jual),
      className: 'text-primary font-semibold',
    },
    {
      header: 'Biaya MP',
      accessor: (row: any) => formatCurrency(row.biaya_marketplace || 0),
    },
    {
      header: 'Aksi',
      accessor: (row: any) => (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setDeleteId(row.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Penjualan</h1>
          <p className="text-muted-foreground mt-2">
            Kelola transaksi penjualan harian
          </p>
        </div>
        <ExportButtons />
      </div>

      {/* Summary Card */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Bulan Ini</p>
              <p className="text-2xl font-bold text-primary mt-1">
                {formatCurrency(totalOmset)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Qty Transaksi</p>
              <p className="text-2xl font-bold mt-1">{totalQty}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Input */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Tambah Data Penjualan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Tanggal */}
              <div className="space-y-2">
                <Label>Tanggal Transaksi</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !selectedDate && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, 'PPP') : 'Pilih tanggal'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setValue('tanggal', date)}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                {errors.tanggal && (
                  <p className="text-xs text-destructive">{errors.tanggal.message}</p>
                )}
              </div>

              {/* Nama Pelanggan */}
              <div className="space-y-2">
                <Label htmlFor="nama_pelanggan">Nama Pelanggan</Label>
                <Input
                  id="nama_pelanggan"
                  {...register('nama_pelanggan')}
                  placeholder="Masukkan nama pelanggan"
                />
                {errors.nama_pelanggan && (
                  <p className="text-xs text-destructive">{errors.nama_pelanggan.message}</p>
                )}
              </div>

              {/* Jenis Produk */}
              <div className="space-y-2">
                <Label>Jenis Produk</Label>
                <Select onValueChange={(value) => setValue('jenis_produk', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis produk" />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    {jenisProduk.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.jenis_produk && (
                  <p className="text-xs text-destructive">{errors.jenis_produk.message}</p>
                )}
              </div>

              {/* Metode Pembayaran */}
              <div className="space-y-2">
                <Label>Metode Pembayaran</Label>
                <Select onValueChange={(value) => setValue('metode_pembayaran', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih metode pembayaran" />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    {metodePembayaran.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.metode_pembayaran && (
                  <p className="text-xs text-destructive">{errors.metode_pembayaran.message}</p>
                )}
              </div>

              {/* Harga Beli */}
              <div className="space-y-2">
                <Label htmlFor="harga_beli">Harga Beli (Rp)</Label>
                <Input
                  id="harga_beli"
                  type="number"
                  {...register('harga_beli', { valueAsNumber: true })}
                  placeholder="0"
                />
                {errors.harga_beli && (
                  <p className="text-xs text-destructive">{errors.harga_beli.message}</p>
                )}
              </div>

              {/* Harga Jual */}
              <div className="space-y-2">
                <Label htmlFor="harga_jual">Harga Jual (Rp)</Label>
                <Input
                  id="harga_jual"
                  type="number"
                  {...register('harga_jual', { valueAsNumber: true })}
                  placeholder="0"
                />
                {errors.harga_jual && (
                  <p className="text-xs text-destructive">{errors.harga_jual.message}</p>
                )}
              </div>

              {/* Biaya Marketplace */}
              <div className="space-y-2">
                <Label htmlFor="biaya_marketplace">Biaya Marketplace (Rp)</Label>
                <Input
                  id="biaya_marketplace"
                  type="number"
                  {...register('biaya_marketplace', { valueAsNumber: true })}
                  placeholder="0"
                />
                {errors.biaya_marketplace && (
                  <p className="text-xs text-destructive">{errors.biaya_marketplace.message}</p>
                )}
              </div>

              {/* Keterangan */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="keterangan">Keterangan (Optional)</Label>
                <Textarea
                  id="keterangan"
                  {...register('keterangan')}
                  placeholder="Catatan tambahan..."
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isCreating} className="gradient-primary">
                {isCreating ? 'Menyimpan...' : 'Simpan Data'}
              </Button>
              <Button type="button" variant="outline" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Search & Filter */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama pelanggan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Data Penjualan</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable data={filteredData} columns={columns} loading={isLoading} />
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
