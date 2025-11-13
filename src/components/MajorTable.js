"use client";

import { Card } from "@/components/ui/card";

export function MajorTable({ top_programs }) {
  if (!top_programs || top_programs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-gray-600">
        <p className="text-lg font-medium">Belum ada prodi pendaftar terdata.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto space-y-3 w-full max-w-5xl px-2 sm:px-0">
      {top_programs.map((major, index) => (
        <Card
          key={index}
          className={`flex flex-col sm:flex-row justify-between items-center rounded-xl shadow-md 
          px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium 
          bg-gradient-to-t from-[#FBF8ED] via-[#EEDFAC] to-[#DABC4E] 
          border border-yellow-300 w-full md:shadow-xl transition-all duration-300 
          hover:shadow-2xl hover:scale-[1.01] `}
        >
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-gray-800 font-semibold w-5 text-right">
              {major.rank}
            </span>
            <span className="text-gray-900">{major.program}</span>
          </div>

          <span className="text-gray-800 font-semibold mt-2 sm:mt-0 sm:text-right w-full sm:w-auto">
            {major.count} pendaftar
          </span>
        </Card>
      ))}
    </div>
  );
}
