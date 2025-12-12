"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import toast from "react-hot-toast";
import RegistrationProgress from "@/components/registrations/RegistrationProgress";
import {
  useRegistrationProgress,
  useMyRegistration,
  useStoreAddressInformation,
} from "@/hooks/useRegistration";
import { useProvinces, useCitiesByProvince } from "@/hooks/useMasterData";
import { useAuth } from "@/contexts/AuthContext";

const FormSchema = z.object({
  provinsi: z.string().min(1, { message: "Provinsi wajib diisi." }),
  kota: z.string().min(1, { message: "Kota / Kabupaten wajib diisi." }),
  kecamatan: z.string().min(1, { message: "Kecamatan wajib diisi." }),
  kelurahan: z.string().min(1, { message: "Kelurahan wajib diisi." }),
  kodePos: z
    .string()
    .min(5, { message: "Kode Pos minimal 5 digit." })
    .max(5, { message: "Kode Pos maksimal 5 digit." }),
  namaDusun: z.string().min(1, { message: "Nama Dusun wajib diisi." }),
  alamatLengkap: z
    .string()
    .min(10, { message: "Alamat Lengkap harus lebih detail." }),
});

export default function DataAlamat() {
  const router = useRouter();
  const { user } = useAuth();
  const { data: progressData, isLoading: progressLoading } =
    useRegistrationProgress();
  const { data: registrationData, refetch } = useMyRegistration();
  const storeMutation = useStoreAddressInformation();

  const { data: provincesData, isLoading: provincesLoading } = useProvinces();
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const { data: citiesData, isLoading: citiesLoading } =
    useCitiesByProvince(selectedProvinceId);

  const progress = progressData?.data;
  const provinces = useMemo(
    () => provincesData?.data?.data || [],
    [provincesData]
  );
  const cities = useMemo(() => citiesData?.data?.data || [], [citiesData]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      provinsi: "",
      kota: "",
      kecamatan: "",
      kelurahan: "",
      kodePos: "",
      namaDusun: "",
      alamatLengkap: "",
    },
  });

  useEffect(() => {
    if (!progressLoading && progress) {
      const accessibleSteps = progress.accessible_steps || [];

      if (!accessibleSteps.includes(2)) {
        toast.error("Silakan selesaikan tahapan sebelumnya terlebih dahulu");
        router.push("/pendaftaran");
      }
    }
  }, [progress, progressLoading, router]);

  useEffect(() => {
    if (registrationData?.data?.data?.profile && provinces.length > 0) {
      const profile = registrationData.data.data.profile;

      if (profile.province) {
        const matchingProvince = provinces.find(
          (prov) => prov.name === profile.province
        );
        if (matchingProvince) {
          setSelectedProvinceId(matchingProvince.id_province.toString());
        }
      }

      form.reset({
        provinsi: profile.province || "",
        kota: profile.city_regency || "",
        kecamatan: profile.kecamatan || "",
        kelurahan: profile.kelurahan || "",
        kodePos: profile.postal_code || "",
        namaDusun: profile.dusun || "",
        alamatLengkap: profile.full_address || "",
      });
    }
  }, [registrationData, form, provinces]);

  async function onSubmit(data) {
    const existingProfile = registrationData?.data?.data?.profile || {};

    const formatBirthDate = (dateString) => {
      if (!dateString) return null;
      return dateString.split("T")[0];
    };

    const payload = {
      id_program: existingProfile.id_program,
      full_name: existingProfile.full_name,
      email: existingProfile.email || user?.email,
      birth_place: existingProfile.birth_place,
      birth_date: formatBirthDate(existingProfile.birth_date),
      nik: existingProfile.nik,
      phone_number: existingProfile.phone_number,
      gender: existingProfile.gender,
      birth_order: existingProfile.birth_order,
      number_of_siblings: existingProfile.number_of_siblings,
      no_kk: existingProfile.no_kk,

      province: data.provinsi,
      city_regency: data.kota,
      kecamatan: data.kecamatan,
      kelurahan: data.kelurahan,
      postal_code: data.kodePos,
      dusun: data.namaDusun,
      full_address: data.alamatLengkap,
    };

    storeMutation.mutate(payload, {
      onSuccess: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push("/pendaftaran/data-orangtua");
      },
    });
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

        <div className="flex items-center gap-2 mx-4 sm:mx-6 md:mx-8 lg:mx-12 mt-4 sm:mt-6 mb-12">
          <CheckCircle className="text-green-500 w-5 h-5 sm:w-6 sm:h-6" />
          <h2 className="text-lg sm:text-xl font-semibold">Data Alamat</h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col gap-4 sm:gap-5 p-4 sm:p-6 md:p-8 lg:p-12 border rounded-xl mx-4 sm:mx-6 md:mx-8 lg:mx-12 bg-[var(--light-cream)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="provinsi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Provinsi <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          const province = provinces.find(
                            (p) => p.name === value
                          );
                          if (province) {
                            setSelectedProvinceId(
                              province.id_province.toString()
                            );
                            form.setValue("kota", "");
                          }
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Provinsi" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {provincesLoading ? (
                            <SelectItem value="loading" disabled>
                              Memuat...
                            </SelectItem>
                          ) : provinces.length === 0 ? (
                            <SelectItem value="empty" disabled>
                              Tidak ada data
                            </SelectItem>
                          ) : (
                            provinces.map((province) => (
                              <SelectItem
                                key={province.id_province}
                                value={province.name}
                              >
                                {province.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="kota"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Kota / Kabupaten <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!selectedProvinceId}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                !selectedProvinceId
                                  ? "Pilih provinsi terlebih dahulu"
                                  : "Pilih Kota/Kabupaten"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {citiesLoading ? (
                            <SelectItem value="loading" disabled>
                              Memuat...
                            </SelectItem>
                          ) : cities.length === 0 ? (
                            <SelectItem value="empty" disabled>
                              Tidak ada data
                            </SelectItem>
                          ) : (
                            cities.map((city) => (
                              <SelectItem key={city.id_city} value={city.name}>
                                {city.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="kecamatan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Kecamatan <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Kecamatan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="kelurahan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Kelurahan <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Kelurahan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="kodePos"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Kode Pos <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Kode Pos"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="namaDusun"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Nama Dusun <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Nama Dusun" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="alamatLengkap"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Alamat Lengkap <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Jl. Nama Jalan No. XX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex items-center justify-end my-6 sm:my-8 md:my-10 lg:my-12 px-4 sm:px-6 md:px-8 lg:px-12 gap-6">
              <Link href="/pendaftaran" className="w-1/2 sm:w-48">
                <Button type="button" variant={"yellow"} className={"w-full"}>
                  Kembali
                </Button>
              </Link>
              <Button
                type="submit"
                variant={"matcha"}
                className={"w-1/2 sm:w-48"}
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
