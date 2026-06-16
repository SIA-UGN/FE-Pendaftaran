"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useUploadDocument } from "@/hooks/useRegistration";
import { CheckCircle, Upload, X, FileText } from "lucide-react";
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
  useStoreProfile,
  useMyRegistration,
} from "@/hooks/useRegistration";
import { usePrograms } from "@/hooks/useMasterData";
import { useRegistrationFlow } from "@/hooks/useRegistrationFlow";
import { useVisibleSections, useVisibleFields } from "@/hooks/useFormVisibility";

// ============================================================
// Validator per-field (code harus sama dengan field code di BE).
// `required` dipakai saat field wajib, `optional` saat opsional.
// Schema dibangun dinamis dari config visibility agar field yang
// di-hide oleh admin tidak ikut divalidasi.
// ============================================================
const FIELD_VALIDATORS = {
  namaLengkap: {
    required: z.string().min(2, { message: "Nama Lengkap harus memiliki setidaknya 2 karakter." }),
    optional: z.string().optional(),
  },
  email: {
    required: z.email({ message: "Silakan masukkan alamat email yang valid." }),
    optional: z.union([z.literal(""), z.email({ message: "Silakan masukkan alamat email yang valid." })]).optional(),
  },
  programStudi: {
    required: z.string().min(1, { message: "Program Studi wajib dipilih." }),
    optional: z.string().optional(),
  },
  sekolahAsal: {
    required: z.string().min(3, { message: "Nama sekolah asal wajib diisi." }),
    optional: z.string().optional(),
  },
  ijazahTerakhir: {
    required: z.string().min(1, { message: "Ijazah terakhir harus dipilih." }),
    optional: z.string().optional(),
  },
  jenisKelamin: {
    required: z.string().min(1, { message: "Jenis Kelamin wajib diisi." }),
    optional: z.string().optional(),
  },
  agama: {
    required: z.string().min(1, { message: "Agama wajib diisi." }),
    optional: z.string().optional(),
  },
  noPonsel: {
    required: z.string().min(10, { message: "Nomor Ponsel tidak valid." }),
    optional: z.string().optional(),
  },
  tempatLahir: {
    required: z.string().min(1, { message: "Tempat Lahir wajib diisi." }),
    optional: z.string().optional(),
  },
  tanggalLahir: {
    required: z.string().refine(
      (date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate < today;
      },
      { message: "Tanggal lahir harus sebelum hari ini." }
    ),
    optional: z.string().optional(),
  },
  nik: {
    required: z.string().length(16, { message: "NIK harus 16 digit." }),
    optional: z.union([z.literal(""), z.string().length(16, { message: "NIK harus 16 digit." })]).optional(),
  },
  ktp: {
    required: z.any().refine((file) => file != null, { message: "File KTP/KITAS wajib diupload." }),
    optional: z.any().optional(),
  },
  noAkta: {
    required: z.string().min(1, { message: "Nomor Akta wajib diisi." }),
    optional: z.string().optional(),
  },
  akta: {
    required: z.any().refine((file) => file != null, { message: "File Akta wajib diupload." }),
    optional: z.any().optional(),
  },
  noKK: {
    required: z.string().length(16, { message: "Nomor KK harus 16 digit." }),
    optional: z.union([z.literal(""), z.string().length(16, { message: "Nomor KK harus 16 digit." })]).optional(),
  },
  kk: {
    required: z.any().refine((file) => file != null, { message: "File Kartu Keluarga wajib diupload." }),
    optional: z.any().optional(),
  },
  kewarganegaraan: {
    required: z.string().min(1, { message: "Kewarganegaraan wajib diisi." }),
    optional: z.string().optional(),
  },
  anakKe: {
    required: z.coerce.number().min(1, { message: "Anak ke berapa wajib diisi." }),
    optional: z.union([z.literal(""), z.coerce.number()]).optional(),
  },
  jumlahSaudara: {
    required: z.coerce.number().min(0, { message: "Jumlah saudara wajib diisi." }),
    optional: z.union([z.literal(""), z.coerce.number()]).optional(),
  },
};

// Default required mengikuti seeder BE (noAkta & akta opsional, sisanya wajib).
// Dipakai sebagai fallback saat config visibility belum termuat.
const DEFAULT_REQUIRED = Object.fromEntries(
  Object.keys(FIELD_VALIDATORS).map((code) => [code, !["noAkta", "akta"].includes(code)])
);

