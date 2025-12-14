"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  useEmailFormatOptions,
  useCreateOfficialEmail,
  useEmailStatus,
} from "@/hooks/useOfficialEmail";
import { Loader2, CheckCircle2, Mail } from "lucide-react";

export default function EmailPicker() {
  const [selectedFormat, setSelectedFormat] = useState(null);

  const { data: formatOptionsData, isLoading: isLoadingOptions } =
    useEmailFormatOptions();
  const { data: emailStatusData } = useEmailStatus();
  const { mutate: createEmail, isPending: isCreating } =
    useCreateOfficialEmail();

  const formatOptions = formatOptionsData?.data?.data?.format_options || [];
  const emailStatus = emailStatusData?.data?.data;
  const hasOfficialEmail = emailStatus?.official_email_created;
  const officialEmail = emailStatus?.official_email;

  // Auto-select first option if available
  useEffect(() => {
    if (formatOptions.length > 0 && !selectedFormat && !hasOfficialEmail) {
      setSelectedFormat(formatOptions[0].type);
    }
  }, [formatOptions, selectedFormat, hasOfficialEmail]);

  const handleCreateEmail = () => {
    if (!selectedFormat) {
      return;
    }

    createEmail({ format_type: selectedFormat });
  };

  // Jika sudah ada official email
  if (hasOfficialEmail && officialEmail) {
    return (
      <>
        <h2 className="text-3xl sm:text-2xl font-semibold w-full border-b-1 border-gray-500 pb-2 text-[var(--green)] mt-12">
          Email Mahasiswa
        </h2>

        <Card className="p-6 w-full">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="text-green-600 w-8 h-8" />
            <div>
              <h3 className="font-semibold text-lg">
                Email Resmi Sudah Dibuat
              </h3>
              <p className="text-sm text-gray-600">
                Email mahasiswa Anda telah berhasil dibuat
              </p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="text-green-700 w-5 h-5" />
              <p className="text-sm text-gray-600">Email Resmi Anda:</p>
            </div>
            <p className="text-xl font-bold text-green-700">
              {officialEmail.email}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Kredensial login telah dikirim ke email pribadi Anda
            </p>
          </div>
        </Card>
      </>
    );
  }

  // Loading state
  if (isLoadingOptions) {
    return (
      <>
        <h2 className="text-3xl sm:text-2xl font-semibold w-full border-b-1 border-gray-500 pb-2 text-[var(--green)] mt-12">
          Email Pendaftar
        </h2>
        <div className="flex items-center justify-center w-full py-8">
          <Loader2 className="w-8 h-8 animate-spin text-green-600" />
          <span className="ml-2 text-gray-600">Memuat opsi email...</span>
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="text-3xl sm:text-2xl font-semibold w-full border-b-1 border-gray-500 pb-2 text-[var(--green)] mt-12">
        Email Pendaftar
      </h2>
      <p className="w-full">
        Pilih format email yang nantinya akan Anda gunakan sebagai email
        mahasiswa!
      </p>

      <Card className="p-4 w-full space-y-2">
        {formatOptions.map((option, index) => (
          <div
            key={index}
            onClick={() => setSelectedFormat(option.type)}
            className={`cursor-pointer rounded-lg px-4 py-3 transition border ${
              selectedFormat === option.type
                ? "bg-green-100 border-green-300 text-green-700"
                : "hover:bg-gray-50 border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`font-medium ${
                    selectedFormat === option.type
                      ? "text-green-700"
                      : "text-gray-800"
                  }`}
                >
                  {option.example}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {option.description}
                </p>
              </div>
              {selectedFormat === option.type && (
                <CheckCircle2 className="text-green-600 w-5 h-5" />
              )}
            </div>
          </div>
        ))}
      </Card>

      {selectedFormat && (
        <div className="w-full space-y-3">
          <p className="text-sm text-gray-600">
            Email terpilih:{" "}
            <span className="font-semibold">
              {formatOptions.find((o) => o.type === selectedFormat)?.example}
            </span>
          </p>

          <Button
            onClick={handleCreateEmail}
            disabled={isCreating}
            variant="green"
            className="w-full sm:w-auto"
          >
            {isCreating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Membuat Email...
              </>
            ) : (
              "Buat Email Mahasiswa"
            )}
          </Button>
        </div>
      )}
    </>
  );
}
