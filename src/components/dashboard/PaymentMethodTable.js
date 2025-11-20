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

export function PaymentMethodTable({ data }) {
  const { mutate: deletePayment, isLoading } = useDeletePaymentMethod();

  if (isLoading) return <div>Loading...</div>;

  const onDelete = (id) => {
    deletePayment(id); // ✔ kirim langsung id
  };

  return (
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
              <Link href={`/dashboard/edit/pembayaran/detail?id=${payment.id}`}>
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
  );
}
