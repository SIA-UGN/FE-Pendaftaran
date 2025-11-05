"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle } from "lucide-react"

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export default function RegistrationProgress() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  })

  const pathname = usePathname()
  const [activeStep, setActiveStep] = useState("")

  // Ambil bagian terakhir path, misalnya /pendaftaran/data-alamat => "data-alamat"
  useEffect(() => {
    const path = pathname.split("/").pop() || ""
    setActiveStep(path)
  }, [pathname])

  // Daftar langkah pendaftaran + nilai progress custom
  const steps = [
    { href: "/pendaftaran/data-diri", label: "Data Diri", key: "data-diri", progress: 0 },
    { href: "/pendaftaran/data-alamat", label: "Data Alamat", key: "data-alamat", progress: 18 },
    { href: "/pendaftaran/data-orangtua", label: "Data Orang Tua", key: "data-orangtua", progress: 34 },
    { href: "/pendaftaran/data-akademik", label: "Data Akademik", key: "data-akademik", progress: 52 },
    { href: "/pendaftaran/data-prestasi", label: "Data Prestasi", key: "data-prestasi", progress: 68 },
    { href: "/pendaftaran/pembayaran", label: "Data Pembayaran", key: "pembayaran", progress: 86 },
  ]

  const activeIndex = steps.findIndex((s) => s.key === activeStep)

  // Dapatkan persentase progress bar (custom jika diset di steps)
  const progressPercent =
    activeIndex >= 0
      ? steps[activeIndex]?.progress ?? (activeIndex / (steps.length - 1)) * 100
      : 0

  // fungsi menentukan warna lingkaran dan kotak
  const getColor = (index) => {
    if (index < activeIndex) return "green" // sudah dilewati
    if (index === activeIndex) return "yellow" // sedang aktif
    return "red" // belum dilewati
  }

  function onSubmit(data) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <div className="sm:w-full w-0  h-0 sm:h-full max-w-11/12 p-0 sm:p-4 flex flex-col items-center gap-12 m-0 sm:mx-auto sm:my-12 sm:mb-6">
      <div className="flex flex-col gap-5 w-full items-center justify-center">
        <div className="flex gap-5 w-full flex-col-reverse">
        {/* === Progress bar === */}
        <div className="w-full relative hidden sm:grid grid-cols-6 gap-12 rounded-full">
          {/* garis abu-abu (dasar) */}
          <div className="absolute top-1/2 left-[7%] right-[7%] transform -translate-y-1/2 h-[4px] bg-gray-200 rounded-full z-0"></div>
          
          {/* garis hijau progress dinamis */}
          <div
            className="absolute top-1/2 left-[7%] transform -translate-y-1/2 h-[4px] bg-green-500 rounded-full z-0 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
          
          {/* ikon step */}
          {steps.map((step, index) => {
            const color = getColor(index)
            const colorClass =
              color === "green"
                ? "text-green-500"
                : color === "yellow"
                ? "text-yellow-500"
                : "text-red-500"
            return (
              <div
                key={step.key}
                className="h-8 flex justify-center items-center w-full z-10"
              >
                <CheckCircle className={`${colorClass} bg-white`} />
              </div>
            )
          })}
        </div>

          {/* === Step boxes === */}
          <div className="w-full none hidden md:grid grid-cols-6 gap-6 items-center">
            {steps.map((step, index) => {
              const color = getColor(index)
              const borderClass =
                color === "green"
                  ? "border-green-500 bg-green-50"
                  : color === "yellow"
                  ? "border-yellow-500 bg-yellow-50"
                  : "border-red-500 bg-red-50"

              return (
                <Link key={step.key} href={step.href}>
                  <div
                    className={`h-12 min-h-fit border rounded-lg p-4 flex items-center justify-center transition-all duration-300 ${borderClass}`}
                  >
                    <span>{step.label}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
