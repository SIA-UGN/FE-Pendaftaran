"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
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

const FormSchema = z.object({
  programStudi: z.string().min(1, { message: "Program Studi wajib dipilih." }),
  programStudi2: z.string().optional(),
  programStudi3: z.string().optional(),
  sekolahAsal: z.string().min(3, { message: "Nama sekolah asal wajib diisi." }),
  ijazahTerakhir: z.string({
    required_error: "Ijazah terakhir harus dipilih.",
  }),
  namaLengkap: z.string().min(2, {
    message: "Nama Lengkap harus memiliki setidaknya 2 karakter.",
  }),
  email: z.email({
    message: "Silakan masukkan alamat email yang valid.",
  }),
  jenisKelamin: z.string().min(1, { message: "Jenis Kelamin wajib diisi." }),
  agama: z.string().min(1, { message: "Agama wajib diisi." }),
  noPonsel: z.string().min(10, { message: "Nomor Ponsel tidak valid." }),
  tempatLahir: z.string().min(1, { message: "Tempat Lahir wajib diisi." }),
  tanggalLahir: z.string().refine(
    (date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate < today;
    },
    { message: "Tanggal lahir harus sebelum hari ini." }
  ),
  nik: z.string().length(16, { message: "NIK harus 16 digit." }),
  ktp: z.any().refine((file) => file != null, {
    message: "File KTP/KITAS wajib diupload.",
  }),
  noAkta: z.string().optional(),
  akta: z.any().optional(),
  noKK: z.string().length(16, { message: "Nomor KK harus 16 digit." }),
  kk: z.any().refine((file) => file != null, {
    message: "File Kartu Keluarga wajib diupload.",
  }),
  kewarganegaraan: z
    .string()
    .min(1, { message: "Kewarganegaraan wajib diisi." }),
  anakKe: z.coerce.number().min(1, { message: "Anak ke berapa wajib diisi." }),
  jumlahSaudara: z.coerce
    .number()
    .min(0, { message: "Jumlah saudara wajib diisi." }),
});

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

  // Form Visibility — Hook & Route Guard
  const { data: activeSections = [], isLoading: sectionsLoading } = useVisibleSections();
  
  // Ambil section profile
  const profileSection = useMemo(() => {
    return activeSections.find((s) => s.code === "profile");
  }, [activeSections]);

  // Fetch field-level visibility
  const { data: visibleFields = [], isLoading: fieldsLoading } = useVisibleFields(profileSection?.id);

  // Helper untuk cek visibilitas field
  const isFieldVisible = useMemo(() => {
    return (fieldCode) => {
      return visibleFields.some((f) => f.code === fieldCode);
    };
  }, [visibleFields]);

  // Helper untuk cek apakah field required
  const isFieldRequired = useMemo(() => {
    return (fieldCode) => {
      const field = visibleFields.find((f) => f.code === fieldCode);
      return field ? field.is_required : true; // Default ke true jika tidak ditemukan
    };
  }, [visibleFields]);

  // Zod validation schema dinamis berdasarkan visibilitas & status required
  const DynamicFormSchema = useMemo(() => {
    return z.object({
      programStudi: isFieldVisible("programStudi")
        ? (isFieldRequired("programStudi") ? z.string().min(1, { message: "Program Studi wajib dipilih." }) : z.string().optional())
        : z.string().optional(),
      programStudi2: z.string().optional(),
      programStudi3: z.string().optional(),
      sekolahAsal: isFieldVisible("sekolahAsal")
        ? (isFieldRequired("sekolahAsal") ? z.string().min(3, { message: "Nama sekolah asal wajib diisi." }) : z.string().optional())
        : z.string().optional(),
      ijazahTerakhir: isFieldVisible("ijazahTerakhir")
        ? (isFieldRequired("ijazahTerakhir") ? z.string({ required_error: "Ijazah terakhir harus dipilih." }) : z.string().optional())
        : z.string().optional(),
      namaLengkap: isFieldVisible("namaLengkap")
        ? (isFieldRequired("namaLengkap") ? z.string().min(2, { message: "Nama Lengkap harus memiliki setidaknya 2 karakter." }) : z.string().optional())
        : z.string().optional(),
      email: isFieldVisible("email")
        ? (isFieldRequired("email") ? z.string().email({ message: "Silakan masukkan alamat email yang valid." }) : z.string().optional())
        : z.string().optional(),
      jenisKelamin: isFieldVisible("jenisKelamin")
        ? (isFieldRequired("jenisKelamin") ? z.string().min(1, { message: "Jenis Kelamin wajib diisi." }) : z.string().optional())
        : z.string().optional(),
      agama: isFieldVisible("agama")
        ? (isFieldRequired("agama") ? z.string().min(1, { message: "Agama wajib diisi." }) : z.string().optional())
        : z.string().optional(),
      noPonsel: isFieldVisible("noPonsel")
        ? (isFieldRequired("noPonsel") ? z.string().min(10, { message: "Nomor Ponsel tidak valid." }) : z.string().optional())
        : z.string().optional(),
      tempatLahir: isFieldVisible("tempatLahir")
        ? (isFieldRequired("tempatLahir") ? z.string().min(1, { message: "Tempat Lahir wajib diisi." }) : z.string().optional())
        : z.string().optional(),
      tanggalLahir: isFieldVisible("tanggalLahir")
        ? (isFieldRequired("tanggalLahir")
            ? z.string().refine(
                (date) => {
                  if (!date) return false;
                  const selectedDate = new Date(date);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return selectedDate < today;
                },
                { message: "Tanggal lahir harus sebelum hari ini." }
              )
            : z.string().optional())
        : z.string().optional(),
      nik: isFieldVisible("nik")
        ? (isFieldRequired("nik") ? z.string().length(16, { message: "NIK harus 16 digit." }) : z.string().optional())
        : z.string().optional(),
      ktp: isFieldVisible("ktp")
        ? (isFieldRequired("ktp") ? z.any().refine((file) => file != null, { message: "File KTP/KITAS wajib diupload." }) : z.any().optional())
        : z.any().optional(),
      noAkta: z.string().optional(),
      akta: z.any().optional(),
      noKK: isFieldVisible("noKK")
        ? (isFieldRequired("noKK") ? z.string().length(16, { message: "Nomor KK harus 16 digit." }) : z.string().optional())
        : z.string().optional(),
      kk: isFieldVisible("kk")
        ? (isFieldRequired("kk") ? z.any().refine((file) => file != null, { message: "File Kartu Keluarga wajib diupload." }) : z.any().optional())
        : z.any().optional(),
      kewarganegaraan: isFieldVisible("kewarganegaraan")
        ? (isFieldRequired("kewarganegaraan") ? z.string().min(1, { message: "Kewarganegaraan wajib diisi." }) : z.string().optional())
        : z.string().optional(),
      anakKe: isFieldVisible("anakKe")
        ? (isFieldRequired("anakKe") ? z.coerce.number().min(1, { message: "Anak ke berapa wajib diisi." }) : z.any().optional())
        : z.any().optional(),
      jumlahSaudara: isFieldVisible("jumlahSaudara")
        ? (isFieldRequired("jumlahSaudara") ? z.coerce.number().min(0, { message: "Jumlah saudara wajib diisi." }) : z.any().optional())
        : z.any().optional(),
    });
  }, [isFieldRequired, isFieldVisible]);

  const [filePreviews, setFilePreviews] = useState({
    ktp: null,
    akta: null,
    kk: null,
  });

  const form = useForm({
    resolver: (...args) => zodResolver(DynamicFormSchema)(...args),
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

  // Route Guard Effect
  useEffect(() => {
    if (!sectionsLoading && activeSections.length > 0) {
      const isProfileActive = activeSections.some((s) => s.code === "profile");
      if (!isProfileActive) {
        toast.error("Form data diri sedang dinonaktifkan oleh administrator.");
        router.push("/pendaftaran");
      }
    }
  }, [activeSections, sectionsLoading, router]);

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

  async function onSubmit(data) {
    const formData = new FormData();

    formData.append("id_program", data.programStudi);

    if (data.programStudi2) {
      formData.append("id_program_2", data.programStudi2);
    }
    if (data.programStudi3) {
      formData.append("id_program_3", data.programStudi3);
    }

    formData.append("previous_school", data.sekolahAsal);

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

    formData.append("full_name", data.namaLengkap);
    formData.append("email", data.email);
    formData.append(
      "gender",
      data.jenisKelamin === "male" ? "Laki-laki" : "Perempuan"
    );
    formData.append("religion", data.agama);
    formData.append("phone_number", data.noPonsel);
    formData.append("birth_place", data.tempatLahir);
    formData.append("birth_date", data.tanggalLahir);
    formData.append("nik", data.nik);
    formData.append("citizenship", data.kewarganegaraan);
    formData.append("birth_order", parseInt(data.anakKe));
    formData.append("number_of_siblings", parseInt(data.jumlahSaudara));

    if (data.noAkta) {
      formData.append("birth_certificate_number", data.noAkta);
    }
    if (data.noKK) {
      formData.append("no_kk", data.noKK);
    }

    storeMutation.mutate(formData, {
      onSuccess: async () => {
        const uploadPromises = [];
        if (data.ktp && data.ktp instanceof File) {
          const fd = new FormData();
          fd.append("id_document_type", "1");
          fd.append("file", data.ktp);
          uploadPromises.push(uploadDocument.mutateAsync(fd));
        }
        if (data.akta && data.akta instanceof File) {
          const fd = new FormData();
          fd.append("id_document_type", "2");
          fd.append("file", data.akta);
          uploadPromises.push(uploadDocument.mutateAsync(fd));
        }
        if (data.kk && data.kk instanceof File) {
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

  if (progressLoading || sectionsLoading || fieldsLoading) {
    return (
      <ProtectedRoute>
        <div className="max-w-7xl mx-auto p-12">
          <div className="animate-pulse flex items-center justify-center min-h-[50vh] text-gray-500">Memuat formulir...</div>
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
              {isFieldVisible("namaLengkap") && (
                <FormField
                  control={form.control}
                  name="namaLengkap"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Nama Lengkap {isFieldRequired("namaLengkap") && <span className="text-red-500">*</span>}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Nama Lengkap" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {isFieldVisible("email") && (
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email {isFieldRequired("email") && <span className="text-red-500">*</span>}
                      </FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {isFieldVisible("programStudi") && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="programStudi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Program Studi {isFieldRequired("programStudi") && <span className="text-red-500">*</span>}
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

              {isFieldVisible("sekolahAsal") && (
                <FormField
                  control={form.control}
                  name="sekolahAsal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Sekolah Asal {isFieldRequired("sekolahAsal") && <span className="text-red-500">*</span>}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Nama sekolah asal" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {isFieldVisible("ijazahTerakhir") && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="ijazahTerakhir"
                    render={({ field }) => (
                      <FormItem className={"w-full"}>
                        <FormLabel>
                          Ijazah Terakhir {isFieldRequired("ijazahTerakhir") && <span className="text-red-500">*</span>}
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
                {isFieldVisible("jenisKelamin") && (
                  <FormField
                    control={form.control}
                    name="jenisKelamin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Jenis Kelamin {isFieldRequired("jenisKelamin") && <span className="text-red-500">*</span>}
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

                {isFieldVisible("agama") && (
                  <FormField
                    control={form.control}
                    name="agama"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Agama {isFieldRequired("agama") && <span className="text-red-500">*</span>}
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

                {isFieldVisible("noPonsel") && (
                  <FormField
                    control={form.control}
                    name="noPonsel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Nomor Ponsel {isFieldRequired("noPonsel") && <span className="text-red-500">*</span>}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="08xxxxxxxx" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {isFieldVisible("tempatLahir") && (
                  <FormField
                    control={form.control}
                    name="tempatLahir"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Tempat Lahir {isFieldRequired("tempatLahir") && <span className="text-red-500">*</span>}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Tempat Lahir" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {isFieldVisible("tanggalLahir") && (
                  <FormField
                    control={form.control}
                    name="tanggalLahir"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Tanggal Lahir {isFieldRequired("tanggalLahir") && <span className="text-red-500">*</span>}
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

                {isFieldVisible("nik") && (
                  <FormField
                    control={form.control}
                    name="nik"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          NIK {isFieldRequired("nik") && <span className="text-red-500">*</span>}
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

              {isFieldVisible("ktp") && (
                <FormField
                  control={form.control}
                  name="ktp"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel>
                        KTP / KITAS {isFieldRequired("ktp") && <span className="text-red-500">*</span>}
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

              {isFieldVisible("noAkta") && (
                <FormField
                  control={form.control}
                  name="noAkta"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor Registrasi Akta Lahir</FormLabel>
                      <FormControl>
                        <Input placeholder="Nomor Akta" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {isFieldVisible("akta") && (
                <FormField
                  control={form.control}
                  name="akta"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel>Akta Kelahiran</FormLabel>
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

              {isFieldVisible("noKK") && (
                <FormField
                  control={form.control}
                  name="noKK"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Nomor Kartu Keluarga {isFieldRequired("noKK") && <span className="text-red-500">*</span>}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Nomor KK" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {isFieldVisible("kk") && (
                <FormField
                  control={form.control}
                  name="kk"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel>
                        Kartu Keluarga {isFieldRequired("kk") && <span className="text-red-500">*</span>}
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

              {isFieldVisible("kewarganegaraan") && (
                <FormField
                  control={form.control}
                  name="kewarganegaraan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Kewarganegaraan {isFieldRequired("kewarganegaraan") && <span className="text-red-500">*</span>}
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
                {isFieldVisible("anakKe") && (
                  <FormField
                    control={form.control}
                    name="anakKe"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Anak ke Berapa {isFieldRequired("anakKe") && <span className="text-red-500">*</span>}
                        </FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {isFieldVisible("jumlahSaudara") && (
                  <FormField
                    control={form.control}
                    name="jumlahSaudara"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Jumlah Saudara Kandung {isFieldRequired("jumlahSaudara") && <span className="text-red-500">*</span>}
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
