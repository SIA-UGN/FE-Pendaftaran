"use client";

import { Card } from "@/components/ui/card";

export function MajorTable({ top_programs }) {
  if (!top_programs || top_programs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center text-gray-600">
        <p className="text-base sm:text-lg font-medium px-4">
          Belum ada prodi pendaftar terdata.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-0">
      <div className="space-y-2 sm:space-y-3">
        {top_programs.map((major, index) => (
          <Card
            key={index}
            className="flex flex-row justify-between items-center rounded-lg sm:rounded-xl 
            shadow-md hover:shadow-lg sm:hover:shadow-xl
            px-3 sm:px-5 lg:px-6 
            py-2.5 sm:py-3 lg:py-4 
            text-xs sm:text-sm lg:text-base font-medium 
            bg-gradient-to-t from-[#FBF8ED] via-[#EEDFAC] to-[#DABC4E] 
            border border-yellow-300 
            transition-all duration-300 
            hover:scale-[1.01] active:scale-[0.99]
            w-full"
          >
            {/* Left side: Rank & Program Name */}
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-1 min-w-0">
              <span>{index + 1}</span>
              <span className="text-gray-800 font-bold text-sm sm:text-base lg:text-lg 
              w-4 sm:w-5 lg:w-6 text-center flex-shrink-0">
                {major.rank}
              </span>
              <span className="text-gray-900 font-medium truncate sm:whitespace-normal 
              text-xs sm:text-sm lg:text-base leading-tight sm:leading-normal">
                {major.program}
              </span>
            </div>

            {/* Right side: Count */}
            <span className="text-gray-800 font-semibold text-right whitespace-nowrap 
            text-xs sm:text-sm lg:text-base ml-2 sm:ml-4 flex-shrink-0">
              <span className="hidden xs:inline">{major.count} pendaftar</span>
              <span className="inline xs:hidden">{major.count} pendaftar</span>
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}