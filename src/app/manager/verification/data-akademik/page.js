"use client";

import { useSearchParams } from "next/navigation";

import { Info, AlertCircle, XCircle, CheckCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import RegistrationProgress from "@/components/registrations/RegistrationProgress";

import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import TextareaAutosize from "react-textarea-autosize";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import { useState } from "react";

import { useManagerApplicantDetail } from "@/hooks/useManager";
import DocumentPreviewDialog from "@/components/manager/DocumentPreviewDialog";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
];

const FormSchema = z.object({
  sekolahAsal: z.string().min(3, { message: "Nama sekolah asal wajib diisi." }),
  statusKelulusan: z.string({
    required_error: "Status kelulusan harus dipilih.",
  }),
  ijazahTerakhir: z.string({
    required_error: "Ijazah terakhir harus dipilih.",
  }),
  uploadIjazah: z
    .any()
    .refine((files) => files?.length == 1, "File ijazah wajib diupload.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Ukuran file maksimal 5MB.`
    )
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Format file harus .pdf, .jpg, atau .png"
    ),
  uploadSkl: z.any().optional(),
  uploadTranskrip: z
    .any()
    .refine(
      (files) => files?.length == 1,
      "File transkrip/rapor wajib diupload."
    )
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Ukuran file maksimal 5MB.`
    ),
  uploadUn: z
    .any()
    .refine((files) => files?.length == 1, "File nilai UN wajib diupload.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Ukuran file maksimal 5MB.`
    ),
  uploadSertifikat: z.any().optional(),
});

export default function DataAkademik() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sekolahAsal: "",
    },
  });

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

  if (isApplicantLoading) return <div>Loading applicant...</div>;
  if (isApplicantError)
    return <div>Error loading applicant: {applicantError.message}</div>;

  const applicant = applicantData?.data?.data;
  const data = applicant?.profile;

  // Document Type IDs: 4=Ijazah, 5=Transkrip, 6=SKL, 7=UN, 8=Sertifikat
  const ijazahDoc = data?.documents?.find((doc) => doc.id_document_type === 4);
  const transkripDoc = data?.documents?.find(
    (doc) => doc.id_document_type === 5
  );
  const sklDoc = data?.documents?.find((doc) => doc.id_document_type === 6);
  const unDoc = data?.documents?.find((doc) => doc.id_document_type === 7);
  const sertifikatDoc = data?.documents?.find(
    (doc) => doc.id_document_type === 8
  );

  console.log(id);
  console.log(data);
  console.log("📄 Documents:", data?.documents);

  return (
    <>
      <div className="mx-3 md:mx-12 mt-6 grid grid-cols-1 gap-12">
        <Card className="w-full flex flex-col md:flex-row gap-6 p-8 rounded-2xl shadow-md bg-[var(--light-cream)] justify-between">
          <div className="flex flex-col p-2 w-full sm:w-2/3 space-y-1 items-start">
            <h2 className="font-bold text-xl">{applicant.user.name}</h2>
            <h3 className="text-gray-500">
              {applicant.user.registration_number}
            </h3>
            <p className="text-gray-500">{applicant.user.email}</p>
          </div>
          <Button variant={"yellow"}>{applicant.user.status}</Button>
        </Card>

        <div className="flex items-center gap-2 pb-0">
          <CheckCircle className="text-green-500" />
          <h2 className="text-xl font-semibold">Data Akademik</h2>
        </div>
      </div>
      <Form {...form}>
        <form className="space-y-6">
          <div className="flex flex-col gap-5 p-12 border rounded-xl m-0 md:m-12 bg-[var(--light-cream)]">
            <FormField
              control={form.control}
              name="sekolahAsal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sekolah Asal</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={data.previous_school}
                      {...field}
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="statusKelulusan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status Kelulusan</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            data.graduation_status === "graduated"
                              ? "Lulus"
                              : data.graduation_status === "not_graduated"
                              ? "Tidak Lulus"
                              : data.graduation_status
                          }
                          {...field}
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="ijazahTerakhir"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ijazah Terakhir</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            data.last_ijazah
                              ? data.last_ijazah.toUpperCase()
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
              </div>
            </div>

            {/* Ijazah Dialog */}
            <FormField
              control={form.control}
              name="uploadIjazah"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ijazah Terakhir</FormLabel>
                  <FormControl>
                    <DocumentPreviewDialog
                      document={ijazahDoc}
                      title="Ijazah Terakhir"
                      description="Dokumen ijazah terakhir pendaftar"
                      buttonText="Lihat Ijazah"
                    />
                  </FormControl>
                  {!ijazahDoc && (
                    <p className="text-sm text-amber-600">
                      ⚠️ Dokumen Ijazah belum diupload
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SKL Dialog */}
            <FormField
              control={form.control}
              name="uploadSkl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKL</FormLabel>
                  <FormControl>
                    <DocumentPreviewDialog
                      document={sklDoc}
                      title="Surat Keterangan Lulus (SKL)"
                      description="Dokumen SKL pendaftar"
                      buttonText="Lihat SKL"
                    />
                  </FormControl>
                  {!sklDoc && (
                    <p className="text-sm text-amber-600">
                      ⚠️ Dokumen SKL belum diupload
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Transkrip Dialog */}
            <FormField
              control={form.control}
              name="uploadTranskrip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transkrip Nilai</FormLabel>
                  <FormControl>
                    <DocumentPreviewDialog
                      document={transkripDoc}
                      title="Transkrip Nilai"
                      description="Dokumen transkrip nilai pendaftar"
                      buttonText="Lihat Transkrip"
                    />
                  </FormControl>
                  {!transkripDoc && (
                    <p className="text-sm text-amber-600">
                      ⚠️ Dokumen Transkrip belum diupload
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* UN Dialog */}
            <FormField
              control={form.control}
              name="uploadUn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ujian Nasional</FormLabel>
                  <FormControl>
                    <DocumentPreviewDialog
                      document={unDoc}
                      title="Nilai Ujian Nasional"
                      description="Dokumen nilai UN pendaftar"
                      buttonText="Lihat Nilai UN"
                    />
                  </FormControl>
                  {!unDoc && (
                    <p className="text-sm text-amber-600">
                      ⚠️ Dokumen UN belum diupload
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sertifikat Dialog */}
            <FormField
              control={form.control}
              name="uploadSertifikat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sertifikat / Surat Rekomendasi</FormLabel>
                  <FormControl>
                    <DocumentPreviewDialog
                      document={sertifikatDoc}
                      title="Sertifikat / Surat Rekomendasi"
                      description="Dokumen sertifikat atau surat rekomendasi pendaftar"
                      buttonText="Lihat Sertifikat"
                    />
                  </FormControl>
                  {!sertifikatDoc && (
                    <p className="text-sm text-amber-600">
                      ⚠️ Dokumen Sertifikat belum diupload
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex items-center justify-end my-12 px-12 gap-6">
            <Link href={`/manager/verification/data-orangtua?id=${id}`}>
              <Button variant={"green"}>Kembali</Button>
            </Link>
            <Link href={`/manager/verification/data-prestasi?id=${id}`}>
              <Button variant="matcha">Lanjut</Button>
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
}
