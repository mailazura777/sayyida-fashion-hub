import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DashboardLayout } from "./components/DashboardLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Penjualan from "./pages/Penjualan";
import Pengeluaran from "./pages/Pengeluaran";
import Kerugian from "./pages/Kerugian";
import Asset from "./pages/Asset";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/penjualan" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Penjualan />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/pengeluaran" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Pengeluaran />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/kerugian" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Kerugian />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/asset" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Asset />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/laporan" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <div className="text-center py-12">Coming soon - Laporan Laba Rugi</div>
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/karyawan" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <div className="text-center py-12">Coming soon - Karyawan</div>
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/slip-gaji" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <div className="text-center py-12">Coming soon - Slip Gaji</div>
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Settings />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
