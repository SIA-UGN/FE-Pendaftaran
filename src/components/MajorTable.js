"use client";

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
          <div
            key={index}
            className="flex flex-row justify-between items-center px-3 sm:px-5 lg:px-6 py-2.5 sm:py-3 lg:py-4 text-xs sm:text-sm lg:text-base font-medium transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] w-full"
            style={{
              borderRadius: '12px',
              background: 'linear-gradient(to top, #E6EEE9, #D9E5DE, #DABC4E)',
              border: '1px solid #DABC4E',
              boxShadow: '0 2px 8px rgba(1,80,35,0.08)',
            }}
          >
            {/* Left side: Rank & Program Name */}
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-1 min-w-0">
              <span className="font-bold text-sm w-5 text-center flex-shrink-0" style={{ color: '#015023' }}>
                {index + 1}
              </span>
              <span className="text-gray-900 font-medium truncate sm:whitespace-normal text-xs sm:text-sm lg:text-base leading-tight sm:leading-normal">
                {major.program}
              </span>
            </div>

            {/* Right side: Count */}
            <span className="font-semibold text-right whitespace-nowrap text-xs sm:text-sm lg:text-base ml-2 sm:ml-4 flex-shrink-0" style={{ color: '#015023' }}>
              {major.count} pendaftar
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
