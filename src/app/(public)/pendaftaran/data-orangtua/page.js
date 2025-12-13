"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { CheckCircle } from "lucide-react";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import toast from "react-hot-toast";
import RegistrationProgress from "@/components/registrations/RegistrationProgress";
import {
  useRegistrationProgress,
  useMyRegistration,
  useAddGuardian,
  useGuardians,
} from "@/hooks/useRegistration";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FormSchema = z
  .object({
    namaAyah: z.string().min(2).optional(),
    alamatAyah: z.string().min(5).optional(),
    telpAyah: z.string().min(10).optional(),
    pekerjaanAyah: z.string().min(2).optional(),
    pendidikanAyah: z.string().optional(),
    penghasilanAyah: z.string().optional(),

    namaIbu: z.string().min(2).optional(),
    alamatIbu: z.string().min(5).optional(),
    telpIbu: z.string().min(10).optional(),
    pekerjaanIbu: z.string().min(2).optional(),
    pendidikanIbu: z.string().optional(),
    penghasilanIbu: z.string().optional(),

    namaWali: z.string().optional(),
    alamatWali: z.string().optional(),
    telpWali: z.string().min(10).optional(),
    pekerjaanWali: z.string().min(2).optional(),
    pendidikanWali: z.string().optional(),
    penghasilanWali: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const hasParent =
      (data.namaAyah && data.namaAyah.trim().length > 0) ||
      (data.namaIbu && data.namaIbu.trim().length > 0);
    const hasWali = data.namaWali && data.namaWali.trim().length > 0;

    if (!hasParent && !hasWali) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Harap isi data orang tua atau wali.",
      });
    }

    // if guardian name is provided, ensure other fields are present and valid
    if (hasWali) {
      if (!data.alamatWali || !data.alamatWali.trim()) {
        ctx.addIssue({
          path: ["alamatWali"],
          code: z.ZodIssueCode.custom,
          message: "Alamat Wali harus diisi.",
        });
      }
      if (!data.telpWali || data.telpWali.trim().length < 10) {
        ctx.addIssue({
          path: ["telpWali"],
          code: z.ZodIssueCode.custom,
          message: "No. HP Wali tidak valid.",
        });
      }
      if (!data.pekerjaanWali || !data.pekerjaanWali.trim()) {
        ctx.addIssue({
          path: ["pekerjaanWali"],
          code: z.ZodIssueCode.custom,
          message: "Pekerjaan Wali harus diisi.",
        });
      }
      if (!data.pendidikanWali || !data.pendidikanWali.trim()) {
        ctx.addIssue({
          path: ["pendidikanWali"],
          code: z.ZodIssueCode.custom,
          message: "Pendidikan Wali harus dipilih.",
        });
      }
      if (!data.penghasilanWali || !data.penghasilanWali.trim()) {
        ctx.addIssue({
          path: ["penghasilanWali"],
          code: z.ZodIssueCode.custom,
          message: "Penghasilan Wali harus dipilih.",
        });
      }
    }

    // validate parent details if parent name is provided
    if (data.namaAyah && data.namaAyah.trim()) {
      if (!data.alamatAyah || !data.alamatAyah.trim()) {
        ctx.addIssue({
          path: ["alamatAyah"],
          code: z.ZodIssueCode.custom,
          message: "Alamat Ayah harus diisi.",
        });
      }
      if (!data.telpAyah || data.telpAyah.trim().length < 10) {
        ctx.addIssue({
          path: ["telpAyah"],
          code: z.ZodIssueCode.custom,
          message: "No. HP Ayah tidak valid.",
        });
      }
      if (!data.pekerjaanAyah || !data.pekerjaanAyah.trim()) {
        ctx.addIssue({
          path: ["pekerjaanAyah"],
          code: z.ZodIssueCode.custom,
          message: "Pekerjaan Ayah harus diisi.",
        });
      }
      if (!data.pendidikanAyah || !data.pendidikanAyah.trim()) {
        ctx.addIssue({
          path: ["pendidikanAyah"],
          code: z.ZodIssueCode.custom,
          message: "Pendidikan Ayah harus dipilih.",
        });
      }
      if (!data.penghasilanAyah || !data.penghasilanAyah.trim()) {
        ctx.addIssue({
          path: ["penghasilanAyah"],
          code: z.ZodIssueCode.custom,
          message: "Penghasilan Ayah harus dipilih.",
        });
      }
    }

    if (data.namaIbu && data.namaIbu.trim()) {
      if (!data.alamatIbu || !data.alamatIbu.trim()) {
        ctx.addIssue({
          path: ["alamatIbu"],
          code: z.ZodIssueCode.custom,
          message: "Alamat Ibu harus diisi.",
        });
      }
      if (!data.telpIbu || data.telpIbu.trim().length < 10) {
        ctx.addIssue({
          path: ["telpIbu"],
          code: z.ZodIssueCode.custom,
          message: "No. HP Ibu tidak valid.",
        });
      }
      if (!data.pekerjaanIbu || !data.pekerjaanIbu.trim()) {
        ctx.addIssue({
          path: ["pekerjaanIbu"],
          code: z.ZodIssueCode.custom,
          message: "Pekerjaan Ibu harus diisi.",
        });
      }
      if (!data.pendidikanIbu || !data.pendidikanIbu.trim()) {
        ctx.addIssue({
          path: ["pendidikanIbu"],
          code: z.ZodIssueCode.custom,
          message: "Pendidikan Ibu harus dipilih.",
        });
      }
      if (!data.penghasilanIbu || !data.penghasilanIbu.trim()) {
        ctx.addIssue({
          path: ["penghasilanIbu"],
          code: z.ZodIssueCode.custom,
          message: "Penghasilan Ibu harus dipilih.",
        });
      }
    }
  });

