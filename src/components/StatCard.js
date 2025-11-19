import { Card } from "@/components/ui/card";

export function StatCard({ value, label, color = "text-gray-600" }) {
  return (
    <Card className="flex items-center justify-center p-4 sm:p-5 lg:p-6 flex-col w-full stroke-black gap-2 h-[120px] sm:h-[140px] lg:h-[160px] border border-black shadow-lg hover:shadow-xl transition-shadow duration-300">
      <span className={`font-bold text-2xl sm:text-3xl lg:text-4xl ${color}`}>
        {value}
      </span>
      <span className="text-sm sm:text-base lg:text-lg text-gray-500 text-center">
        {label}
      </span>
    </Card>
  );
}