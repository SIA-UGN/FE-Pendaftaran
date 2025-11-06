import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Profile() {
  return (
    <div className="flex flex-col items-center px-4 sm:px-8 max-w-11/12 my-12 w-full gap-3 mx-auto">
      {/* Akun Manajer */}
      <h2 className="text-3xl sm:text-2xl font-semibold mb-2 mt-6 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)]">
        Akun Manajer
      </h2>
      {/* Profile Picture, Full Name, Username, Email, Last Online */}
      <Card className="w-full flex flex-col sm:flex-row gap-6 p-8 rounded-2xl shadow-md bg-white">
        <Image
          alt="Profile banner Faradis Yulianto"
          src="/logo.jpg"
          width={180}
          height={300}
          className="w-full sm:w-1/4 h-[300px] rounded-xl object-cover"
        />
        <div className="flex flex-col p-2 w-full sm:w-2/3 space-y-1 items-start">
          <h2 className="font-bold text-xl">Faradis Yulianto</h2>
          <h3 className="text-gray-500">@faradisy20</h3>
          <p className="text-gray-500">faradisy20@gmail.com</p>
          <p className="text-gray-500 text-sm">Last online 7 days ago</p>
        </div>
      </Card>

      {/* Akun Pendaftar Terkelola */}
      <h2 className="text-3xl sm:text-2xl font-semibold mb-2 mt-6 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)]">
        Akun Pendaftar Terkelola
      </h2>
      {/* Jmlah Akun */}
      <div className="w-full">
        <Button variant={"green"} className={"w-full rounded-md"} disabled>
          14 Akun
        </Button>
      </div>
      {/* Kelola Akun */}
      <h2 className="text-3xl sm:text-2xl font-semibold mb-2 mt-6 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)]">
        Kelola Akun
      </h2>
      {/* Perbarui Akun */}

      {/* Hapus Akun */}
      <div className="flex gap-2 w-full justify-center">
        <Button variant={"green"} className={"rounded-md w-1/4"}>
          Perbarui Akun
        </Button>
        <Button variant={"green"} className={"rounded-md w-1/4"}>
          Hapus Akun
        </Button>
      </div>
    </div>
  );
}
