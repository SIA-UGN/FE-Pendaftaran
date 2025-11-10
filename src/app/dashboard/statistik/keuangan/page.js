import { Card } from "@/components/ui/card";
import { ChartPieLegend } from "@/components/dashboard/ChartPieLegend";
import { ChartBarLabel } from "@/components/admin/BarChart";

export default function Page() {
  return (
    <div className="flex flex-col items-center px-4 sm:px-8 max-w-7xl my-12 w-full gap-8 mx-auto">
      {/* Heading Keuangan */}
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 w-full border-b border-gray-500 pb-2 text-[var(--green)] mt-8">
        Keuangan
      </h2>

      {/* Pie Chart */}
      <div className="w-full flex justify-center">
        <ChartPieLegend />
      </div>

      {/* Rincian */}
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 w-full border-b border-gray-500 pb-2 text-[var(--green)] mt-12">
        Rincian
      </h2>

      {/* Total Income */}
      <div className="grid w-full max-w-3xl gap-6 justify-items-center">
        <Card className="flex items-center justify-center p-6 flex-col w-full sm:w-3/4 md:w-full gap-2">
          <span className="font-bold text-2xl sm:text-3xl text-[var(--green)]">
            Rp412.000.000
          </span>
          <span className="text-base sm:text-lg text-gray-500">
            Total Income
          </span>
        </Card>
      </div>

      {/* Approved, Rejected, Pending */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-6 sm:gap-8 mt-6">
        <Card className="flex items-center justify-center p-6 flex-col w-full gap-2">
          <span className="font-bold text-3xl sm:text-4xl text-[var(--green)]">
            80
          </span>
          <span className="text-base sm:text-lg text-gray-500">Approved</span>
        </Card>
        <Card className="flex items-center justify-center p-6 flex-col w-full gap-2">
          <span className="font-bold text-3xl sm:text-4xl text-[var(--green)]">
            80
          </span>
          <span className="text-base sm:text-lg text-gray-500">Rejected</span>
        </Card>
        <Card className="flex items-center justify-center p-6 flex-col w-full gap-2">
          <span className="font-bold text-3xl sm:text-4xl text-[var(--green)]">
            30
          </span>
          <span className="text-base sm:text-lg text-gray-500">Pending</span>
        </Card>
      </div>

      {/* Yearly Income */}
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 w-full border-b border-gray-500 pb-2 text-[var(--green)] mt-12">
        Yearly Income
      </h2>

      <ChartBarLabel />

      <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-6 sm:gap-8">
        <Card className="flex items-center justify-center p-6 flex-col w-full gap-2">
          <span className="font-bold text-3xl sm:text-4xl text-[var(--green)]">
            Rp70.000.000
          </span>
          <span className="text-base sm:text-lg text-gray-500">Pemasukan Tahun Lalu</span>
        </Card>
        <Card className="flex items-center justify-center p-6 flex-col w-full gap-2">
          <span className="font-bold text-3xl sm:text-4xl text-[var(--green)]">
            10%
          </span>
          <span className="text-base sm:text-lg text-gray-500">Growth</span>
        </Card>
      </div>
    </div>
  );
}
