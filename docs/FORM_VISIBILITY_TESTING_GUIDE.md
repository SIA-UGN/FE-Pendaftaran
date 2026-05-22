# Panduan Testing: Form Visibility Frontend Integration

Panduan ini menjelaskan langkah-langkah testing fitur **Form Visibility Management** yang telah diintegrasikan pada frontend `FE-Pendaftaran`. Dokumen ini mencakup setup environment, skenario testing manual, dan tips debugging.

---

## 📋 Daftar Perubahan yang Perlu Di-test

| No | File | Perubahan |
|----|------|-----------|
| 1 | `src/services/registrationService.js` | Penambahan method API Form Visibility |
| 2 | `src/hooks/useFormVisibility.js` | Hook baru: `useVisibleSections`, `useAdminSections`, mutations |
| 3 | `src/components/registrations/RegistrationProgress.js` | Progress bar dinamis berdasarkan section aktif |
| 4 | `src/app/(public)/pendaftaran/page.js` | Navigasi "Lanjut" dinamis — skip section non-aktif |
| 5 | `src/app/(public)/pendaftaran/data-orangtua/page.js` | Route guard — redirect jika `guardians` non-aktif |
| 6 | `src/app/(public)/pendaftaran/data-akademik/page.js` | Route guard — redirect jika `documents` non-aktif |
| 7 | `src/app/(public)/pendaftaran/data-prestasi/page.js` | Route guard — redirect jika `achievements` non-aktif |

---

## 🛠️ Setup Environment

### Prasyarat

1. **Backend** (`Be-Pendaftaran`) sudah berjalan dan endpoint Form Visibility API tersedia:
   - `GET /api/registration-form/sections` (public)
   - `GET /api/admin/registration-form/sections` (admin)
   - `PATCH /api/admin/registration-form/sections/{id}/visibility` (admin)
   - `PATCH /api/admin/registration-form/sections/batch-visibility` (admin)

2. **Frontend** (`FE-Pendaftaran`) sudah ter-install dependency-nya.

### Langkah Setup

```bash
# 1. Masuk ke direktori frontend
cd FE-Pendaftaran

# 2. Install dependencies (jika belum)
npm install

# 3. Pastikan .env mengarah ke backend yang benar
# Buka file .env dan periksa NEXT_PUBLIC_API_URL
cat .env
# Contoh isi:
# NEXT_PUBLIC_API_URL=http://localhost:8000/api

# 4. Jalankan dev server
npm run dev
```

### Menyiapkan Data di Backend

Sebelum testing, pastikan backend sudah memiliki data section pada tabel `registration_form_sections`. Jalankan seeder jika perlu:

```bash
# Di direktori Be-Pendaftaran
cd Be-Pendaftaran
php artisan db:seed --class=RegistrationFormSectionSeeder
```

Verifikasi data tersedia melalui API:

```bash
# Public endpoint — hanya menampilkan section aktif (is_visible: true)
curl http://localhost:8000/api/registration-form/sections

# Admin endpoint — menampilkan SEMUA section
curl -H "Authorization: Bearer <ADMIN_TOKEN>" \
  http://localhost:8000/api/admin/registration-form/sections
```

---

## 🧪 Skenario Testing

### Skenario 1: Progress Bar Dinamis

**Tujuan:** Memastikan progress bar hanya menampilkan section yang aktif.

| Step | Aksi | Hasil yang Diharapkan |
|------|------|-----------------------|
| 1.1 | Login sebagai pendaftar, buka `/pendaftaran/data-diri` | Progress bar menampilkan semua section yang aktif |
| 1.2 | Dari backend (admin), nonaktifkan section `achievements` via Postman/curl | - |
| 1.3 | Refresh halaman pendaftaran di browser | Progress bar **tidak** menampilkan "Data Prestasi" |
| 1.4 | Nonaktifkan juga section `guardians` | - |
| 1.5 | Refresh halaman | Progress bar hanya tampil: Data Diri, Data Alamat, Dokumen, Pembayaran |
| 1.6 | Aktifkan kembali semua section | Progress bar kembali menampilkan semua 6 step |

**Contoh curl untuk toggle visibility (admin):**
```bash
# Nonaktifkan section achievements (ganti {id} dengan ID section)
curl -X PATCH http://localhost:8000/api/admin/registration-form/sections/{id}/visibility \
  -H "Authorization: Bearer <ADMIN_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"is_visible": false}'

# Aktifkan kembali
curl -X PATCH http://localhost:8000/api/admin/registration-form/sections/{id}/visibility \
  -H "Authorization: Bearer <ADMIN_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"is_visible": true}'
```

---

### Skenario 2: Navigasi "Lanjut" Dinamis

**Tujuan:** Tombol "Lanjut" di halaman `/pendaftaran` harus skip section yang dinonaktifkan.

| Step | Aksi | Hasil yang Diharapkan |
|------|------|-----------------------|
| 2.1 | Nonaktifkan `guardians` dan `achievements` di backend | - |
| 2.2 | Login sebagai pendaftar baru, buka `/pendaftaran` | - |
| 2.3 | Klik tombol "Lanjut" | Diarahkan ke `/pendaftaran/data-diri` (step pertama) |
| 2.4 | Isi dan submit data diri → lanjut ke data alamat → isi dan submit | - |
| 2.5 | Setelah submit data alamat | Diarahkan langsung ke `/pendaftaran/data-akademik` (skip `data-orangtua`) |
| 2.6 | Isi dan submit data akademik (upload dokumen) | Diarahkan langsung ke `/pendaftaran/pembayaran` (skip `data-prestasi`) |

