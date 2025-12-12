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

const FormSchema = z.object({
  namaAyah: z.string().min(2, { message: "Nama Ayah harus diisi." }),
  alamatAyah: z.string().min(5, { message: "Alamat Ayah harus diisi." }),
  telpAyah: z.string().min(10, { message: "No. HP Ayah tidak valid." }),
  pekerjaanAyah: z.string().min(2, { message: "Pekerjaan Ayah harus diisi." }),
  pendidikanAyah: z.string({
    required_error: "Pendidikan Ayah harus dipilih.",
  }),
  penghasilanAyah: z.string({
    required_error: "Penghasilan Ayah harus dipilih.",
  }),

  namaIbu: z.string().min(2, { message: "Nama Ibu harus diisi." }),
  alamatIbu: z.string().min(5, { message: "Alamat Ibu harus diisi." }),
  telpIbu: z.string().min(10, { message: "No. HP Ibu tidak valid." }),
  pekerjaanIbu: z.string().min(2, { message: "Pekerjaan Ibu harus diisi." }),
  pendidikanIbu: z.string({
    required_error: "Pendidikan Ibu harus dipilih.",
  }),
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

    guardians.push({
      relationship_type: "Father",
      full_name: data.namaAyah,
      address: data.alamatAyah,
      phone_number: data.telpAyah,
      occupation: data.pekerjaanAyah,
      last_education: data.pendidikanAyah,
      income_range: data.penghasilanAyah,
    });

    guardians.push({
      relationship_type: "Mother",
      full_name: data.namaIbu,
      address: data.alamatIbu,
      phone_number: data.telpIbu,
      occupation: data.pekerjaanIbu,
      last_education: data.pendidikanIbu,
      income_range: data.penghasilanIbu,
    });

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
