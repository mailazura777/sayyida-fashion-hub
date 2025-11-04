import { Button } from '@/components/ui/button';
import { FileText, Download, Printer } from 'lucide-react';
import { toast } from 'sonner';

interface ExportButtonsProps {
  onExportPDF?: () => void;
  onExportCSV?: () => void;
  onPrint?: () => void;
}

export function ExportButtons({ onExportPDF, onExportCSV, onPrint }: ExportButtonsProps) {
  const handleExportPDF = () => {
    if (onExportPDF) {
      onExportPDF();
    } else {
      toast.info('Export PDF akan segera tersedia');
    }
  };

  const handleExportCSV = () => {
    if (onExportCSV) {
      onExportCSV();
    } else {
      toast.info('Export CSV akan segera tersedia');
    }
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleExportPDF}
        className="gap-2"
      >
        <FileText className="h-4 w-4" />
        PDF
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleExportCSV}
        className="gap-2"
      >
        <Download className="h-4 w-4" />
        CSV
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrint}
        className="gap-2"
      >
        <Printer className="h-4 w-4" />
        Print
      </Button>
    </div>
  );
}
