import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function ApplicantAnnouncement({ status }) {
  return (
    <Card className="w-full flex flex-col sm:flex-row gap-6 p-8 rounded-2xl shadow-md">
      <Image
        alt="Profile banner Faradis Yulianto"
        src="/logo.jpg"
        width={180}
        height={300}
        className="w-full sm:w-1/4 h-[260px] rounded-xl object-cover"
      />
      <div className="flex flex-col p-2 w-full sm:w-2/3 space-y-1 items-start">
        <h2 className="font-bold text-xl text-[var(--green)]">
          Faradis Yulianto
        </h2>
        <p className="text-gray-500">1234567890</p>

        <h3 className="text-gray-500">@faradisy20</h3>
        <p className="text-gray-500">faradisy20@gmail.com</p>
        <p className="text-gray-500">Teknik Informatika</p>
        <p
          className={`mt-auto px-4 py-2 rounded-lg font-bold text-white ${
            status === "Lulus" ? "bg-[var(--green)]" : "bg-red-500"
          }`}
        >
          {status}
        </p>
      </div>
    </Card>
  );
}
