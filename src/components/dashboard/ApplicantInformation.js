import { Card } from "@/components/ui/card";
import ApplicantList from "@/components/dashboard/ApplicantList";
import { Heading } from "@/components/Heading";
import { StatCard } from "../StatCard";

export default function ApplicantInformation() {
  return (
    <>
      {/* Bagian Verifikasi Dokumen */}
      <div className="flex flex-col items-center px-3 sm:px-6 lg:px-8 max-w-[90rem] my-8 sm:my-12 w-full gap-3">
        <Heading title={"Data Verifikasi Dokumen Pendaftar"} />

        {/* Grid Statistik 3 Kolom */}
        <div
          className="
            grid w-full gap-6 sm:gap-8 lg:gap-12
            grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          "
        >
          <StatCard value={"80"} label={"Approved"} />
          <StatCard value={"30"} label={"Rejected"} />
          <StatCard value={"37"} label={"Pending"} />
        </div>

        {/* Daftar Pendaftar */}
        <div className="w-full mt-6 sm:mt-8">
          <ApplicantList />
        </div>
      </div>

      {/* Bagian Kelulusan */}
      <div className="flex flex-col items-center px-3 sm:px-6 lg:px-8 max-w-[90rem] my-8 sm:my-12 w-full gap-3">
        <Heading title="Data Kelulusan Pendaftar" />

        {/* Grid Statistik 2 Kolom */}
        <div
          className="
            grid w-full max-w-5xl gap-6 sm:gap-8 lg:gap-12
            grid-cols-1 sm:grid-cols-2
          "
        >
          <StatCard value={"80"} label={"Lulus"} />
          <StatCard value={"37"} label={"Tidak Lulus"} />
        </div>

        {/* Daftar Pendaftar */}
        <div className="w-full mt-6 sm:mt-8">
          <ApplicantList />
        </div>
      </div>
    </>
  );
}