export default function DataOrangtua() {
  const router = useRouter();
  const [activeForm, setActiveForm] = useState("orangTua");
  const { data: progressData, isLoading: progressLoading } =
    useRegistrationProgress();
  const { data: registrationData, refetch } = useMyRegistration();
  const { data: guardiansData } = useGuardians();
  const addGuardianMutation = useAddGuardian();

  const progress = progressData?.data;
  const existingGuardians = useMemo(
    () => guardiansData?.data?.data || [],
    [guardiansData]
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      namaAyah: "",
      alamatAyah: "",
      telpAyah: "",
      pekerjaanAyah: "",
      pendidikanAyah: "",
      penghasilanAyah: "",
      namaIbu: "",
      alamatIbu: "",
      telpIbu: "",
      pekerjaanIbu: "",
      pendidikanIbu: "",
      penghasilanIbu: "",
      namaWali: "",
      alamatWali: "",
      telpWali: "",
      pekerjaanWali: "",
      pendidikanWali: "",
      penghasilanWali: "",
    },
  });

  useEffect(() => {
    if (!progressLoading && progress) {
      const accessibleSteps = progress.accessible_steps || [];

      if (!accessibleSteps.includes(3)) {
        toast.error("Silakan selesaikan tahapan sebelumnya terlebih dahulu");
        router.push("/pendaftaran");
      }
    }
  }, [progress, progressLoading, router]);

  useEffect(() => {
    if (existingGuardians.length > 0) {
      const father = existingGuardians.find(
        (g) => g.relationship_type === "Father"
      );
      const mother = existingGuardians.find(
        (g) => g.relationship_type === "Mother"
      );
      const guardian = existingGuardians.find(
        (g) => g.relationship_type === "Guardian"
      );

      form.reset({
        namaAyah: father?.full_name || "",
        alamatAyah: father?.address || "",
        telpAyah: father?.phone_number || "",
        pekerjaanAyah: father?.occupation || "",
        pendidikanAyah: father?.last_education || "",
        penghasilanAyah: father?.income_range || "",
        namaIbu: mother?.full_name || "",
        alamatIbu: mother?.address || "",
        telpIbu: mother?.phone_number || "",
        pekerjaanIbu: mother?.occupation || "",
        pendidikanIbu: mother?.last_education || "",
        penghasilanIbu: mother?.income_range || "",
        namaWali: guardian?.full_name || "",
        alamatWali: guardian?.address || "",
        telpWali: guardian?.phone_number || "",
        pekerjaanWali: guardian?.occupation || "",
        pendidikanWali: guardian?.last_education || "",
        penghasilanWali: guardian?.income_range || "",
      });
    }
  }, [existingGuardians, form]);

  async function onSubmit(data) {
    const guardians = [];

    if (data.namaAyah && data.namaAyah.trim()) {
      guardians.push({
        relationship_type: "Father",
        full_name: data.namaAyah,
        address: data.alamatAyah,
        phone_number: data.telpAyah,
        occupation: data.pekerjaanAyah,
        last_education: data.pendidikanAyah,
        income_range: data.penghasilanAyah,
      });
    }

    if (data.namaIbu && data.namaIbu.trim()) {
      guardians.push({
        relationship_type: "Mother",
        full_name: data.namaIbu,
        address: data.alamatIbu,
        phone_number: data.telpIbu,
        occupation: data.pekerjaanIbu,
        last_education: data.pendidikanIbu,
        income_range: data.penghasilanIbu,
      });
    }

    if (data.namaWali) {
      guardians.push({
        relationship_type: "Guardian",
        full_name: data.namaWali,
        address: data.alamatWali,
        phone_number: data.telpWali,
        occupation: data.pekerjaanWali,
        last_education: data.pendidikanWali,
        income_range: data.penghasilanWali,
      });
    }

    try {
      for (const guardian of guardians) {
        await addGuardianMutation.mutateAsync(guardian);
      }

      toast.success("Data orang tua/wali berhasil disimpan!");

      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/pendaftaran/data-akademik");
    } catch (error) {
      console.error("Failed to save guardians:", error);
    }
  }

  if (progressLoading) {
    return (
      <ProtectedRoute>
        <div className="max-w-7xl mx-auto p-12">
          <div className="animate-pulse">Memuat...</div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto">
        <RegistrationProgress />
        <div className="flex flex-col items-center gap-6 m-12 my-6 justify-between">
          <div className="flex gap-5 w-full">
            <CheckCircle className="text-green-500" />
            <h2 className="text-xl font-semibold">Data Orang Tua/ Wali </h2>
          </div>

          <div className="w-full max-w-full sm:max-w-md mx-auto my-6">
            <Tabs
              value={activeForm}
              onValueChange={setActiveForm}
              className="w-full"
            >
              <TabsList
                className="grid w-full grid-cols-2 bg-gray-200 p-1 rounded-full 
      h-10 sm:h-12 lg:h-14 
      text-xs sm:text-sm lg:text-base
      shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <TabsTrigger
                  value="orangTua"
                  className="rounded-full 
        data-[state=active]:bg-green-800 
        data-[state=active]:text-[var(--yellow)] 
        data-[state=inactive]:text-gray-600
        data-[state=inactive]:hover:text-gray-900
        transition-all duration-200 cursor-pointer 
        py-2 sm:py-2.5 lg:py-3
        font-medium"
                >
                  Data Orang Tua
                </TabsTrigger>

                <TabsTrigger
                  value="wali"
                  className="rounded-full 
        data-[state=active]:bg-green-800 
        data-[state=active]:text-[var(--yellow)] 
        data-[state=inactive]:text-gray-600
        data-[state=inactive]:hover:text-gray-900
        transition-all duration-200 cursor-pointer 
        py-2 sm:py-2.5 lg:py-3
        font-medium"
                >
                  Data Wali
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-5 sm:p-12 border rounded-xl m-4 sm:m-12 bg-[var(--light-cream)]">
              {activeForm === "orangTua" && (
                <>
                  <div className=" p-4 rounded-md space-y-4">
                    <h3 className="font-semibold text-lg">
                      Data Identitas Ayah
                    </h3>
                    <FormField
                      control={form.control}
                      name="namaAyah"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Nama Ayah Kandung{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Nama lengkap Ayah" {...field} />
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
                          <FormLabel>
                            Alamat Ayah Kandung{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Alamat lengkap Ayah"
                              {...field}
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
                            <FormLabel>
                              No. HP Ayah Kandung{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="08..."
                                {...field}
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
                            <FormLabel>
                              Pekerjaan Ayah{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Pekerjaan" {...field} />
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
                            <FormLabel>
                              Pendidikan Terakhir Ayah{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl className="w-full">
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih pendidikan" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="sd">SD</SelectItem>
                                <SelectItem value="smp">SMP</SelectItem>
                                <SelectItem value="sma">SMA/SMK</SelectItem>
                                <SelectItem value="d1">D1</SelectItem>
                                <SelectItem value="d2">D2</SelectItem>
                                <SelectItem value="d3">D3</SelectItem>
                                <SelectItem value="s1">Sarjana (S1)</SelectItem>
                                <SelectItem value="s2">
                                  Magister (S2)
                                </SelectItem>
                                <SelectItem value="s3">Doktor (S3)</SelectItem>
                                <SelectItem value="lainnya">Lainnya</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="penghasilanAyah"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Penghasilan Ayah{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl className="w-full">
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih penghasilan" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="below_5m">
                                  &lt; Rp 5.000.000
                                </SelectItem>
                                <SelectItem value="5m_to_10m">
                                  Rp 5.000.000 - Rp 10.000.000
                                </SelectItem>
                                <SelectItem value="above_10m">
                                  &gt; Rp 10.000.000
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className=" p-4 rounded-md space-y-4">
                    <h3 className="font-semibold text-lg">
                      Data Identitas Ibu
                    </h3>
                    <FormField
                      control={form.control}
                      name="namaIbu"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Nama Ibu Kandung{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Nama lengkap Ibu" {...field} />
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
                          <FormLabel>
                            Alamat Ibu Kandung{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Alamat lengkap Ibu"
                              {...field}
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
                            <FormLabel>
                              No. HP Ibu Kandung{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="08..."
                                {...field}
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
                            <FormLabel>
                              Pekerjaan Ibu{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Pekerjaan" {...field} />
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
                            <FormLabel>
                              Pendidikan Terakhir Ibu{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl className="w-full">
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih pendidikan" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="sd">SD</SelectItem>
                                <SelectItem value="smp">SMP</SelectItem>
                                <SelectItem value="sma">SMA/SMK</SelectItem>
                                <SelectItem value="d1">D1</SelectItem>
                                <SelectItem value="d2">D2</SelectItem>
                                <SelectItem value="d3">D3</SelectItem>
                                <SelectItem value="s1">Sarjana (S1)</SelectItem>
                                <SelectItem value="s2">
                                  Magister (S2)
                                </SelectItem>
                                <SelectItem value="s3">Doktor (S3)</SelectItem>
                                <SelectItem value="lainnya">Lainnya</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="penghasilanIbu"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Penghasilan Ibu{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl className="w-full">
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih penghasilan" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="below_5m">
                                  &lt; Rp 5.000.000
                                </SelectItem>
                                <SelectItem value="5m_to_10m">
                                  Rp 5.000.000 - Rp 10.000.000
                                </SelectItem>
                                <SelectItem value="above_10m">
                                  &gt; Rp 10.000.000
                                </SelectItem>
                              </SelectContent>
                            </Select>
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
                        <FormLabel>
                          Nama Wali <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Nama lengkap Wali" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="alamatWali"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Alamat Wali <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Alamat lengkap Wali" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="telpWali"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            No. HP Wali <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="08..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pekerjaanWali"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Pekerjaan Wali{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Pekerjaan" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pendidikanWali"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Pendidikan Terakhir Wali{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl className="w-full">
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih pendidikan" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="sd">SD</SelectItem>
                              <SelectItem value="smp">SMP</SelectItem>
                              <SelectItem value="sma">SMA/SMK</SelectItem>
                              <SelectItem value="d1">D1</SelectItem>
                              <SelectItem value="d2">D2</SelectItem>
                              <SelectItem value="d3">D3</SelectItem>
                              <SelectItem value="s1">Sarjana (S1)</SelectItem>
                              <SelectItem value="s2">Magister (S2)</SelectItem>
                              <SelectItem value="s3">Doktor (S3)</SelectItem>
                              <SelectItem value="lainnya">Lainnya</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="penghasilanWali"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Penghasilan Wali{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl className="w-full">
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih penghasilan" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="below_5m">
                                &lt; Rp 5.000.000
                              </SelectItem>
                              <SelectItem value="5m_to_10m">
                                Rp 5.000.000 - Rp 10.000.000
                              </SelectItem>
                              <SelectItem value="above_10m">
                                &gt; Rp 10.000.000
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="md:w-full flex items-center justify-end my-12 px-12 gap-6">
              <Link href="/pendaftaran" className="w-1/2 sm:w-48">
                <Button type="button" variant={"yellow"} className={"w-full"}>
                  Kembali
                </Button>
              </Link>
              <Button
                type="submit"
                variant={"matcha"}
                className={"w-1/2 sm:w-48"}
                disabled={addGuardianMutation.isPending}
              >
                {addGuardianMutation.isPending ? "Menyimpan..." : "Lanjut"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </ProtectedRoute>
  );
}
