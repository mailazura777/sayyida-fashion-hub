import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, ShoppingCart, DollarSign, AlertTriangle, TrendingDown, Sparkles, Wallet, Package } from 'lucide-react';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { formatCurrency } from '@/lib/formatting';
import { Skeleton } from '@/components/ui/skeleton';
import { ExportButtons } from '@/components/ExportButtons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#C7206E', '#E74C8D', '#FF6B9D', '#FF8FB3', '#FFB3C9', '#FFD6E3', '#FFF0F5', '#8B5CF6'];

export default function Dashboard() {
  const { data, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  const summary = data?.summary || {
    totalOmset: 0,
    totalHargaBeli: 0,
    totalPengeluaran: 0,
    totalKerugian: 0,
    penghasilanKotor: 0,
    infaq: 0,
    penghasilanBersih: 0,
  };

  const monthlySalesData = data?.monthlySales.map(item => ({
    bulan: new Date(item.bulan || '').toLocaleDateString('id-ID', { month: 'short' }),
    omset: item.total_omset || 0,
    qty: item.qty_transaksi || 0,
  })) || [];

  const pieData = [
    { name: 'Omset', value: summary.totalOmset },
    { name: 'Harga Beli', value: summary.totalHargaBeli },
    { name: 'Pengeluaran', value: summary.totalPengeluaran },
    { name: 'Kerugian', value: summary.totalKerugian },
    { name: 'Penghasilan Kotor', value: summary.penghasilanKotor },
    { name: 'Infaq', value: summary.infaq },
    { name: 'Penghasilan Bersih', value: summary.penghasilanBersih },
  ].filter(item => item.value > 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Ringkasan keuangan Sayyida Fashion
          </p>
        </div>
        <ExportButtons />
      </div>

      {/* Summary Cards - Top Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-card hover:shadow-pink transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Omset</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(summary.totalOmset)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Total penjualan</p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-pink transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Harga Beli</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(summary.totalHargaBeli)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Modal produk</p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-pink transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pengeluaran</CardTitle>
            <TrendingDown className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(summary.totalPengeluaran)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Biaya operasional</p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-pink transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Kerugian</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {formatCurrency(summary.totalKerugian)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Kerugian bisnis</p>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards - Bottom Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-card hover:shadow-pink transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Penghasilan Kotor</CardTitle>
            <Wallet className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(summary.penghasilanKotor)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Sebelum infaq</p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-pink transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Infaq (2.5%)</CardTitle>
            <Sparkles className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {formatCurrency(summary.infaq)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">2.5% dari kotor</p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-pink transition-smooth col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Penghasilan Bersih</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {formatCurrency(summary.penghasilanBersih)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Penghasilan final setelah infaq</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Penjualan 12 Bulan Terakhir</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlySalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bulan" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                />
                <Legend />
                <Bar dataKey="omset" fill="#C7206E" name="Omset" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Breakdown Keuangan</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => {
                    const total = pieData.reduce((sum, item) => sum + (item.value || 0), 0);
                    const percentage = total > 0 ? ((entry.value / total) * 100).toFixed(1) : '0';
                    return `${entry.name}: ${percentage}%`;
                  }}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Rankings */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Top 5 Produk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.productRanking.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {i + 1}
                    </div>
                    <span className="font-medium">{item.jenis_produk}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary">{formatCurrency(item.total_omset || 0)}</div>
                    <div className="text-xs text-muted-foreground">{item.persentase?.toFixed(1)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Top 5 Pengeluaran</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.expenseRanking.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 font-bold text-sm">
                      {i + 1}
                    </div>
                    <span className="font-medium">{item.kategori}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-orange-600">{formatCurrency(item.total || 0)}</div>
                    <div className="text-xs text-muted-foreground">{item.persentase?.toFixed(1)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
