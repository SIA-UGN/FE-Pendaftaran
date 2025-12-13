"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Heading } from "@/components/Heading";
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
import { useState } from "react";

export default function Profile() {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const managerId = searchParams.get("id");

  // Get all managers and find the specific one
  const { data, isLoading, isError, error } = useManagers();
  const {
    mutate: deleteManager,
    isLoading: deleteLoading,
    isError: deleteIsError,
    error: deleteError,
  } = useDeleteManager();

  if (isLoading) return <div>Loading...</div>;

  if (isError)
    return (
      <div>
        Error fetching manager profile:{" "}
        {error.response?.data?.message || error.message}
      </div>
    );

  // Find manager from the list
  const managersList = data?.data?.data || [];
  const managerData = Array.isArray(managersList)
    ? managersList.find((m) => m.id_user === parseInt(managerId))
    : null;

  if (!managerData) {
    return <div>Manager tidak ditemukan</div>;
  }

  console.log("Manager ID:", managerId);
  console.log("Manager Data:", managerData);

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 max-w-7xl my-6 sm:my-8 lg:my-12 w-full gap-3 mx-auto">
      {/* Akun Manajer */}
      <Heading title="Akun Manajer" variant="first" />

      {/* Profile Card */}
      <Card className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-md bg-[var(--light-cream)]/50">
        <Image
          alt={`Profile picture of ${managerData.name}`}
          src={managerData.avatar_url || "/default-avatar.png"}
          width={180}
          height={300}
          className="w-full sm:w-1/3 lg:w-1/4 h-[200px] sm:h-[250px] lg:h-[300px] rounded-lg sm:rounded-xl object-cover mx-auto sm:mx-0"
        />
        <div className="flex flex-col p-2 w-full sm:w-2/3 space-y-1 sm:space-y-2 items-start justify-start">
          <h2 className="font-bold text-lg sm:text-xl lg:text-2xl">
            {managerData.name}
          </h2>
          <h3 className="text-gray-500 text-sm sm:text-base">
            @{managerData.username || managerData.name}
          </h3>
          <p className="text-gray-500 text-sm sm:text-base">
            {managerData.email}
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            {managerData.phone || "Tidak ada nomor telepon"}
          </p>
        </div>
      </Card>

      {/* Kelola Akun */}
      <Heading title="Kelola Akun" />

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:justify-center">
        <AlertDialog open={open} onOpenChange={setOpen}>
          {/* Trigger button */}
          <AlertDialogTrigger asChild>
            <Button
              className="rounded-lg w-full sm:w-1/2 lg:w-1/4 bg-red-600 hover:bg-red-700 text-sm sm:text-base py-2 sm:py-3"
              disabled={deleteLoading}
            >
              Hapus Akun
            </Button>
          </AlertDialogTrigger>

          {/* Confirmation dialog */}
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
                className="w-full sm:w-auto"
              >
                Batal
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
                onClick={() => {
                  deleteManager(managerId, {
                    onSuccess: () => {
                      setOpen(false);
                      router.push("/dashboard/manajer");
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
  );
}
