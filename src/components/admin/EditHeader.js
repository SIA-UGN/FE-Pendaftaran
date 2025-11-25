import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function EditHeader() {
  return (
    <div className="grid grid-cols-4 m-6 p-6 gap-6">
      <Link href="/dashboard/edit/pendaftaran/data-diri">
        <Card className={"flex text-center justify-center"}>
          Form Data Diri
        </Card>
      </Link>

      <Link href="/dashboard/edit/pendaftaran/data-alamat">
        <Card className={"flex text-center justify-center"}>
          Form Data Alamat
        </Card>
      </Link>

      <Link href="/dashboard/edit/pendaftaran/data-orangtua">
        <Card className={"flex text-center justify-center"}>
          Form Data Orang Tua/Wali
        </Card>
      </Link>

      <Link href="/dashboard/edit/pendaftaran/data-akademik">
        <Card className={"flex text-center justify-center"}>
          Form Data Akademik
        </Card>
      </Link>
    </div>
  );
}
