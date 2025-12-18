"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  Info,
  AlertCircle,
  XCircle,
  CheckCircle,
  Eye,
  X,
  ExternalLink,
  Download,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useManagerApplicantDetail } from "@/hooks/useManager";
import { useApplicantProfile } from "@/hooks/useAdmin";
import DocumentPreviewDialog from "@/components/manager/DocumentPreviewDialog";

const formatValue = (value) => {
  if (!value) return "";

  const lower = value.toString().toLowerCase();

  const genderMap = {
    male: "Laki-laki",
    female: "Perempuan",
  };
  if (genderMap[lower]) return genderMap[lower];

  const countryMap = {
    wni: "WNI",
    wna: "WNA",
  };
  if (countryMap[lower]) return countryMap[lower];

  if (value.includes("_")) {
    return value
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
};

export default function DataDiri() {
  const router = useRouter();
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const user_id = searchParams.get("user_id");

  const {
    data: applicantData,
    isLoading: isApplicantLoading,
    isError: isApplicantError,
    error: applicantError,
  } = useManagerApplicantDetail(id);

  const {
    data: applicantProfileData,
    isLoading: isApplicantProfileLoading,
    isError: isApplicantProfileError,
    error: applicantProfileError,
  } = useApplicantProfile(id);

  const form = useForm({
    defaultValues: {
      namaLengkap: "",
      email: "",
      jenisKelamin: "",
      agama: "",
      noPonsel: "",
      tempatLahir: "",
      tanggalLahir: "",
      nik: "",
      noAkta: "",
      noKK: "",
      kewarganegaraan: "",
      anakKe: "",
      jumlahSaudara: "",
    },
  });

  if (isApplicantProfileLoading) return <div>Loading applicant...</div>;
  if (isApplicantLoading) return <div>Loading applicant...</div>;
  if (isApplicantError)
    return <div>Error loading applicant: {applicantError.message}</div>;

  const registrationData = applicantProfileData?.data?.data;

  const applicant = applicantData?.data?.data;

  const profile = registrationData?.profile || {};

  return (
    <ProtectedRoute>
      <div className="mx-3 md:mx-12 mt-6 grid grid-cols-1 gap-12">
        <Card className="w-full flex flex-col md:flex-row gap-6 p-8 rounded-2xl shadow-md bg-[var(--light-cream)] justify-between">
          <div className="flex flex-col p-2 w-full sm:w-2/3 space-y-1 items-start">
            <h2 className="font-bold text-xl">{profile.full_name}</h2>
            <h3 className="text-gray-500">
              {applicant.user.registration_number}
            </h3>
            <p className="text-gray-500">{registrationData?.user?.email}</p>
          </div>
          <Button variant={"yellow"}>{applicant.user.status}</Button>
        </Card>

        <div className="flex items-center gap-2 pb-0">
          <CheckCircle className="text-green-500" />
          <h2 className="text-xl font-semibold">Identitas Pendaftar</h2>
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-6">
          <div className="flex flex-col gap-5 p-12 border rounded-xl md:m-12 bg-[var(--light-cream)]">
            <FormField
              control={form.control}
              name="namaLengkap"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={profile.full_name}
                      {...field}
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="programStudi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program Studi</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        profile.program?.name_program ||
                        profile.program_name ||
                        "-"
                      }
                      {...field}
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Program Studi Pilihan 2</FormLabel>
              <Input
                placeholder={profile.program_2?.name_program || "-"}
                readOnly
              />
            </FormItem>

            <FormItem>
              <FormLabel>Program Studi Pilihan 3</FormLabel>
              <Input
                placeholder={profile.program_3?.name_program || "-"}
                readOnly
              />
            </FormItem>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={registrationData?.user?.email}
                      {...field}
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sekolahAsal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sekolah Asal</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={profile.previous_school}
                      {...field}
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ijazahTerakhir"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ijazah Terakhir</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        profile.last_ijazah
                          ? profile.last_ijazah.toUpperCase()
                          : ""
                      }
                      {...field}
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="jenisKelamin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Kelamin</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={formatValue(profile.gender)}
                        {...field}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="agama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agama</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={profile.religion}
                        {...field}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="noPonsel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomer Ponsel</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={profile.phone_number}
                        {...field}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tempatLahir"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tempat Lahir</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={profile.birth_place}
                        {...field}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tanggalLahir"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Lahir</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder={profile.birth_date}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nik"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIK</FormLabel>
                    <FormControl>
                      <Input placeholder={profile.nik} {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="ktp"
              render={({ field }) => {
                const ktpDoc = profile.documents?.find(
                  (doc) => doc.id_document_type === 1
                );

                return (
                  <FormItem>
                    <FormLabel>KTP / KITAS</FormLabel>
                    <FormControl>
                      <DocumentPreviewDialog
                        document={ktpDoc}
                        title="KTP / KITAS"
                        description="Dokumen identitas pendaftar"
                        buttonText="Lihat KTP"
                      />
                    </FormControl>
                    {!ktpDoc && (
                      <p className="text-sm text-amber-600">
                        ⚠️ Pendaftar belum mengupload dokumen KTP
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="noAkta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Registrasi Akta Lahir</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={profile?.birth_certificate_number}
                      {...field}
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="akta"
              render={({ field }) => {
                const aktaDoc = profile.documents?.find(
                  (doc) => doc.id_document_type === 2
                );

                return (
                  <FormItem>
                    <FormLabel>Akta Kelahiran</FormLabel>
                    <FormControl>
                      <DocumentPreviewDialog
                        document={aktaDoc}
                        title="Akta Kelahiran"
                        description="Dokumen akta kelahiran pendaftar"
                        buttonText="Lihat Akta Kelahiran"
                      />
                    </FormControl>
                    {!aktaDoc && (
                      <p className="text-sm text-amber-600">
                        ⚠️ Pendaftar belum mengupload dokumen Akta Kelahiran
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="noKK"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Kartu Keluarga</FormLabel>
                  <FormControl>
                    <Input placeholder={profile.no_kk} {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="kk"
              render={({ field }) => {
                const kkDoc = profile.documents?.find(
                  (doc) => doc.id_document_type === 3
                );

                return (
                  <FormItem>
                    <FormLabel>Kartu Keluarga</FormLabel>
                    <FormControl>
                      <DocumentPreviewDialog
                        document={kkDoc}
                        title="Kartu Keluarga"
                        description="Dokumen kartu keluarga pendaftar"
                        buttonText="Lihat Kartu Keluarga"
                      />
                    </FormControl>
                    {!kkDoc && (
                      <p className="text-sm text-amber-600">
                        ⚠️ Pendaftar belum mengupload dokumen Kartu Keluarga
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="kewarganegaraan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kewarganegaraan</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={formatValue(profile.citizenship)}
                      {...field}
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="anakKe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Anak ke Berapa</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={profile?.birth_order}
                        {...field}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jumlahSaudara"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jumlah Saudara Kandung</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={profile.number_of_siblings}
                        {...field}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="w-full flex items-center justify-end my-12 px-12 gap-6">
            <Link href="/manager/verification">
              <Button variant={"green"}>Kembali</Button>
            </Link>
            <Link href={`/manager/verification/data-alamat?id=${id}`}>
              <Button variant="matcha">Lanjut</Button>
            </Link>
          </div>
        </form>
      </Form>
    </ProtectedRoute>
  );
}
