"use client";

import { useSearchParams } from "next/navigation";

import { useRouter } from "next/navigation";

import { Info, AlertCircle, XCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import ProtectedRoute from "@/components/ProtectedRoute";
import { toast } from "sonner";
import { getCookie } from "cookies-next";
import RegistrationProgress from "@/components/registrations/RegistrationProgress";
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
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import TextareaAutosize from "react-textarea-autosize";
import { Card } from "@/components/ui/card";

import { useApplicantDetail } from "@/hooks/useManager";

export default function DataDiri() {
  const router = useRouter();
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const user_id = searchParams.get("user_id");

  console.log(id);

  const {
    data: applicantData,
    isLoading: isApplicantLoading,
    isError: isApplicantError,
    error: applicantError,
  } = useApplicantDetail(id);

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

  if (isApplicantLoading) return <div>Loading applicant...</div>;
  if (isApplicantError)
    return <div>Error loading applicant: {applicantError.message}</div>;

  const applicant = applicantData?.data?.data;

  const data = applicant.steps.student_profile;

  console.log(data);

  return (
    <ProtectedRoute>
      <div className="mx-12 mt-6 grid grid-cols-1 gap-12">
        <Card className="w-full flex flex-col md:flex-row gap-6 p-8 rounded-2xl shadow-md bg-[var(--light-cream)] justify-between">
          <div className="flex flex-col p-2 w-full sm:w-2/3 space-y-1 items-start">
            <h2 className="font-bold text-xl">{applicant.user.name}</h2>
            <h3 className="text-gray-500">{applicant.user.registration_number}</h3>
            <p className="text-gray-500">{applicant.user.email}</p>
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
          <div className="flex flex-col gap-5 p-12 border rounded-xl m-12 bg-[var(--light-cream)]">
            <FormField
              control={form.control}
              name="namaLengkap"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input placeholder={data.full_name} {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={data.email}
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
                      <Input placeholder={data.gender} {...field} readOnly />
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
                      <Input placeholder={data.religion} {...field} readOnly />
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
                      <Input placeholder={data.phone} {...field} readOnly />
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
                      <Input placeholder={data.birth_place} {...field} readOnly />
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
                        placeholder={data.birth_date}
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
                      <Input placeholder={data.family_card_number} {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="ktp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>KTP / KITAS</FormLabel>
                  <FormControl>
                    <Button asChild variant={"outline"}>
                      <a href={`/${data.family_card_file}`} download>
                        Unduh KTP
                      </a>
                    </Button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="noAkta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Registrasi Akta Lahir</FormLabel>
                  <FormControl>
                    <Input placeholder={data.birth_certificate_number} {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="akta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Akta Kelahiran</FormLabel>
                  <FormControl>
                    <Button asChild variant={"outline"}>
                      <a href={`/${data.birth_certificate_file}`} download>
                        Unduh Akta Kelahiran
                      </a>
                    </Button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="noKK"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Kartu Keluarga</FormLabel>
                  <FormControl>
                    <Input placeholder={data.family_card_number} {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="kk"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kartu Keluarga</FormLabel>
                  <FormControl>
                    <Button asChild variant={"outline"}>
                      <a href={`/${data.family_card_file}`} download>
                        Unduh Kartu Keluarga
                      </a>
                    </Button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="kewarganegaraan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kewarganegaraan</FormLabel>
                  <FormControl>
                    <Input placeholder={data.citizenship} {...field} readOnly />
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
                        placeholder={data.child_number}
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
                        placeholder={data.siblings_count}
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