---

### Skenario 3: Route Guard — Redirect Halaman Non-aktif

**Tujuan:** Mencegah akses langsung via URL ke halaman yang section-nya dinonaktifkan.

| Step | Aksi | Hasil yang Diharapkan |
|------|------|-----------------------|
| 3.1 | Nonaktifkan section `achievements` di backend | - |
| 3.2 | Login, lalu ketik manual URL: `/pendaftaran/data-prestasi` | Toast error: *"Form data prestasi sedang dinonaktifkan oleh administrator."* dan di-redirect ke `/pendaftaran` |
| 3.3 | Nonaktifkan section `guardians` di backend | - |
| 3.4 | Ketik manual URL: `/pendaftaran/data-orangtua` | Toast error: *"Form data orang tua/wali sedang dinonaktifkan oleh administrator."* dan di-redirect ke `/pendaftaran` |
| 3.5 | Nonaktifkan section `documents` di backend | - |
| 3.6 | Ketik manual URL: `/pendaftaran/data-akademik` | Toast error: *"Form upload dokumen sedang dinonaktifkan oleh administrator."* dan di-redirect ke `/pendaftaran` |
| 3.7 | Aktifkan kembali semua section | Semua halaman dapat diakses normal |

---

### Skenario 4: Graceful Degradation (API Error/Tidak Tersedia)

**Tujuan:** Memastikan frontend tetap berfungsi jika API Form Visibility tidak tersedia.

| Step | Aksi | Hasil yang Diharapkan |
|------|------|-----------------------|
| 4.1 | Matikan backend, lalu buka halaman pendaftaran | Progress bar menampilkan **semua** step (fallback) |
| 4.2 | Navigasi "Lanjut" tetap bekerja normal | Mengikuti alur default (semua step aktif) |
| 4.3 | Akses URL langsung ke halaman manapun | **Tidak** ada redirect paksa — guard tidak aktif jika API error |
| 4.4 | Nyalakan kembali backend | Progress bar kembali dinamis sesuai konfigurasi backend |

---

### Skenario 5: Batch Update Visibility (Admin)

**Tujuan:** Memastikan batch update API bekerja dan frontend merespons perubahan.

```bash
# Batch update — nonaktifkan guardians dan achievements sekaligus
curl -X PATCH http://localhost:8000/api/admin/registration-form/sections/batch-visibility \
  -H "Authorization: Bearer <ADMIN_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "sections": [
      {"id": 2, "is_visible": false},
      {"id": 4, "is_visible": false}
    ]
  }'
```

| Step | Aksi | Hasil yang Diharapkan |
|------|------|-----------------------|
| 5.1 | Jalankan batch update di atas | API response sukses |
| 5.2 | Refresh halaman pendaftaran | Progress bar hanya menampilkan Data Diri, Data Alamat, Dokumen, Pembayaran |

---

## 🐛 Tips Debugging

### 1. Cek Response API di Browser DevTools

1. Buka **Network Tab** di DevTools browser (F12)
2. Filter request dengan keyword: `registration-form/sections`
3. Periksa response body — pastikan format:
   ```json
   {
     "status": "success",
     "data": [
       {
         "id": 1,
         "code": "profile",
         "name": "Data Profil",
         "is_visible": true,
         "is_required": true,
         "display_order": 1
       }
     ]
   }
   ```

### 2. Cek React Query Cache

Gunakan **React Query DevTools** (sudah terinstall di project):
1. Klik ikon React Query di pojok kanan bawah browser
2. Cari query key `["visibleSections", null]`
3. Periksa status: `fresh`, `stale`, atau `fetching`
4. Klik **Invalidate** untuk memaksa refetch

### 3. Console Logging

Untuk debugging sementara, tambahkan log di hook:

```javascript
// Di src/hooks/useFormVisibility.js → useVisibleSections
export const useVisibleSections = (programId = null) => {
  const query = useQuery({
    queryKey: ["visibleSections", programId],
    queryFn: () => registrationService.getVisibleSections(programId),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    select: (response) => {
      const data = response?.data?.data || [];
      console.log("[FormVisibility] Active sections:", data); // Debug log
      return data;
    },
  });
  return query;
};
```

### 4. Verifikasi Token & Role

Endpoint admin memerlukan Bearer Token dengan role `admin`. Jika mendapat error 403:
- Pastikan login menggunakan akun admin
- Cek token di `localStorage.getItem("access_token")`
- Verifikasi role dengan decode JWT di [jwt.io](https://jwt.io)

---

## ✅ Checklist Testing

Gunakan checklist berikut untuk memastikan semua skenario telah di-test:

- [ ] Progress bar menampilkan step sesuai section aktif
- [ ] Progress bar menampilkan semua step saat API tidak tersedia (fallback)
- [ ] Tombol "Lanjut" skip section non-aktif
- [ ] Route guard redirect + toast saat akses `/pendaftaran/data-orangtua` (guardians non-aktif)
- [ ] Route guard redirect + toast saat akses `/pendaftaran/data-akademik` (documents non-aktif)
- [ ] Route guard redirect + toast saat akses `/pendaftaran/data-prestasi` (achievements non-aktif)
- [ ] Batch update dari admin mengubah tampilan frontend
- [ ] Tidak ada console error saat navigasi normal
- [ ] Tidak ada layout shift/kedipan saat loading section visibility
