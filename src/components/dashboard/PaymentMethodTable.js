"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeletePaymentMethod } from "@/hooks/usePaymentMethod";
import Link from "next/link";
import { Trash2, Eye } from "lucide-react";

export function PaymentMethodTable({ data }) {
  const { mutate: deletePayment, isLoading } = useDeletePaymentMethod();

  if (isLoading) return <div>Loading...</div>;

  const onDelete = (id) => {
    deletePayment(id);
  };

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <Table className="w-full text-sm">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-center">ID</TableHead>
              <TableHead className="w-[150px]">Nama Penerima</TableHead>
              <TableHead>Nomor Rekening</TableHead>
              <TableHead className="w-[200px]">Nama Bank</TableHead>
              <TableHead>Lihat</TableHead>
              <TableHead className="w-[100px] text-center">Hapus</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((payment, index) => (
              <TableRow key={payment.id}>
                <TableCell className="text-center font-medium">
                  {index + 1}
                </TableCell>
                <TableCell>{payment.account_holder}</TableCell>
                <TableCell>{payment.account_number}</TableCell>
                <TableCell>{payment.bank_name}</TableCell>
                <TableCell>
                  <Link
                    href={`/dashboard/edit/pembayaran/detail?id=${payment.id}`}
                  >
                    <Button variant="yellow">Lihat</Button>
                  </Link>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(payment.id)}
                    className="text-xs font-medium"
                    disabled={isLoading}
                  >
                    Hapus
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {data.map((payment, index) => (
          <div
            key={payment.id}
            className="border rounded-lg p-4 space-y-3 bg-white shadow-sm"
          >
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-xs font-semibold text-gray-500">
                #{index + 1}
              </span>
              <span className="text-sm font-bold">{payment.bank_name}</span>
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-xs text-gray-500">Nama Penerima</span>
                <p className="text-sm font-medium">{payment.account_holder}</p>
              </div>

              <div>
                <span className="text-xs text-gray-500">Nomor Rekening</span>
                <p className="text-sm font-medium">{payment.account_number}</p>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Link
                href={`/dashboard/edit/pembayaran/detail?id=${payment.id}`}
                className="flex-1"
              >
                <Button variant="yellow" className="w-full" size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  Lihat
                </Button>
              </Link>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(payment.id)}
                disabled={isLoading}
                className="flex-1"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Hapus
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
