"use client"; // <-- Wajib ada untuk menggunakan hooks

import { useSearchParams } from "next/navigation";

import { Info, AlertCircle, XCircle, CheckCircle } from "lucide-react";
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

import { useApplicantDetail } from "@/hooks/useManager";

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
  } = useApplicantDetail(id);

  if (isApplicantLoading) return <div>Loading applicant...</div>;
  if (isApplicantError)
    return <div>Error loading applicant: {applicantError.message}</div>;

  const applicant = applicantData?.data?.data;

  const data = applicant.steps.academic;

  console.log(id);

  return (
    <>
      <div className="mx-12 mt-6 grid grid-cols-1 gap-12">
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
          <div className="flex flex-col gap-5 p-12 border rounded-xl m-12 bg-[var(--light-cream)]">
            <FormField
              control={form.control}
              name="sekolahAsal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sekolah Asal</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={data.school_origin}
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
                          placeholder={data.graduation_status}
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
                          placeholder={data.last_certificate}
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

            <FormField
              control={form.control}
              name="uploadIjazah"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ijazah Terakhir</FormLabel>
                  <FormControl>
                    <Button asChild variant={"outline"}>
                      <a href={`/${data.certification_file}`} download>
                        Unduh Ijazah Terakhir
                      </a>
                    </Button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="uploadSkl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKL</FormLabel>
                  <FormControl>
                    <Button asChild variant={"outline"}>
                      <a href={`/${data.graduation_letter_file}`} download>
                        Unduh SKL
                      </a>
                    </Button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="uploadTranskrip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tranksrip Nilai</FormLabel>
                  <FormControl>
                    <Button asChild variant={"outline"}>
                      <a href={`/${data.trancript_file}`} download>
                        Unduh Tranksrip Nilai
                      </a>
                    </Button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="uploadUn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ujian Nasional</FormLabel>
                  <FormControl>
                    <Button asChild variant={"outline"}>
                      <a href={`/${data.national_exam_file}`} download>
                        Unduh Nilai Ujian Nasional
                      </a>
                    </Button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="uploadSertifikat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sertifikat/ Surat Rekomendasi</FormLabel>
                  <FormControl>
                    <Button asChild variant={"outline"}>
                      <a href={`/${data.selection_test_file}`} download>
                        Unduh Sertifikat/Surat Rekomendasi
                      </a>
                    </Button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex items-center justify-end my-12 px-12 gap-6">
            <Button variant={"green"}>Kembali</Button>
            <Link href={`/manager/verification/data-prestasi?id=${id}`}>
              <Button variant="matcha">Lanjut</Button>
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
}
