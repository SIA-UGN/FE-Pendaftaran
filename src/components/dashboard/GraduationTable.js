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

export function GraduationTable({ data, type }) {
  console.log(data);

  return (
    <>
      {/* Desktop View - Table */}
      <div className="hidden md:block">
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
                      applicant.graduation_status === "graduated"
                        ? "bg-green-100 text-green-700"
                        : applicant.graduation_status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {applicant.graduation_status}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <Link
                    href={
                      type == "manager"
                        ? `/manager/verification?id=${applicant.id}`
                        : `/dashboard/verification?id=${applicant.id}`
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
      </div>

      {/* Mobile View - Cards */}
      <div className="md:hidden space-y-4 p-4">
        {data.map((applicant) => (
          <div
            key={applicant.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <div className="space-y-3">
              {/* ID & Registration Number */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-gray-500 mb-1">ID Peserta</p>
                  <p className="font-semibold text-sm">{applicant.user_id}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-1">Nomor Peserta</p>
                  <p className="font-medium text-sm">
                    {applicant.registration_number}
                  </p>
                </div>
              </div>

              {/* Name */}
              <div>
                <p className="text-xs text-gray-500 mb-1">Nama Peserta</p>
                <p className="font-medium text-base">{applicant.user.name}</p>
              </div>

              {/* Status */}
              <div>
                <p className="text-xs text-gray-500 mb-2">Status Kelulusan</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    applicant.graduation_status === "graduated"
                      ? "bg-green-100 text-green-700"
                      : applicant.graduation_status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {applicant.graduation_status}
                </span>
              </div>

              {/* Action Button */}
              <Link
                href={
                  type == "manager"
                    ? `/manager/verification?id=${applicant.id}`
                    : `/dashboard/profile?id=${applicant.id}`
                }
                className="block"
              >
                <Button
                  variant="yellow"
                  className="w-full text-sm font-medium text-[var(--green)] hover:bg-[var(--green)] hover:text-white transition-all rounded-md"
                >
                  {type == "manager" ? "Verifikasi" : "Lihat"}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}