import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-xl text-muted-foreground">Halaman tidak ditemukan</p>
        <a 
          href="/dashboard" 
          className="inline-block px-6 py-2 rounded-lg gradient-primary text-primary-foreground hover:opacity-90 transition-smooth"
        >
          Kembali ke Dashboard
        </a>
      </div>
    </div>
  );
};

export default NotFound;
