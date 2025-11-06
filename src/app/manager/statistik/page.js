import { ChartPieLegend } from "@/components/dashboard/ChartPieLegend";
import { Button } from "@/components/ui/button";

export default function Statistika() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center px-4 sm:px-8 max-w-11/12 mt-12 w-full">
        <h2
          className="text-3xl sm:text-2xl font-semibold mb-6 mt-6 border-b-2 border-black pb-2 text-[var(--green)] w-full"
          id="#pendaftar"
        >
          Statistik
        </h2>
        <ChartPieLegend />
        <h2 className="text-3xl sm:text-2xl font-semibold mb-6 mt-6 border-b-2 border-black pb-2 text-[var(--green)] w-full">
          Deskripsi Statistik
        </h2>

        <p>
          Dari data tersebut dapat disimpulkan bahwa semua mahasiswa dinyatakan
          lulus.
        </p>
      </div>
    </div>
  );
}
