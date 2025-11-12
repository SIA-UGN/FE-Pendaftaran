import Image from "next/image";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/Heading";
import Link from "next/link";

export default function Profile() {
  return (
    <div className="flex flex-col items-center px-4 sm:px-8 max-w-11/12 my-12 w-full gap-3 mx-auto">
      {/* Akun Pendaftar */}
      <Heading title={"Akun Pendaftar"} variant="first"/>

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
      {/* Status Verifikasi Pendaftar */}
      <Heading title={"Status Verifikasi Pendaftar"} />
      <div className="w-full">
        <Button variant={"green"} className={"w-full rounded-lg"}>
          Approved
        </Button>
      </div>
      {/* Status Kelulusan Pendaftar */}
      <Heading title={"Status Kelulusan Pendaftar"} />
      <div className="w-full">
        <Button variant={"green"} className={"w-full rounded-lg"}>
          Lulus
        </Button>
      </div>
      {/* Nominal Masuk */}
      <Heading title={"Nominal Masuk"} />

      <div className="w-full">
        <Button variant={"yellow"} className={"w-full rounded-lg"}>
          Rp500.000,-
        </Button>
      </div>

      <Heading title={"Status Verifikasi Keuangan"} />

      <div className="w-3/4 grid grid-cols-2 gap-6 justify-center">
        <Button variant={"yellow"} className={"rounded-lg"}>
          Not Yet Verified
        </Button>
        <Link href={`/dashboard/verifikasi`}>
          <Button variant={"green"} className={"rounded-lg w-full"}>
            Verifikasi
          </Button>
        </Link>
      </div>



    </div>
  );
}
