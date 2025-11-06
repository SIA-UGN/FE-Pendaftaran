import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Keuangan() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center px-4 sm:px-8 max-w-11/12 mt-12 w-full gap-6 pb-12">
          <h2 className="text-3xl sm:text-2xl font-semibold mb-6 mt-6 border-b-2 border-black pb-2 text-[var(--green)] w-full">
            Keuangan
          </h2>
          <Card className="flex items-center justify-center p-6 flex-col w-1/2 gap-2 h-[160px] m-auto">
            <span className="font-bold text-4xl text-[var(--green)]">
              Rp3.000.000
            </span>
            <span className="text-lg text-gray-500">Total Income</span>
          </Card>

          <h2 className="text-3xl sm:text-2xl font-semibold mb-6 mt-6 border-b-2 border-black pb-2 text-[var(--green)] w-full">
            Recent Income
          </h2>
          <Card className={"flex flex-col gap-2 w-full px-12 py-6"}>
            <h1 className="font-bold text-lg text-[var(--green)]">
              Accepted Verification
            </h1>
            <p className="text-gray-500">
              Data diri anda sudah terverifikasi oleh admin atau manajer,
              menunggu verifikasi berikutnya.
            </p>
          </Card>
          <Card className={"flex flex-col gap-2 w-full px-12 py-6"}>
            <h1 className="font-bold text-lg text-[var(--green)]">
              Rejected Verification
            </h1>
            <p className="text-gray-500">
              Data akademik anda sudah oleh admin atau manajer, mohon melakukan
              pengecekan ulang sesuai dengan catatan admin atau manajer, yakni:
              ...
            </p>
          </Card>
          <Card className={"flex flex-col gap-2 w-full px-12 py-6"}>
            <h1 className="font-bold text-lg text-[var(--green)]">
              Perubahan Status Akun
            </h1>
            <p className="text-gray-500">
              Akun anda sudah terverifikasi oleh admin atau manajer dan memasuki
              status rejected, mohon lakukan pengecekan ulang data berikut :
              Data Akademik
            </p>
          </Card>
          <Card className={"flex flex-col gap-2 w-full px-12 py-6"}>
            <h1 className="font-bold text-lg text-[var(--green)]">
              Verifikasi Data Diri
            </h1>
            <p className="text-gray-500">
              Data diri anda sudah terverifikasi oleh admin atau manajer,
              menunggu verifikasi berikutnya.
            </p>
          </Card>
          <div className="w-full flex items-center justify-end gap-2">
            <Button
              type="submit"
              variant={"matcha"}
              className={"w-48 rounded-md"}
            >
              Kembali
            </Button>
            <Button
              type="submit"
              variant={"matcha"}
              className={"w-48 rounded-md"}
            >
              Lanjut
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