// Bangun schema zod hanya dari field yang visible; required mengikuti config.
function buildDataDiriSchema(isVisible, isRequired) {
  const shape = {};
  for (const [code, rules] of Object.entries(FIELD_VALIDATORS)) {
    if (!isVisible(code)) continue;
    shape[code] = isRequired(code) ? rules.required : rules.optional;
  }
  // Program Studi 2 & 3 tidak punya field code di BE → ikut visibilitas programStudi, selalu opsional.
  shape.programStudi2 = z.string().optional();
  shape.programStudi3 = z.string().optional();
  return z.object(shape);
}

export default function DataDiri() {
  const router = useRouter();
  const { prevRoute, nextRoute } = useRegistrationFlow();
  const { data: progressData, isLoading: progressLoading } =
    useRegistrationProgress();
  const { data: registrationData, refetch } = useMyRegistration();
  const storeMutation = useStoreProfile();
  const uploadDocument = useUploadDocument();
  const { data: programsData } = usePrograms();

  const progress = progressData?.data;
  const programs = programsData?.data?.data || [];

  // ── Form Visibility (section: profile) ──────────────────────────────
  // Endpoint publik hanya mengembalikan section & field yang is_visible=true.
  const { data: visibleSections = [], isLoading: sectionsLoading } =
    useVisibleSections();
  const profileSection = visibleSections.find((s) => s.code === "profile");
  const { data: profileFields = [], isLoading: fieldsLoading } =
    useVisibleFields(profileSection?.id ?? null);

  const visConfig = useMemo(() => {
    const codes = new Set(profileFields.map((f) => f.code));
    const requiredMap = {};
    profileFields.forEach((f) => {
      requiredMap[f.code] = !!f.is_required;
    });
    const loading = sectionsLoading || (!!profileSection && fieldsLoading);
    // hasConfig=false → BE belum punya konfigurasi field → fallback tampilkan semua.
    const hasConfig = profileFields.length > 0;
    return { codes, requiredMap, loading, hasConfig };
  }, [profileFields, sectionsLoading, fieldsLoading, profileSection]);

  // Field tampil bila: masih loading / belum ada config (fallback aman), atau code ada di daftar visible.
  const show = useCallback(
    (code) => {
      if (visConfig.loading || !visConfig.hasConfig) return true;
      return visConfig.codes.has(code);
    },
    [visConfig]
  );

  // Required mengikuti config; fallback ke default seeder bila config belum ada.
  const req = useCallback(
    (code) => {
      if (visConfig.loading || !visConfig.hasConfig || !visConfig.codes.has(code)) {
        return DEFAULT_REQUIRED[code] ?? true;
      }
      return visConfig.requiredMap[code];
    },
    [visConfig]
  );

  // Schema disimpan di ref agar resolver selalu memakai versi terbaru
  // tanpa perlu re-create instance useForm.
  const schemaRef = useRef(null);
  if (!schemaRef.current) {
    schemaRef.current = buildDataDiriSchema(
      () => true,
      (code) => DEFAULT_REQUIRED[code] ?? true
    );
  }

  const [filePreviews, setFilePreviews] = useState({
    ktp: null,
    akta: null,
    kk: null,
  });

  const form = useForm({
    resolver: (values, context, options) =>
      zodResolver(schemaRef.current)(values, context, options),
    defaultValues: {
      programStudi: "",
      programStudi2: "",
      programStudi3: "",
      sekolahAsal: "",
      ijazahTerakhir: "",
      namaLengkap: "",
      email: "",
      jenisKelamin: "",
      agama: "",
      noPonsel: "",
      tempatLahir: "",
      tanggalLahir: "",
      nik: "",
      ktp: null,
      noAkta: "",
      akta: null,
      noKK: "",
      kk: null,
      kewarganegaraan: "",
      anakKe: "",
      jumlahSaudara: "",
    },
  });

  // Sinkronkan schema setiap config visibility berubah.
  useEffect(() => {
    schemaRef.current = buildDataDiriSchema(show, req);
  }, [show, req]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    const profile = registrationData?.data?.data?.profile;
    if (profile) {
      const graduationStatusReverseMap = {
        "Sudah Lulus": "graduated",
        "Belum Lulus": "not_graduated",
      };

      const ijazahReverseMap = {
        SMA: "sma",
        SMK: "smk",
        MA: "ma",
        Lainnya: "other",
      };

      form.reset({
        programStudi: profile.id_program?.toString() || "",
        sekolahAsal: profile.previous_school || "",
        ijazahTerakhir:
          ijazahReverseMap[profile.last_ijazah] ||
          profile.last_ijazah?.toLowerCase() ||
          "",
        namaLengkap: profile.full_name || "",
        email: profile.email || "",
        jenisKelamin:
          profile.gender === "Laki-laki"
            ? "male"
            : profile.gender === "Perempuan"
            ? "female"
            : "",
        agama: profile.religion || "",
        noPonsel: profile.phone_number || "",
        tempatLahir: profile.birth_place || "",
        tanggalLahir: profile.birth_date
          ? profile.birth_date.split("T")[0]
          : "",
        nik: profile.nik || "",
        ktp: null,
        noAkta: profile.birth_certificate_number || "",
        akta: null,
        noKK: profile.no_kk || "",
        kk: null,
        kewarganegaraan: profile.citizenship || "",
        anakKe: profile.birth_order?.toString() || "",
        jumlahSaudara: profile.number_of_siblings?.toString() || "",
      });
    }
  }, [registrationData, form]);

  const handleFileChange = (fieldName, event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];
    if (!validTypes.includes(file.type)) {
      toast.error("Hanya file JPG, PNG, atau PDF yang diperbolehkan");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 2MB");
      return;
    }

    form.setValue(fieldName, file);

    setFilePreviews((prev) => ({ ...prev, [fieldName]: file.name }));
  };

  const handleRemoveFile = (fieldName) => {
    form.setValue(fieldName, null);
    setFilePreviews((prev) => ({ ...prev, [fieldName]: null }));
  };

  // Tanda wajib (*) yang mengikuti config required.
  const RequiredMark = ({ code }) =>
    req(code) ? <span className="text-red-500">*</span> : null;

  async function onSubmit(data) {
    const formData = new FormData();

    // Hanya kirim field yang visible (di-hide admin → tidak dikumpulkan).
    if (show("programStudi")) {
      formData.append("id_program", data.programStudi);
      if (data.programStudi2) {
        formData.append("id_program_2", data.programStudi2);
      }
      if (data.programStudi3) {
        formData.append("id_program_3", data.programStudi3);
      }
    }

    if (show("sekolahAsal")) {
      formData.append("previous_school", data.sekolahAsal);
    }

    if (show("ijazahTerakhir")) {
      const ijazahMap = {
        sma: "SMA",
        smk: "SMK",
        ma: "MA",
        other: "Lainnya",
      };
      formData.append(
        "last_ijazah",
        ijazahMap[data.ijazahTerakhir] || data.ijazahTerakhir
      );
    }

    if (show("namaLengkap")) formData.append("full_name", data.namaLengkap);
    if (show("email")) formData.append("email", data.email);
    if (show("jenisKelamin")) {
      formData.append(
        "gender",
        data.jenisKelamin === "male" ? "Laki-laki" : "Perempuan"
      );
    }
    if (show("agama")) formData.append("religion", data.agama);
    if (show("noPonsel")) formData.append("phone_number", data.noPonsel);
    if (show("tempatLahir")) formData.append("birth_place", data.tempatLahir);
    if (show("tanggalLahir")) formData.append("birth_date", data.tanggalLahir);
    if (show("nik")) formData.append("nik", data.nik);
    if (show("kewarganegaraan"))
      formData.append("citizenship", data.kewarganegaraan);
    if (show("anakKe")) formData.append("birth_order", parseInt(data.anakKe));
    if (show("jumlahSaudara"))
      formData.append("number_of_siblings", parseInt(data.jumlahSaudara));

    if (show("noAkta") && data.noAkta) {
      formData.append("birth_certificate_number", data.noAkta);
    }
    if (show("noKK") && data.noKK) {
      formData.append("no_kk", data.noKK);
    }

    storeMutation.mutate(formData, {
      onSuccess: async () => {
        const uploadPromises = [];
        if (show("ktp") && data.ktp && data.ktp instanceof File) {
          const fd = new FormData();
          fd.append("id_document_type", "1");
          fd.append("file", data.ktp);
          uploadPromises.push(uploadDocument.mutateAsync(fd));
        }
        if (show("akta") && data.akta && data.akta instanceof File) {
          const fd = new FormData();
          fd.append("id_document_type", "2");
          fd.append("file", data.akta);
          uploadPromises.push(uploadDocument.mutateAsync(fd));
        }
        if (show("kk") && data.kk && data.kk instanceof File) {
          const fd = new FormData();
          fd.append("id_document_type", "3");
          fd.append("file", data.kk);
          uploadPromises.push(uploadDocument.mutateAsync(fd));
        }
        await Promise.all(uploadPromises);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push(nextRoute);
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

        <div className="flex items-center gap-2 mx-4 sm:mx-8 md:mx-12 mt-4 sm:mt-6 mb-12">
          <CheckCircle className="text-green-500 w-5 h-5 sm:w-6 sm:h-6" />
          <h2 className="text-lg sm:text-xl font-semibold">Data Diri</h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col gap-4 sm:gap-5 p-4 sm:p-8 md:p-12 border rounded-xl mx-4 sm:mx-8 md:mx-12 bg-[var(--light-cream)]">
              {show("namaLengkap") && (
                <FormField
                  control={form.control}
                  name="namaLengkap"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Nama Lengkap <RequiredMark code="namaLengkap" />
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Nama Lengkap" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {show("email") && (
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email <RequiredMark code="email" />
                      </FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {show("programStudi") && (
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="programStudi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Program Studi <RequiredMark code="programStudi" />
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih Program Studi" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {programs.map((program) => (
                              <SelectItem
                                key={program.id_program}
                                value={program.id_program.toString()}
                              >
                                {program.name_program}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="programStudi2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Program Studi 2</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih Program Studi" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {programs.map((program) => (
                              <SelectItem
                                key={program.id_program}
                                value={program.id_program.toString()}
                              >
                                {program.name_program}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="programStudi3"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Program Studi 3</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih Program Studi" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {programs.map((program) => (
                              <SelectItem
                                key={program.id_program}
                                value={program.id_program.toString()}
                              >
                                {program.name_program}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {show("sekolahAsal") && (
                <FormField
                  control={form.control}
                  name="sekolahAsal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Sekolah Asal <RequiredMark code="sekolahAsal" />
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Nama sekolah asal" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {show("ijazahTerakhir") && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="ijazahTerakhir"
                    render={({ field }) => (
                      <FormItem className={"w-full"}>
                        <FormLabel>
                          Ijazah Terakhir <RequiredMark code="ijazahTerakhir" />
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih ijazah terakhir" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="sma">SMA</SelectItem>
                            <SelectItem value="smk">SMK</SelectItem>
                            <SelectItem value="ma">MA</SelectItem>
                            <SelectItem value="other">Lainnya</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {show("jenisKelamin") && (
                  <FormField
                    control={form.control}
                    name="jenisKelamin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Jenis Kelamin <RequiredMark code="jenisKelamin" />
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl className={"w-full"}>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih Jenis Kelamin" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Laki-laki</SelectItem>
                            <SelectItem value="female">Perempuan</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {show("agama") && (
                  <FormField
                    control={form.control}
                    name="agama"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Agama <RequiredMark code="agama" />
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl className={"w-full"}>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih Agama" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="islam">Islam</SelectItem>
                            <SelectItem value="kristen">Kristen</SelectItem>
                            <SelectItem value="katolik">Katolik</SelectItem>
                            <SelectItem value="hindu">Hindu</SelectItem>
                            <SelectItem value="buddha">Buddha</SelectItem>
                            <SelectItem value="konghucu">Konghucu</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {show("noPonsel") && (
                  <FormField
                    control={form.control}
                    name="noPonsel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Nomer Ponsel <RequiredMark code="noPonsel" />
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="08xxxxxxxx" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {show("tempatLahir") && (
                  <FormField
                    control={form.control}
                    name="tempatLahir"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Tempat Lahir <RequiredMark code="tempatLahir" />
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Tempat Lahir" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {show("tanggalLahir") && (
                  <FormField
                    control={form.control}
                    name="tanggalLahir"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Tanggal Lahir <RequiredMark code="tanggalLahir" />
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            max={new Date().toISOString().split("T")[0]}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {show("nik") && (
                  <FormField
                    control={form.control}
                    name="nik"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          NIK <RequiredMark code="nik" />
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="NIK" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              {show("ktp") && (
                <FormField
                  control={form.control}
                  name="ktp"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel>
                        KTP / KITAS <RequiredMark code="ktp" />
                      </FormLabel>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center bg-white">
                        {!filePreviews.ktp ? (
                          <div className="">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="mt-4">
                              <label
                                htmlFor="ktp"
                                className="cursor-pointer text-blue-600 hover:text-blue-500"
                              >
                                <span>Pilih file</span>
                                <input
                                  id="ktp"
                                  type="file"
                                  className="sr-only"
                                  accept=".pdf,.jpg,.jpeg,.png"
                                  onChange={(e) => handleFileChange("ktp", e)}
                                />
                              </label>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                              JPG, PNG, atau PDF, maksimal 2MB
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between bg-white p-3 rounded">
                            <div className="flex items-center gap-2">
                              <FileText className="h-5 w-5 text-blue-600" />
                              <span className="text-sm">{filePreviews.ktp}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile("ktp")}
                              className="text-red-600 hover:text-red-500"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {show("noAkta") && (
                <FormField
                  control={form.control}
                  name="noAkta"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Nomor Registrasi Akta Lahir <RequiredMark code="noAkta" />
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Nomor Akta" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {show("akta") && (
                <FormField
                  control={form.control}
                  name="akta"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel>
                        Akta Kelahiran <RequiredMark code="akta" />
                      </FormLabel>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center bg-white">
                        {!filePreviews.akta ? (
                          <div>
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="mt-4">
                              <label
                                htmlFor="akta"
                                className="cursor-pointer text-blue-600 hover:text-blue-500"
                              >
                                <span>Pilih file</span>
                                <input
                                  id="akta"
                                  type="file"
                                  className="sr-only"
                                  accept=".pdf,.jpg,.jpeg,.png"
                                  onChange={(e) => handleFileChange("akta", e)}
                                />
                              </label>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                              JPG, PNG, atau PDF, maksimal 2MB
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between bg-white p-3 rounded">
                            <div className="flex items-center gap-2">
                              <FileText className="h-5 w-5 text-blue-600" />
                              <span className="text-sm">{filePreviews.akta}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile("akta")}
                              className="text-red-600 hover:text-red-500"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {show("noKK") && (
                <FormField
                  control={form.control}
                  name="noKK"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Nomor Kartu Keluarga <RequiredMark code="noKK" />
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Nomor KK" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {show("kk") && (
                <FormField
                  control={form.control}
                  name="kk"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel>
                        Kartu Keluarga <RequiredMark code="kk" />
                      </FormLabel>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center bg-white">
                        {!filePreviews.kk ? (
                          <div>
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="mt-4">
                              <label
                                htmlFor="kk"
                                className="cursor-pointer text-blue-600 hover:text-blue-500"
                              >
                                <span>Pilih file</span>
                                <input
                                  id="kk"
                                  type="file"
                                  className="sr-only"
                                  accept=".pdf,.jpg,.jpeg,.png"
                                  onChange={(e) => handleFileChange("kk", e)}
                                />
                              </label>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                              JPG, PNG, atau PDF, maksimal 2MB
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between bg-white p-3 rounded">
                            <div className="flex items-center gap-2">
                              <FileText className="h-5 w-5 text-blue-600" />
                              <span className="text-sm">{filePreviews.kk}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile("kk")}
                              className="text-red-600 hover:text-red-500"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {show("kewarganegaraan") && (
                <FormField
                  control={form.control}
                  name="kewarganegaraan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Kewarganegaraan <RequiredMark code="kewarganegaraan" />
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl className={"w-full"}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Kewarganegaraan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="wni">WNI</SelectItem>
                          <SelectItem value="wna">WNA</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {show("anakKe") && (
                  <FormField
                    control={form.control}
                    name="anakKe"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Anak ke Berapa <RequiredMark code="anakKe" />
                        </FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {show("jumlahSaudara") && (
                  <FormField
                    control={form.control}
                    name="jumlahSaudara"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Jumlah Saudara Kandung{" "}
                          <RequiredMark code="jumlahSaudara" />
                        </FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>
            <div className="w-full flex items-center justify-end my-8 sm:my-12 px-4 sm:px-8 md:px-12 gap-4">
              <Link href={prevRoute} className="w-1/2 sm:w-48">
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
