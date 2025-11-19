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

import Link from "next/link";

export function ApplicantTable({ data, type }) {
  // const data = Data.data;
  // const pagination = data.pagination;

  console.log(data);
  // console.log(pagination);
  console.log(type);

  return (
    <Table className="w-full text-sm">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60px] text-center">ID</TableHead>
          <TableHead className="w-[150px] text-center">Nomor Peserta</TableHead>
          <TableHead>Nama Peserta</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">
            {type == "manager" ? "Verifikasi" : "Lihat"}
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((applicant) => (
          <TableRow key={applicant.id}>
            <TableCell className="text-center font-medium">
              {applicant.user_id}
            </TableCell>
            <TableCell className="text-center">
              {applicant.registration_number}
            </TableCell>
            <TableCell>{applicant.user.name}</TableCell>
            <TableCell className="text-center">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  applicant.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : applicant.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {applicant.status}
              </span>
            </TableCell>
            <TableCell className="text-center">
              <Link
                href={
                  type == "manager"
                    ? `/manager/verification?id=${applicant.id}`
                    : `/dashboard/profile?id=${applicant.id}`
                }
              >
                <Button
                  variant="yellow"
                  className="text-sm font-medium text-[var(--green)] hover:bg-[var(--green)] hover:text-white transition-all rounded-md"
                >
                  {type == "manager" ? "Verifikasi" : "Lihat"}
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
