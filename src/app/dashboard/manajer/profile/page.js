"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Heading } from "@/components/Heading";
import { useDeleteManager, useUserProfile } from "@/hooks/useAdmin";
import { useSearchParams } from "next/navigation";
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
  const managerId = searchParams.get("id");

  const { data, isLoading, isError, error } = useUserProfile(managerId);
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

  console.log("Manager ID:", managerId);
  console.log("Data:", data.data.data);

  const userData = data.data.data.user;
  const managerData = data.data.data.manager;

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 max-w-7xl my-6 sm:my-8 lg:my-12 w-full gap-3 mx-auto">
      {/* Akun Manajer */}
      <Heading title="Akun Manajer" variant="first" />
      
      {/* Profile Card */}
      <Card className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-md bg-[var(--light-cream)]/50">
        <Image
          alt={`Profile picture of ${userData.name}`}
          src={userData.avatar_url}
          width={180}
          height={300}
          className="w-full sm:w-1/3 lg:w-1/4 h-[200px] sm:h-[250px] lg:h-[300px] rounded-lg sm:rounded-xl object-cover mx-auto sm:mx-0"
        />
        <div className="flex flex-col p-2 w-full sm:w-2/3 space-y-1 sm:space-y-2 items-start justify-start">
          <h2 className="font-bold text-lg sm:text-xl lg:text-2xl">{userData.name}</h2>
          <h3 className="text-gray-500 text-sm sm:text-base">@{userData.name}</h3>
          <p className="text-gray-500 text-sm sm:text-base">{userData.email}</p>
          <p className="text-gray-500 text-xs sm:text-sm">
            Last online {userData.last_activity}
          </p>
        </div>
      </Card>

      {/* Akun Pendaftar Terkelola */}
      <Heading title="Akun Pendaftar Terkelola" />
      
      {/* Jumlah Akun */}
      <div className="w-full">
        <Button 
          variant="green" 
          className="w-full rounded-lg text-white text-sm sm:text-base py-2 sm:py-3"
        >
          {managerData.managed_accounts} Akun
        </Button>
      </div>

      {/* Kelola Akun */}
      <Heading title="Kelola Akun" />
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:justify-center">
        {/* <Button 
          variant="green" 
          className="rounded-lg w-full sm:w-1/2 lg:w-1/4 text-sm sm:text-base py-2 sm:py-3"
        >
          Perbarui Akun
        </Button> */}
        
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
                Apakah Anda yakin ingin menghapus akun <strong>{userData.name}</strong>? Tindakan
                ini tidak dapat dibatalkan.
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