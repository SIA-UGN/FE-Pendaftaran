import { Card } from "@/components/ui/card";
import ApplicantList from "@/components/dashboard/ApplicantList";
import GraduationList from "@/components/dashboard/GraduationList";
import { Heading } from "@/components/Heading";
import { StatCard } from "../StatCard";
import { ApplicantTable } from "./ApplicantTable";

export default function ApplicantInformation({
  Approved,
  Rejected,
  Pending,
  Lulus,
  TidakLulus,
  VerificationTable,
  GraduationTable,
  type,
}) {
  console.log(VerificationTable.data);
  console.log(GraduationTable.data);
  console.log(`type : ${type}`);

  return (
    <div className="w-full">
      {/* Bagian Verifikasi Dokumen */}
      <section className="w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
          <Heading title={"Data Verifikasi Dokumen Pendaftar"} />

          {/* Grid Statistik 3 Kolom */}
          <div
            className="
              grid w-full gap-4 sm:gap-6 lg:gap-8 xl:gap-12
              grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
              mb-6 sm:mb-8 lg:mb-10
            "
          >
            <StatCard value={Approved} label={"Approved"} />
            <StatCard value={Rejected} label={"Rejected"} />
            <StatCard value={Pending} label={"Pending"} />
          </div>

          {/* Daftar Pendaftar */}
          <div className="w-full">
            {VerificationTable.data.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-sm sm:text-base text-gray-500 font-medium">
                    Tidak ada data pendaftar untuk ditampilkan.
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle px-0">
                  <ApplicantList data={VerificationTable} type={type} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full border-t border-gray-200"></div>

      {/* Bagian Kelulusan */}
      <section className="w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
          <Heading title="Data Kelulusan Pendaftar" />

          {/* Grid Statistik 2 Kolom */}
          <div
            className="
              grid w-full max-w-4xl mx-auto
              gap-4 sm:gap-6 lg:gap-8 xl:gap-12
              grid-cols-1 sm:grid-cols-2
              mb-6 sm:mb-8 lg:mb-10
            "
          >
            <StatCard value={Lulus} label={"Lulus"} />
            <StatCard value={TidakLulus} label={"Tidak Lulus"} />
          </div>

          {/* Daftar Kelulusan */}
          <div className="w-full">
            {GraduationTable.data.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                  <p className="text-sm sm:text-base text-gray-500 font-medium">
                    Tidak ada data kelulusan untuk ditampilkan.
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                  <GraduationList data={GraduationTable} type={type} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
