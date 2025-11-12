"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import RegistrationProgress from "@/components/RegistrationProgress";
import {
  useRegistrationProgress,
  useMyRegistration,
  useStoreFamilyData,
} from "@/hooks/useRegistration";

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
  const storeMutation = useStoreFamilyData();

  const progress = progressData?.data;

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
    if (registrationData?.data?.registration?.family) {
      const family = registrationData.data.registration.family;
      form.reset({
        namaAyah: family.father_name || "",
        alamatAyah: family.father_address || "",
        telpAyah: family.father_phone || "",
        pekerjaanAyah: family.father_occupation || "",
        pendidikanAyah: family.father_education || "",
        penghasilanAyah: family.father_income || "",
        namaIbu: family.mother_name || "",
        alamatIbu: family.mother_address || "",
        telpIbu: family.mother_phone || "",
        pekerjaanIbu: family.mother_occupation || "",
        pendidikanIbu: family.mother_education || "",
        penghasilanIbu: family.mother_income || "",
        namaWali: family.guardian_name || "",
        alamatWali: family.guardian_address || "",
        telpWali: family.guardian_phone || "",
        pekerjaanWali: family.guardian_occupation || "",
        pendidikanWali: family.guardian_education || "",
        penghasilanWali: family.guardian_income || "",
      });
    }
  }, [registrationData, form]);

  async function onSubmit(data) {
    const payload = {
      father: {
        name: data.namaAyah,
        address: data.alamatAyah,
        phone: data.telpAyah,
        occupation: data.pekerjaanAyah,
        education: data.pendidikanAyah,
        income: data.penghasilanAyah,
      },
      mother: {
        name: data.namaIbu,
        address: data.alamatIbu,
        phone: data.telpIbu,
        occupation: data.pekerjaanIbu,
        education: data.pendidikanIbu,
        income: data.penghasilanIbu,
      },
    };

    if (data.namaWali) {
      payload.guardian = {
        name: data.namaWali,
        address: data.alamatWali || null,
        phone: data.telpWali || null,
        occupation: data.pekerjaanWali || null,
        education: data.pendidikanWali || null,
        income: data.penghasilanWali || null,
      };
    }

    storeMutation.mutate(payload);
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
        <div className="flex items-center gap-2 m-12 mt-6 justify-between">
          <div className="flex gap-5 items-center">
            <CheckCircle className="text-green-500" />
            <h2 className="text-xl font-semibold">Data Orang Tua/ Wali</h2>
          </div>
          <div className="flex gap-2 mb-6">
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-5 p-12 border rounded-xl m-12 bg-[var(--light-cream)]">
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
                          <FormLabel>Nama Ayah Kandung</FormLabel>
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
                          <FormLabel>Alamat Ayah Kandung</FormLabel>
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
                            <FormLabel>No. HP Ayah Kandung</FormLabel>
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
                            <FormLabel>Pekerjaan Ayah</FormLabel>
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
                            <FormLabel>Pendidikan Terakhir Ayah</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
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
                            <FormLabel>Penghasilan Ayah</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih penghasilan" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="below_5m">
                                  &lt; 5.000.000
                                </SelectItem>
                                <SelectItem value="5m_to_10m">
                                  5.000.000 – 9.999.999
                                </SelectItem>
                                <SelectItem value="above_10m">
                                  &gt; 10.000.000
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
                          <FormLabel>Nama Ibu Kandung</FormLabel>
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
                          <FormLabel>Alamat Ibu Kandung</FormLabel>
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
                            <FormLabel>No. HP Ibu Kandung</FormLabel>
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
                            <FormLabel>Pekerjaan Ibu</FormLabel>
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
                            <FormLabel>Pendidikan Terakhir Ibu</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
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
                            <FormLabel>Penghasilan Ibu</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih penghasilan" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="below_5m">
                                  &lt; 5.000.000
                                </SelectItem>
                                <SelectItem value="5m_to_10m">
                                  5.000.000 – 9.999.999
                                </SelectItem>
                                <SelectItem value="above_10m">
                                  &gt; 10.000.000
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
                        <FormLabel>Nama Wali</FormLabel>
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
                        <FormLabel>Alamat Wali</FormLabel>
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
                          <FormLabel>No. HP Wali</FormLabel>
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
                          <FormLabel>Pekerjaan Wali</FormLabel>
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
                          <FormLabel>Pendidikan Terakhir Wali</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
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
                          <FormLabel>Penghasilan Wali</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih penghasilan" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="below_5m">
                                &lt; 5.000.000
                              </SelectItem>
                              <SelectItem value="5m_to_10m">
                                5.000.000 – 9.999.999
                              </SelectItem>
                              <SelectItem value="above_10m">
                                &gt; 10.000.000
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
            <div className="w-full flex items-center justify-end my-12 px-12">
              <Link href="/pendaftaran">
                <Button
                  type="button"
                  variant={"yellow"}
                  className={"w-full sm:w-48"}
                >
                  Kembali
                </Button>
              </Link>
              <Button
                type="submit"
                variant={"matcha"}
                className={"w-full sm:w-48"}
                disabled={storeMutation.isPending}
              >
                {storeMutation.isPending ? "Menyimpan..." : "Lanjut"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </ProtectedRoute>
  );
}
