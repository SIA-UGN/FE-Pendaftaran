"use client";

import { Card } from "@/components/ui/card";

const majors = [
  {
    rank: 1,
    name: "Teknik Informatika",
    applicants: 504,
  },
  {
    rank: 2,
    name: "Ilmu Komputer",
    applicants: 430,
  },
  {
    rank: 3,
    name: "Sistem Informasi",
    applicants: 201,
  },
];

export function MajorTable() {
  return (
    <div className="mx-auto space-y-2 w-full">
      <Card
        className={`flex justify-between items-center rounded-xl shadow-sm px-4 py-5 text-sm font-medium bg-gradient-to-r from-yellow-300 to-yellow-200 border-2 w-full`}
      >
        {majors.map((major, index) => (
          <div className="flex w-full justify-between" key={index}>
            <div className="flex items-center gap-3">
              <span className="text-gray-800 font-semibold w-5 text-right">
                {major.rank}
              </span>
              <span className="text-gray-900">{major.name}</span>
            </div>
            <span className="text-gray-800">{major.applicants} pendaftar</span>
          </div>
        ))}
      </Card>
    </div>
  );
}
