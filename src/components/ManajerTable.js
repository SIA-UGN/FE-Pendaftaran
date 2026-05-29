"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteManager } from "@/hooks/useAdmin";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateUser } from "@/hooks/useAdmin";
import { ArrowUpDown, Eye, Trash2, Edit } from "lucide-react";

export function ManajerTable({ data }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [deleteId, setDeleteId] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const {
    mutate: deleteManager,
    isLoading: deleteLoading,
    isError: deleteIsError,
    error: deleteError,
  } = useDeleteManager();

  // Inline edit dialog component (per-row)
  function InlineEditDialog({ manager }) {
    const updateUser = useUpdateUser();
    const [open, setOpen] = useState(false);

    const schema = z
      .object({
        name: z.string().min(2, { message: "Nama harus diisi" }),
        email: z.string().email({ message: "Email tidak valid" }),
        newPassword: z.string().optional(),
      })
      .superRefine((vals, ctx) => {
        if (
          vals.newPassword &&
          vals.newPassword.length > 0 &&
          vals.newPassword.length < 8
        ) {
          ctx.addIssue({
            path: ["newPassword"],
            message: "Password minimal 8 karakter",
            code: z.ZodIssueCode.custom,
          });
        }
      });

    const form = useForm({
      resolver: zodResolver(schema),
      defaultValues: {
        name: manager.name || "",
        email: manager.email || "",
        newPassword: "",
      },
    });

    async function handleSubmit(values) {
      const payload = {
        name: values.name,
        email: values.email,
      };
      if (values.newPassword && values.newPassword.length > 0) {
        payload.password = values.newPassword;
        payload.password_confirmation = values.newPassword;
      }
      try {
        await updateUser.mutateAsync({ id: manager.id_user, data: payload });
        setOpen(false);
      } catch (err) {}
    }

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="ghost" className="ml-2">
            Edit Cepat
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Manajer</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Nama</label>
              <input
                className="w-full border rounded px-3 py-2"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                className="w-full border rounded px-3 py-2"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                className="w-full border rounded px-3 py-2"
                {...form.register("newPassword")}
              />
              {form.formState.errors.newPassword && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.newPassword.message}
                </p>
              )}
            </div>

            <DialogFooter>
              <div className="flex gap-2 justify-end w-full">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Batal
                </Button>
                <Button type="submit" disabled={updateUser.isLoading}>
                  {updateUser.isLoading ? "Menyimpan..." : "Simpan"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  const columns = [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button variant="ghost" className="w-full" style={{ color: "white" }}>
            No
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center font-medium">{row.index + 1}</div>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return <Button variant="ghost" style={{ color: "white" }}>Nama</Button>;
      },
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            style={{ color: "white" }}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      id: "lihat",
      header: () => <div className="text-center">Lihat</div>,
      cell: ({ row }) => {
        const manager = row.original;
        return (
          <div className="text-center flex items-center justify-center gap-2">
            <Link href={`/dashboard/manajer/profile?id=${manager.id_user}`}>
              <Button
                size="sm"
                variant="yellow"
                className="text-[var(--green)] hover:bg-[var(--green)] hover:text-white transition-all"
              >
                <Eye className="w-4 h-4 mr-1" />
                Lihat
              </Button>
            </Link>
          </div>
        );
      },
    },
    {
      id: "edit",
      header: () => <div className="text-center">Edit</div>,
      cell: ({ row }) => {
        const manager = row.original;
        return (
          <div className="text-center flex items-center gap-2 justify-center">
            <Link href={`/dashboard/manajer/edit?id=${manager.id_user}`}>
              <Button
                size="sm"
                variant="yellow"
                className="text-[var(--green)] hover:bg-[var(--green)] hover:text-white transition-all"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </Link>

            {/* Quick edit modal */}
            <InlineEditDialog manager={manager} />
          </div>
        );
      },
    },
    {
      id: "hapus",
      header: () => <div className="text-center">Hapus</div>,
      cell: ({ row }) => {
        const manager = row.original;
        return (
          <div className="text-center">
            <Button
              size="sm"
              variant="destructive"
              className="hover:opacity-90 transition-all"
              disabled={deleteLoading}
              onClick={() => {
                setDeleteId(manager.id_user);
                setOpen(true);
              }}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Hapus
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const handleDelete = () => {
    if (deleteId) {
      deleteManager(deleteId, {
        onSuccess: () => {
          setOpen(false);
          setDeleteId(null);
        },
      });
    }
  };

  const selectedManager = data.find((m) => m.id_user === deleteId);

  return (
    <div className="w-full space-y-4">
      <div className="hidden md:block overflow-hidden rounded-md border">
        <Table>
          <TableHeader style={{ backgroundColor: "#015023" }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500"
                >
                  Tidak ada data yang dapat ditampilkan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden space-y-4">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row, index) => {
            const manager = row.original;
            return (
              <div
                key={row.id}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b">
                    <span className="bg-gray-100 text-gray-700 font-semibold text-sm px-3 py-1 rounded-full">
                      #{index + 1}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">Nama Manager</p>
                    <p className="font-medium text-base">{manager.name}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="text-sm text-gray-700">{manager.email}</p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Link
                      href={`/dashboard/manajer/profile?id=${manager.id_user}`}
                      className="flex-1"
                    >
                      <Button
                        variant="yellow"
                        className="w-full text-sm font-medium text-[var(--green)] hover:bg-[var(--green)] hover:text-white transition-all"
                      >
                        Lihat
                      </Button>
                    </Link>

                    <Link
                      href={`/dashboard/manajer/edit?id=${manager.id_user}`}
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        className="w-full text-sm hover:opacity-90 transition-all"
                      >
                        Edit
                      </Button>
                    </Link>

                    <Button
                      variant="destructive"
                      className="flex-1 text-sm hover:opacity-90 transition-all"
                      disabled={deleteLoading}
                      onClick={() => {
                        setDeleteId(manager.id_user);
                        setOpen(true);
                      }}
                    >
                      Hapus
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 py-6">
            Tidak ada data yang dapat ditampilkan
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4">
        <div className="text-sm text-gray-500">
          Menampilkan{" "}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}{" "}
          -{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          dari {table.getFilteredRowModel().rows.length} data
        </div>

        <div className="flex items-center gap-2 px-6 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <span className="text-sm">
            Halaman {table.getState().pagination.pageIndex + 1} dari{" "}
            {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Manager</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus akun{" "}
              <strong>{selectedManager?.name}</strong>? Tindakan ini tidak dapat
              dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                setDeleteId(null);
              }}
            >
              Batal
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
              disabled={deleteLoading}
            >
              {deleteLoading ? "Menghapus..." : "Hapus"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

