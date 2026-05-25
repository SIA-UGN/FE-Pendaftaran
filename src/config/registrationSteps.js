/**
 * registrationSteps.js
 *
 * Single source of truth untuk semua langkah pendaftaran.
 * Dipakai oleh:
 *   - useRegistrationFlow()   → prev / next route (dynamic skip)
 *   - RegistrationProgress    → progress bar (sudah filter sendiri, tapi bisa di-refaktor nanti)
 *
 * Properti tiap step:
 *   key   – slug unik, sama dengan folder di /pendaftaran/<key>
 *   code  – code section di backend (`registration_form_sections.code`).
 *           `null` berarti step ini selalu aktif (bukan bagian dari section visibility).
 *   href  – full path route
 *   label – teks tampilan untuk user
 */

export const REGISTRATION_STEPS = [
  {
    key: "data-diri",
    code: "profile",
    href: "/pendaftaran/data-diri",
    label: "Data Diri",
  },
  {
    key: "data-alamat",
    code: "profile",
    href: "/pendaftaran/data-alamat",
    label: "Data Alamat",
  },
  {
    key: "data-orangtua",
    code: "guardians",
    href: "/pendaftaran/data-orangtua",
    label: "Data Orang Tua",
  },
  {
    key: "data-akademik",
    code: "documents",
    href: "/pendaftaran/data-akademik",
    label: "Upload Dokumen",
  },
  {
    key: "data-prestasi",
    code: "achievements",
    href: "/pendaftaran/data-prestasi",
    label: "Data Prestasi",
  },
  {
    key: "pembayaran",
    code: null,
    href: "/pendaftaran/pembayaran",
    label: "Pembayaran",
  },
  {
    key: "status",
    code: null,
    href: "/pendaftaran/status",
    label: "Status",
  },
];
