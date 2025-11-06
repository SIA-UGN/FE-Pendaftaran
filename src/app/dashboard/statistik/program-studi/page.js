import { Card } from "@/components/ui/card";
import { ChartPieLegend } from "@/components/dashboard/ChartPieLegend";

export default function Page() {
  return (
    <div className="flex flex-col items-center px-4 sm:px-8 max-w-11/12 my-12 w-full gap-3 mx-auto">
      <h2 className="text-3xl sm:text-2xl font-semibold mb-8 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)] mt-12">
        Program Studi
      </h2>
      <ChartPieLegend />

      <h2 className="text-3xl sm:text-2xl font-semibold mb-8 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)] mt-12">
        Rincian
      </h2>

      <div className="grid grid-cols-1 w-10/12 gap-12">
        <Card className="flex items-center justify-center p-6 flex-col w-full stroke-black gap-2">
          <span className="font-bold text-4xl text-[var(--green)]">80</span>
          <span className="text-lg text-gray-500">Lulus</span>
        </Card>
        <Card className="flex items-center justify-center p-6 flex-col w-full stroke-black gap-2">
          <span className="font-bold text-4xl text-[var(--green)]">80</span>
          <span className="text-lg text-gray-500">Lulus</span>
        </Card>
        <Card className="flex items-center justify-center p-6 flex-col w-full stroke-black gap-2">
          <span className="font-bold text-4xl text-[var(--green)]">30</span>
          <span className="text-lg text-gray-500">Ditolak</span>
        </Card>
      </div>
    </div>
  );
}
