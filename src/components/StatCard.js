import { Card } from "@/components/ui/card";

export function StatCard({ value, label, color = "text-gray-600" }) {
  return (
    <>
      <Card className="flex items-center justify-center p-6 flex-col w-full stroke-black gap-2 h-[160px] border border-black shadow-lg hover:shadow-xl transition-shadow duration-300">
        <span className={`font-bold text-4xl ${color}`}>{value}</span>
        <span className="text-lg text-gray-500">{label}</span>
      </Card>
    </>
  );
}
