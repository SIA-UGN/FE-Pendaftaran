"use client"; // <-- Diperlukan untuk form interaktif

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
import { useState } from "react";
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

import { useApplicantDetail } from "@/hooks/useManager";

const FormSchema = z.object({
  namaAyah: z.string().min(2, { message: "Nama Ayah harus diisi." }),
  alamatAyah: z.string().min(5, { message: "Alamat Ayah harus diisi." }),
  telpAyah: z.string().min(10, { message: "No. HP Ayah tidak valid." }),
  pekerjaanAyah: z.string().min(2, { message: "Pekerjaan Ayah harus diisi." }),
  pendidikanAyah: z
    .string()
    .min(2, { message: "Pendidikan Ayah harus diisi." }),
  penghasilanAyah: z.string({
    required_error: "Penghasilan Ayah harus dipilih.",
  }),

  namaIbu: z.string().min(2, { message: "Nama Ibu harus diisi." }),
  alamatIbu: z.string().min(5, { message: "Alamat Ibu harus diisi." }),
  telpIbu: z.string().min(10, { message: "No. HP Ibu tidak valid." }),
  pekerjaanIbu: z.string().min(2, { message: "Pekerjaan Ibu harus diisi." }),
  pendidikanIbu: z.string().min(2, { message: "Pendidikan Ibu harus diisi." }),
  penghasilanIbu: z.string({
    required_error: "Penghasilan Ibu harus dipilih.",
  }),

  namaWali: z.string().optional(),
  alamatWali: z.string().optional(),
  telpWali: z.string().optional(),
  pekerjaanWali: z.string().optional(),
  pendidikanWali: z.string().optional(),
  penghasilanWali: z.string().optional(),
});

export default function DataOrangtua() {
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const user_id = searchParams.get("user_id");

  const [activeForm, setActiveForm] = useState("orangTua");

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      namaAyah: "",
      alamatAyah: "",
      telpAyah: "",
      pekerjaanAyah: "",
      pendidikanAyah: "",
      namaIbu: "",
      alamatIbu: "",
      telpIbu: "",
      pekerjaanIbu: "",
      pendidikanIbu: "",
    },
  });

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

  const father = applicant.steps.father;
  const mother = applicant.steps.mother;

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

        <div className="flex justify-between">
          <div className="flex items-center gap-2 pb-0">
            <CheckCircle className="text-green-500" />
            <h2 className="text-xl font-semibold">Data Orang Tua</h2>
          </div>
          <Button
            type="button"
            variant="yellow"
            onClick={() =>
              setActiveForm(activeForm === "orangTua" ? "wali" : "orangTua")
            }
          >
            {activeForm === "orangTua" ? "Data Wali" : "Data Orang Tua"}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-8">
          <div className="flex flex-col gap-5 p-12 border rounded-xl m-12 bg-[var(--light-cream)]">
            {activeForm === "orangTua" && (
              <>
                <div className=" p-4 rounded-md space-y-4">
                  <h3 className="font-semibold text-lg">Data Identitas Ayah</h3>
                  <FormField
                    control={form.control}
                    name="namaAyah"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Ayah Kandung</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={father.name}
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
                    name="alamatAyah"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alamat Ayah Kandung</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={father.address}
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
                      name="telpAyah"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>No. HP Ayah Kandung</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder={father.phone}
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
                      name="pekerjaanAyah"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pekerjaan Ayah</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={father.occupation}
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
                      name="pendidikanAyah"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pendidikan Terakhir Ayah</FormLabel>
                          <FormControl>
                            <Input placeholder={father.education} readOnly />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="penghasilanAyah"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Penghasilan Ayah</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={father.income}
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

                <div className=" p-4 rounded-md space-y-4">
                  <h3 className="font-semibold text-lg">Data Identitas Ibu</h3>
                  <FormField
                    control={form.control}
                    name="namaIbu"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Ibu Kandung</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={mother.name}
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
                    name="alamatIbu"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alamat Ibu Kandung</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={mother.address}
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
                      name="telpIbu"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>No. HP Ibu Kandung</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder={mother.phone}
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
                      name="pekerjaanIbu"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pekerjaan Ibu</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={mother.occupation}
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
                      name="pendidikanIbu"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pendidikan Terakhir Ibu</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={mother.education}
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
                      name="penghasilanIbu"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Penghasilan Ibu</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={mother.income}
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
              </>
            )}
            {activeForm === "wali" && (
              <div className=" p-4 rounded-md space-y-4">
                <h3 className="font-semibold text-lg">
                  Data Identitas Wali (Opsional)
                </h3>
                <FormField
                  control={form.control}
                  name="namaWali"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Wali</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nama lengkap Wali"
                          {...field}
                          readOnly
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="alamatWali"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alamat Wali</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Alamat lengkap Wali"
                          {...field}
                          readOnly
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="telpWali"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>No. HP Wali</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="08..."
                            {...field}
                            readOnly
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pekerjaanWali"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pekerjaan Wali</FormLabel>
                        <FormControl>
                          <Input placeholder="Pekerjaan" {...field} readOnly />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pendidikanWali"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pendidikan Terakhir Wali</FormLabel>
                        <FormControl>
                          <Input placeholder="SMA/S1/..." {...field} readOnly />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="penghasilanWali"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Penghasilan Wali</FormLabel>
                        <FormControl>
                          <Input placeholder="<5.000.000" {...field} readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="w-full flex items-center justify-end my-12 px-12 gap-6">
            <Button variant={"green"}>Kembali</Button>
            <Link href={`/manager/verification/data-akademik?id=${id}`}>
              <Button variant="matcha">Lanjut</Button>
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
}
