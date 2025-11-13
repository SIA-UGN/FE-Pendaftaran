"use client";

import { useSearchParams } from 'next/navigation';

import Image from "next/image";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/Heading";
import Link from "next/link";

const applicants = [
  {
    id: 1,
    number: "1700325147831124",
    name: "Fahmi Rahman",
    username: "fahmi.rahman",
    email: "fahmi@gmail.com",
    major: "Teknologi Informasi",
    status: "Approved",
    kelulusan: "Lulus",
    nominal: "Rp500.000,-",
  },
  {
    id: 2,
    number: "1700325147831124",
    name: "Faradis Nurul",
    status: "Pending",
    username: "faradis.nurul",
    email: "faradis@gmail.com",
    major: "Sistem Informasi",
    kelulusan: "Lulus",
    nominal: "Rp500.000,-",
  },
  {
    id: 3,
    number: "1700325147831124",
    name: "Khay Pratama",
    status: "Rejected",
    username: "khay.pratama",
    email: "khay@gmail.com",
    major: "Teknik Komputer",
    kelulusan: "Tidak Lulus",
    nominal: "Rp0,-",
  },
  {
    id: 4,
    number: "1700325147831124",
    name: "Riris Anjani",
    status: "Approved",
    username: "riris.anjani",
    email: "ririsanjani@gmail.com",
    major: "Desain Komunikasi Visual",
    kelulusan: "Lulus",
    nominal: "Rp500.000,-",
  },
];



export default function Profile() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const applicant = applicants.find(applicant => applicant.id === parseInt(id));

  if (!applicant) {
    return <div>Applicant not found</div>;
  }

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
          <h2 className="font-bold text-xl">{applicant.name}</h2>
          <h3 className="text-gray-500">{applicant.username}</h3>
          <p className="text-gray-500">{applicant.email}</p>
          <p className="text-gray-500 text-sm">{applicant.major}</p>
        </div>
      </Card>
      {/* Status Verifikasi Pendaftar */}
      <Heading title={"Status Verifikasi Pendaftar"} />
      <div className="w-full">
        <Button variant={applicant.status === "Approved" ? (`green`) : (`destructive`)} className={"w-full rounded-lg"}>
          {applicant.status}
        </Button>
      </div>
      {/* Status Kelulusan Pendaftar */}
      <Heading title={"Status Kelulusan Pendaftar"} />
      <div className="w-full">
        <Button variant={applicant.kelulusan === "Lulus" ? (`green`) : (`destructive`)}  className={"w-full rounded-lg"}>
          {applicant.kelulusan}
        </Button>
      </div>
      {/* Nominal Masuk */}
      <Heading title={"Nominal Masuk"} />

      <div className="w-full">
        <Button variant={applicant.nominal === "Rp500.000,-" ? (`green`) : (`destructive`)} className={"w-full rounded-lg"}>
          {applicant.nominal}
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
