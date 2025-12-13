"use client";

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
import Prestasi from "@/components/prestasi/Prestasi";
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

const FormSchema = z.object({
  uploadSertifikat: z.any().optional(),
  namaPrestasi: z.string().optional(),
  tahun: z.coerce.number().optional(),
  jenisPrestasi: z.string().optional(),
  tingkatPrestasi: z.string().optional(),
  penyelenggara: z.string().optional(),
  peringkat: z.string().optional(),
});

export default function DataPrestasi() {
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

  console.log(applicant);

  const data = applicant.steps.achievements;

  console.log(data);

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
          <h2 className="text-xl font-semibold">Data Prestasi</h2>
        </div>
      </div>

      <Prestasi Data={data} />

      <div className="w-full flex items-center justify-end my-12 px-12 gap-6">
        <Button variant={"green"}>Kembali</Button>
        <Link
          href={`/manager/verification/pembayaran?payment_id=${applicant.payment_info.id}&id=${id}`}
        >
          <Button variant="matcha">Lanjut</Button>
        </Link>
      </div>
    </>
  );
}
