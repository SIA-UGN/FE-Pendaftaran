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

const applicants = [
  {
    id: 1,
    number: "1700325147831124",
    name: "Fahmi Rahman",
    status: "Approved",
  },
  {
    id: 2,
    number: "1700325147831124",
    name: "Faradis Nurul",
    status: "Pending",
  },
  {
    id: 3,
    number: "1700325147831124",
    name: "Khay Pratama",
    status: "Rejected",
  },
  {
    id: 4,
    number: "1700325147831124",
    name: "Riris Anjani",
    status: "Approved",
  },
];

export function ApplicantTable({ Data }) {
  // const data = Data.data;
  const data = applicants;
  const pagination = data.pagination;

  console.log(data);
  console.log(pagination);

  return (
    <Table className="w-full text-sm">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60px] text-center">ID</TableHead>
          <TableHead className="w-[150px] text-center">Nomor Peserta</TableHead>
          <TableHead>Nama Peserta</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Lihat</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((applicant) => (
          <TableRow key={applicant.id}>
            <TableCell className="text-center font-medium">{applicant.id}</TableCell>
            <TableCell className="text-center">{applicant.number}</TableCell>
            <TableCell>{applicant.name}</TableCell>
            <TableCell className="text-center">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  applicant.status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : applicant.status === "Rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {applicant.status}
              </span>
            </TableCell>
            <TableCell className="text-center">
              <Link href={`/dashboard/profile?id=${applicant.id}`}>
              <Button
                variant="yellow"
                className="text-sm font-medium text-[var(--green)] hover:bg-[var(--green)] hover:text-white transition-all rounded-md"
              >
                Lihat
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
