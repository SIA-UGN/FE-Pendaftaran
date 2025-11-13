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

  // console.log(managers);

  // const manager = user.find((mgr) => mgr.id === Number(managerId));

  // console.log(manager);

  return (
    <div className="flex flex-col items-center px-4 sm:px-8 max-w-11/12 my-12 w-full gap-3 mx-auto">
      {/* Akun Manajer */}
      <Heading title={"Akun Manajer"} variant="first" />
      {/* Profile Picture, Full Name, Username, Email, Last Online */}
      <Card className="w-full flex flex-col sm:flex-row gap-6 p-8 rounded-2xl shadow-md bg-[var(--light-cream)]/50">
        <Image
          alt="Profile banner Faradis Yulianto"
          src={userData.avatar_url}
          width={180}
          height={300}
          className="w-full sm:w-1/4 h-[300px] rounded-xl object-cover"
        />
        <div className="flex flex-col p-2 w-full sm:w-2/3 space-y-1 items-start">
          <h2 className="font-bold text-xl">{userData.name}</h2>
          <h3 className="text-gray-500">@{userData.name}</h3>
          <p className="text-gray-500">{userData.email}</p>
          <p className="text-gray-500 text-sm">
            Last online {userData.last_activity}
          </p>
        </div>
      </Card>

      {/* Akun Pendaftar Terkelola */}
      <Heading title={"Akun Pendaftar Terkelola"} />
      {/* Jmlah Akun */}
      <div className="w-full">
        <Button variant={"green"} className={"w-full rounded-md text-white"}>
          {managerData.managed_accounts} Akun
        </Button>
      </div>
      {/* Kelola Akun */}
      <h2 className="text-3xl sm:text-2xl font-semibold mb-2 mt-6 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)]">
        Kelola Akun
      </h2>
      {/* Perbarui Akun */}

      {/* Hapus Akun */}
      <div className="flex gap-2 w-full justify-center">
        <Button variant={"green"} className={"rounded-md w-1/2 md:w-1/4"}>
          Perbarui Akun
        </Button>
        <AlertDialog open={open} onOpenChange={setOpen}>
          {/* Trigger button */}
          <AlertDialogTrigger asChild>
            <Button
              className="rounded-md w-1/2 md:w-1/4 bg-red-600 hover:bg-red-700"
              disabled={deleteLoading}
            >
              Hapus Akun
            </Button>
          </AlertDialogTrigger>

          {/* Confirmation dialog */}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus Manager</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus akun <strong>{userData.name}</strong>? Tindakan
                ini tidak dapat dibatalkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Batal
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={() => {
                        deleteManager(manager.id, {
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
