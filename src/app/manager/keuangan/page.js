import { Button } from "@/components/ui/button";
import { Heading } from "@/components/Heading";

const InfoCard = ({ title, description }) => (
  <div
    className="flex flex-col gap-2 w-full px-12 py-6"
    style={{ backgroundColor: '#ffffff', border: '1px solid #E6EEE9', borderRadius: '16px' }}
  >
    <h1 className="font-bold text-lg" style={{ color: '#015023' }}>{title}</h1>
    <p className="text-gray-500">{description}</p>
  </div>
);

export default function Keuangan() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center px-4 sm:px-8 max-w-11/12 mt-12 w-full gap-6 pb-12">
          <Heading title={"Keuangan"} />
          <div
            className="flex items-center justify-center p-6 flex-col w-1/2 gap-2 h-[160px] m-auto"
            style={{ backgroundColor: '#ffffff', border: '2px solid #015023', borderRadius: '16px' }}
          >
            <span className="font-bold text-4xl" style={{ color: '#015023' }}>
              Rp3.000.000
            </span>
            <span className="text-lg text-gray-500">Total Income</span>
          </div>

          <Heading title={"Recent Income"} />
          <InfoCard title="Accepted Verification" description="Data diri anda sudah terverifikasi oleh admin atau manajer, menunggu verifikasi berikutnya." />
          <InfoCard title="Rejected Verification" description="Data akademik anda sudah oleh admin atau manajer, mohon melakukan pengecekan ulang sesuai dengan catatan admin atau manajer, yakni: ..." />
          <InfoCard title="Perubahan Status Akun" description="Akun anda sudah terverifikasi oleh admin atau manajer dan memasuki status rejected, mohon lakukan pengecekan ulang data berikut : Data Akademik" />
          <InfoCard title="Verifikasi Data Diri" description="Data diri anda sudah terverifikasi oleh admin atau manajer, menunggu verifikasi berikutnya." />
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
