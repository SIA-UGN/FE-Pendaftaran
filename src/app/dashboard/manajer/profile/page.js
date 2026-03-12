"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useDeleteManager, useManagers } from "@/hooks/useAdmin";
import { useSearchParams, useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Suspense, useState } from "react";
import { Mail, Phone, User, Trash2 } from "lucide-react";

export default function Profile() {
  return (
    <Suspense fallback={null}>
      <ProfileInner />
    </Suspense>
  );
}

function ProfileInner() {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const managerId = searchParams.get("id");

  const { data, isLoading, isError, error } = useManagers();
  const {
    mutate: deleteManager,
    isLoading: deleteLoading,
    isError: deleteIsError,
    error: deleteError,
  } = useDeleteManager();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border p-6 animate-pulse" style={{ borderColor: '#E6EEE9' }}>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-48 h-48 bg-gray-200 rounded-xl" />
            <div className="flex-1 space-y-3">
              <div className="h-6 bg-gray-200 rounded w-1/3" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="h-4 bg-gray-200 rounded w-1/5" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) return (
    <div className="bg-white rounded-2xl border p-8" style={{ borderColor: '#E6EEE9' }}>
      <p className="text-red-600">Error: {error.response?.data?.message || error.message}</p>
    </div>
  );

  const managersList = data?.data?.data || [];
  const managerData = Array.isArray(managersList)
    ? managersList.find((m) => m.id_user === parseInt(managerId))
    : null;

  if (!managerData) {
    return (
      <div className="bg-white rounded-2xl border p-8" style={{ borderColor: '#E6EEE9' }}>
        <p className="text-gray-500">Manager tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl border p-6 sm:p-8" style={{ borderColor: '#E6EEE9' }}>
        <h2 className="text-lg font-semibold mb-6" style={{ color: '#015023' }}>Akun Manajer</h2>

        <div className="flex flex-col sm:flex-row gap-6">
          <Image
            alt={`Profile picture of ${managerData.name}`}
            src={managerData.avatar_url || "/default-avatar.png"}
            width={180}
            height={220}
            className="w-full sm:w-44 h-52 rounded-xl object-cover mx-auto sm:mx-0"
          />
          <div className="flex flex-col justify-center space-y-3">
            <h3 className="text-xl font-bold text-gray-900">{managerData.name}</h3>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <User className="w-4 h-4" />
              <span>@{managerData.username || managerData.name}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Mail className="w-4 h-4" />
              <span>{managerData.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Phone className="w-4 h-4" />
              <span>{managerData.phone || "Tidak ada nomor telepon"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Kelola Akun */}
      <div className="bg-white rounded-2xl border p-6 sm:p-8" style={{ borderColor: '#E6EEE9' }}>
        <h2 className="text-lg font-semibold mb-4" style={{ color: '#015023' }}>Kelola Akun</h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button
                className="rounded-xl bg-red-600 hover:bg-red-700 text-white"
                disabled={deleteLoading}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Hapus Akun
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="w-[90vw] sm:w-full max-w-lg">
              <AlertDialogHeader>
                <AlertDialogTitle>Hapus Manager</AlertDialogTitle>
                <AlertDialogDescription>
                  Apakah Anda yakin ingin menghapus akun{" "}
                  <strong>{managerData.name}</strong>? Tindakan ini tidak dapat
                  dibatalkan.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="w-full sm:w-auto rounded-xl"
                >
                  Batal
                </Button>
                <Button
                  className="bg-red-600 hover:bg-red-700 w-full sm:w-auto rounded-xl"
                  onClick={() => {
                    deleteManager(managerId, {
                      onSuccess: () => {
                        setOpen(false);
                        router.push("/dashboard/data");
                      },
                    });
                  }}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? "Menghapus..." : "Hapus"}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
