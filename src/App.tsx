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
                  <div>Pengeluaran - Coming soon</div>
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/kerugian" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <div>Kerugian - Coming soon</div>
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/asset" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <div>Asset - Coming soon</div>
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/laporan" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <div>Laporan Laba Rugi - Coming soon</div>
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/karyawan" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <div>Karyawan - Coming soon</div>
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/slip-gaji" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <div>Slip Gaji - Coming soon</div>
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <div>Settings - Coming soon</div>
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
