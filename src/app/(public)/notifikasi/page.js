import { Card } from "@/components/ui/card";

const notifikasi = [
  {
    title: "Accepted Verification",
    message:
      "Data diri anda sudah terverifikasi oleh admin atau manajer, menunggu verifikasi berikutnya.",
  },
  {
    title: "Rejected Verification",
    message:
      "Data anda sudah terverifikasi oleh admin atau manager, mohon melakukan pengecekan ulang sesuai dengan catatan admin atau menager yakni: ",
  },
  {
    title: "Perubahan Status Akun",
    message:
      "Akun Anda sudah terverifikasi oleh admin atau manajer dan memasuki status rejected, mohon lakukan pengecekan ulang data berikut.",
  },
  {
    title: "Verifikasi Data Diri",
    message:
      "Data diri anda sudah terverifikasi oleh admin atau manajer, menunggu verifikasi berikutnya.",
  },
];

export default function Notification() {
  return (
    <div className="flex flex-col items-center py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-12 w-full max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 md:mb-8 w-full border-b border-gray-300 pb-3 md:pb-4 text-[var(--green)]">
        Notifikasi
      </h2>
      <div className="flex flex-col gap-4 md:gap-6 w-full">
        {notifikasi.map((item, index) => (
          <Card
            key={`notifikasi-${index}`}
            className="p-4 md:p-5 lg:p-6 flex flex-col gap-2 md:gap-3 shadow-sm hover:shadow-md transition-shadow"
          >
            <h1 className="font-bold text-lg sm:text-xl lg:text-2xl text-[var(--green)] break-words">
              {item.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed break-words">
              {item.message}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
