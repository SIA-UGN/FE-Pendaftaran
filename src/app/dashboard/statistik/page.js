import { ChartPieApplicant } from "@/components/dashboard/ChartPieApplicant";

export default function Statistika() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center px-4 sm:px-8 max-w-11/12 mt-12 w-full">
        <h2 className="text-3xl sm:text-2xl font-semibold mb-6 mt-6 pb-2 w-full" style={{ borderBottom: '2px solid #DABC4E', color: '#015023' }}>
          Statistik
        </h2>
        <ChartPieApplicant />
        <h2 className="text-3xl sm:text-2xl font-semibold mb-6 mt-6 pb-2 w-full" style={{ borderBottom: '2px solid #DABC4E', color: '#015023' }}>
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
