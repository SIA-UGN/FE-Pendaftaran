"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ExternalLink, FileCheck, Download, Eye, FileText } from "lucide-react";

const typeLabels = {
  academic: "Akademik",
  music: "Musik",
  art: "Seni",
  religion: "Agama",
  sport: "Olahraga",
  other: "Lainnya",
};

const levelLabels = {
  school: "Sekolah",
  regency: "Kecamatan/Kabupaten",
  provincial: "Provinsi",
  national: "Nasional",
  international: "Internasional",
};

export const columns = [
  {
    id: "rowNumber",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "achievement_name",
    header: "Nama Prestasi",
  },
  {
    accessorKey: "year",
    header: "Tahun",
  },
  {
    accessorKey: "type",
    header: "Jenis",
    cell: ({ row }) => {
      const type = row.getValue("type");
      return typeLabels[type] || type;
    },
  },
  {
    accessorKey: "level",
    header: "Tingkat",
    cell: ({ row }) => {
      const level = row.getValue("level");
      return levelLabels[level] || level;
    },
  },
  {
    accessorKey: "organizer",
    header: "Penyelenggara",
  },
  {
    accessorKey: "rank",
    header: "Peringkat",
  },
  {
    accessorKey: "certificate_file",
    header: "Sertifikat",
    cell: ({ row }) => {
      const certificateFile = row.getValue("certificate_file");
      if (!certificateFile) {
        return <span className="text-gray-400 text-sm">Tidak ada</span>;
      }
      return (
        <div className="flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-green-600" />
          <span className="text-sm text-green-600">Ada</span>
        </div>
      );
    },
  },
  {
    id: "lihat",
    header: "Aksi",
    cell: ({ row }) => {
      const data = row.original;
      const certificateFile = data.certificate_file;

      if (!certificateFile) {
        return <span className="text-gray-400 text-sm">-</span>;
      }

      // certificateFile is already a full URL from backend (certificate_url)
      const fullUrl = certificateFile;
      const isPdf = fullUrl.toLowerCase().endsWith(".pdf");

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="yellow"
              size="sm"
              className="flex items-center gap-1"
            >
              <Eye className="w-3 h-3" />
              Lihat
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Preview Sertifikat</DialogTitle>
              <DialogDescription>
                {data.achievement_name} - {data.year}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              {/* Preview Area */}
              <div className="w-full h-[60vh] border rounded-lg overflow-hidden bg-gray-50 relative">
                {isPdf ? (
                  <>
                    <iframe
                      src={`${fullUrl}#toolbar=0`}
                      className="w-full h-full"
                      title="PDF Preview"
                    />
                    {/* Fallback message overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 pointer-events-none">
                      <div className="text-center p-6">
                        <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-2">
                          Preview tidak tersedia
                        </p>
                        <p className="text-sm text-gray-500">
                          Silakan gunakan tombol "Buka di Tab Baru" atau
                          "Download" di bawah
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <img
                      src={fullUrl}
                      alt="Certificate"
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
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(fullUrl, "_blank")}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Buka di Tab Baru
                </Button>
                <Button variant="default" size="sm" asChild>
                  <a
                    href={fullUrl}
                    download
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
