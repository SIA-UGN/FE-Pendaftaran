import { useState } from "react";
import {
  Eye,
  ExternalLink,
  Download,
  FileText,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/**
 * Reusable Document Preview Dialog Component
 *
 * @param {Object} props
 * @param {Object} props.document - Document object from API dengan file_path
 * @param {string} props.title - Title untuk dialog
 * @param {string} props.description - Description untuk dialog
 * @param {string} props.buttonText - Text untuk trigger button (default: "Lihat Dokumen")
 * @param {string} props.buttonVariant - Variant untuk button (default: "outline")
 */
export default function DocumentPreviewDialog({
  document,
  title,
  description,
  buttonText = "Lihat Dokumen",
  buttonVariant = "outline",
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Construct full URL dari file_path - HARDCODE ke localhost:8000
  const filePath = document?.file_path;
  const fileUrl = filePath ? `http://localhost:8000/storage/${filePath}` : null;

  const isPdf = fileUrl?.toLowerCase().endsWith(".pdf");
  const hasDocument = !!fileUrl;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={hasDocument ? buttonVariant : "ghost"}
          type="button"
          disabled={!hasDocument}
          className={!hasDocument ? "opacity-50 cursor-not-allowed" : ""}
        >
          <Eye className="w-4 h-4 mr-2" />
          {hasDocument ? buttonText : "Belum Diupload"}
        </Button>
      </DialogTrigger>

      {hasDocument && (
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          {/* Preview Area */}
          <div className="w-full h-[60vh] border rounded-lg overflow-hidden bg-gray-50 relative">
            {isPdf ? (
              <iframe
                src={`${fileUrl}#toolbar=0`}
                className="w-full h-full"
                title="PDF Preview"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={fileUrl}
                  alt={title}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML = `
                      <div class="text-center">
                        <p class="text-gray-600 mb-2">Gagal memuat gambar</p>
                        <p class="text-sm text-gray-500">Silakan gunakan tombol Download</p>
                      </div>
                    `;
                  }}
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-end mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(fileUrl, "_blank")}
              className="flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Buka di Tab Baru
            </Button>
            <Button variant="default" size="sm" asChild>
              <a href={fileUrl} download className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </a>
            </Button>
          </div>
        </DialogContent>
      )}

      {/* Warning message jika belum diupload */}
      {!hasDocument && isOpen && (
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Dokumen Belum Tersedia</DialogTitle>
            <DialogDescription>
              Pendaftar belum mengupload dokumen ini
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-8">
            <AlertCircle className="w-16 h-16 text-amber-500 mb-4" />
            <p className="text-center text-gray-600">
              Dokumen {title} belum diupload oleh pendaftar
            </p>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
