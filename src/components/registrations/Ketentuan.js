import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/Heading";

export default function Ketentuan() {
  return (
    <div className="flex flex-col items-center pt-4 pb-6 max-w-11/12 w-full">
      <Heading title="Ketentuan" />
      <div className="flex gap-5 w-full">
        <Card className="p-5">
          <ul className="list-disc list-inside space-y-4 text-gray-700 leading-relaxed">
            <li>
              Satu NIK hanya dapat dipakai untuk membuat satu akun pendaftaran.
              Pastikan Saudara memasukkan NIK yang benar, bukan Nomor Kartu
              Keluarga.
            </li>
            <li>
              Saudara wajib mempunyai email untuk membuat akun Peserta Seleksi
              Calon Mahasiswa Baru di Universitas Global Nusantara.
            </li>
            <li>
              Email yang dipergunakan untuk membuat akun merupakan email
              personal yang aktif karena semua komunikasi seleksi akan dilakukan
              melalui email tersebut.
            </li>
            <li>
              Satu alamat email hanya dapat digunakan untuk satu kali pembuatan
              akun Peserta Seleksi Calon Mahasiswa Baru di Universitas Global
              Nusantara.
            </li>
            <li>
              Satu akun pendaftaran hanya dapat digunakan untuk mendaftar pada
              satu intake pada satu periode pendaftaran yang sama. Saudara dapat
              menggunakan akun yang sama untuk periode berbeda.
            </li>
            <li>
              Password adalah kunci untuk mengakses akun Peserta Seleksi Calon
              Mahasiswa Baru di Universitas Global Nusantara dan terdiri dari
              minimal 6 karakter angka, huruf, atau kombinasi keduanya.
            </li>
            <li>
              Proses pengisian data pendaftaran dan unggah dokumen dapat
              dilakukan secara bertahap selama belum dilakukan penguncian data
              pendaftaran.
            </li>
            <li>
              Apabila ada kendala dalam pengisian, silakan menghubungi
              <span className="font-semibold"> WA: 0811-234-1949 </span> atau
              email ke{" "}
              <a
                href="mailto:ugn@ugn.ac.id"
                className="text-green-600 hover:underline"
              >
                ugn@ugn.ac.id
              </a>{" "}
              atau program studi tujuan Saudara.
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
