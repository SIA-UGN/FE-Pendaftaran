# Progress Mingguan — E2E Testing ProfilePage (POM + BDD Cucumber) + Test Design (BVA/EP)

Dokumen ini adalah **progress mingguan** untuk bagian testing **ProfilePage** di project `FE-Pendaftaran`.
Fokusnya: membuat **test suite** berbasis **Boundary Value Analysis (BVA)** dan **Equivalence Partitioning (EP)**, lalu menerjemahkannya ke **BDD Gherkin (Cucumber)** + rancangan **Page Object Model (POM)** yang minimal.

> Catatan penting (mapping tugas vs implementasi aplikasi):
> - Ide awal di `POM_BDD_CUCUMBER_TEST_IDEAS.md` menyebut “update profil (nama/telepon)”.
> - Di implementasi FE saat ini, halaman user `ProfilePage` adalah route **`/profil`** dan fiturnya: **Ubah Email**, **Ubah Password**, dan **Ubah Foto Profil (avatar)**.
> - Field **Nama Lengkap** di `/profil` bersifat **read-only** dan **tidak ada** field telepon.
>
> Kalau dosen/kelompokmu tetap mengharuskan “update nama/telepon”, versi FE yang paling dekat adalah flow **Pendaftaran → Data Diri** di route **`/pendaftaran/data-diri`** (di sana ada validasi nomor ponsel minimal 10 digit). Bagian ini gue taruh sebagai *tambahan opsional*.

---

## 0) Scope & MVP User Flow (E2E)

**Ketentuan:** pengujian untuk **satu user flow end-to-end** (MVP).

**MVP Flow yang dipakai (user role: pendaftar/mahasiswa):**
1. User login lewat `/login`
2. User membuka `/profil`
3. User mengubah **email** (happy path + negative partitions)
4. User mengubah **password** (BVA minimal 8 char + partitions)
5. (Opsional E2E verifikasi kuat) User **logout** → login ulang pakai password baru

**Kenapa flow ini valid sebagai MVP?**
- Masih satu rangkaian E2E autentikasi + manajemen akun.
- Menguji UI validations + integrasi API `changeEmail` & `changePassword`.

---

## 1) Test Suite (BVA + Equivalence Partitioning)

### 1.1. Objek yang diuji (berdasarkan UI `/profil`)

**A. Ubah Email (modal dialog)**
- Input: `#new-email` (email baru)
- Input: `#email-password` (password untuk konfirmasi)
- Input: `#email-password-confirm` (konfirmasi password)
- Tombol: `Simpan` / `Batal`
- Validasi client-side (toast):
  - `Email tidak valid!`
  - `Password harus diisi untuk mengganti email.`
  - `Konfirmasi password tidak cocok!`

**B. Ubah Password (modal dialog)**
- Input: `#current` (password saat ini)
- Input: `#new` (password baru)
- Input: `#confirm` (konfirmasi password baru)
- Validasi client-side (toast):
  - `Semua field password harus diisi!`
  - `Konfirmasi password tidak cocok!`
  - `Password baru minimal 8 karakter!`

**C. Upload Avatar**
- File input: `#picture` (hidden) via tombol `Ubah Foto Profil`
- Validasi client-side (toast):
  - `Ukuran file maksimal 2MB!`
  - `File harus berupa gambar!`

> Prinsip: BVA/EP dipakai untuk menentukan *kombinasi input* yang mewakili kelas valid/invalid dan batas-batasnya, bukan mencoba semua kemungkinan.

---

### 1.2. Matriks EP/BVA — Ubah Password

**Variabel input & partisi**

| Variabel | Partisi (EP) | Contoh data | Expected |
|---|---|---:|---|
| `currentPassword` | Kosong (invalid) | `""` | Toast `Semua field password harus diisi!` |
| `currentPassword` | Terisi (valid) | `"CorrectCurrent123"` | Lolos validasi client-side |
| `newPassword` | Panjang 0 (invalid) | `""` | Toast `Semua field password harus diisi!` |
| `newPassword` | 1–7 (invalid) | `"1234567"` | Toast `Password baru minimal 8 karakter!` |
| `newPassword` | ≥ 8 (valid) | `"12345678"` | Lolos validasi client-side |
| `confirm` | Kosong (invalid) | `""` | Toast `Semua field password harus diisi!` |
| `confirm` | Tidak sama (invalid) | `"12345679"` | Toast `Konfirmasi password tidak cocok!` |
| `confirm` | Sama (valid) | `"12345678"` | Lolos validasi client-side |

**Boundary Value (BVA) utama untuk panjang password baru**
- $L = 8$ (minimum)
- Test boundary: `L=7` (invalid), `L=8` (valid)

**Test case yang diambil (minimal tapi representatif)**

| TC ID | Teknik | Data | Langkah singkat | Expected |
|---|---|---|---|---|
| PWD-01 | EP | current=`""`, new=`""`, confirm=`""` | Buka modal → klik Simpan | Toast `Semua field password harus diisi!` |
| PWD-02 | EP | current=`"Correct"`, new=`"12345678"`, confirm=`"00000000"` | Isi form → Simpan | Toast `Konfirmasi password tidak cocok!` |
| PWD-03 | **BVA** | current=`"Correct"`, new=`"1234567"`, confirm=`"1234567"` | Isi form → Simpan | Toast `Password baru minimal 8 karakter!` |
| PWD-04 | **BVA** | current=`"Correct"`, new=`"12345678"`, confirm=`"12345678"` | Isi form → Simpan | Toast sukses dari API: `Password berhasil diubah` atau message backend |
| PWD-05 | EP (server) | current=`"Wrong"`, new=`"12345678"`, confirm=`"12345678"` | Isi form → Simpan | Toast error dari API (mis. `Gagal mengubah password` / message backend) |

> Catatan: PWD-05 adalah test integrasi API (butuh akun & password nyata). Ini biasanya menghasilkan bug/report kalau backend error handling atau pesan tidak sesuai.

---

### 1.3. Matriks EP — Ubah Email

**Partisi input**

| Variabel | Partisi (EP) | Contoh data | Expected |
|---|---|---|---|
| `newEmail` | Kosong (invalid) | `""` | Toast `Email tidak valid!` |
| `newEmail` | Tidak mengandung `@` (invalid) | `"user.example.com"` | Toast `Email tidak valid!` |
| `newEmail` | Mengandung `@` (valid menurut FE) | `"user2@example.com"` | Lolos validasi client-side |
| `password` | Kosong (invalid) | `""` | Toast `Password harus diisi untuk mengganti email.` |
| `password` vs `confirm` | Tidak sama (invalid) | `"a"` vs `"b"` | Toast `Konfirmasi password tidak cocok!` |
| `password` vs `confirm` | Sama (valid) | `"Correct"` vs `"Correct"` | Lolos validasi client-side |

**Test case minimal**

| TC ID | Teknik | Data | Langkah singkat | Expected |
|---|---|---|---|---|
| EMAIL-01 | EP | newEmail=`""` | Buka modal → Simpan | Toast `Email tidak valid!` |
| EMAIL-02 | EP | newEmail=`"invalid"`, pass=`"x"`, confirm=`"x"` | Isi → Simpan | Toast `Email tidak valid!` |
| EMAIL-03 | EP | newEmail=`"user2@example.com"`, pass=`""` | Isi → Simpan | Toast `Password harus diisi untuk mengganti email.` |
| EMAIL-04 | EP | newEmail=`"user2@example.com"`, pass=`"a"`, confirm=`"b"` | Isi → Simpan | Toast `Konfirmasi password tidak cocok!` |
| EMAIL-05 | EP (happy) | newEmail=`"user2@example.com"`, pass=`"Correct"`, confirm=`"Correct"` | Isi → Simpan | Toast sukses `Email berhasil diubah` / message backend, email di UI berubah |

---

### 1.4. Matriks EP/BVA — Upload Avatar

**Partisi & boundary**

| Variabel | Partisi | Contoh data | Expected |
|---|---|---|---|
| File | Tidak ada file (no-op) | — | Tidak terjadi apa-apa |
| File type | Bukan gambar (invalid) | `file.pdf` | Toast `File harus berupa gambar!` |
| File size | > 2 MiB (invalid) | `> 2*1024*1024` bytes | Toast `Ukuran file maksimal 2MB!` |
| File size | **= 2 MiB** (boundary) | `2*1024*1024` bytes | Lolos validasi, mulai upload |
| File size | < 2 MiB (valid) | `200 KB` | Toast sukses `Avatar berhasil diupload` |

**Test case minimal**

| TC ID | Teknik | Data | Langkah singkat | Expected |
|---|---|---|---|---|
| AVA-01 | EP | non-image | Klik `Ubah Foto Profil` → pilih file non-image | Toast `File harus berupa gambar!` |
| AVA-02 | **BVA** | size = 2 MiB + 1 byte | Upload file oversize | Toast `Ukuran file maksimal 2MB!` |
| AVA-03 | EP (happy) | jpg/png valid | Upload image valid | Toast sukses `Avatar berhasil diupload` |

---

### 1.5. Tambahan test yang sejalan dengan MVP (kalau mau nambah)

**A. Cancel / Batal di dialog tidak mengubah data**
- Buka modal `Ubah Email` → isi data → klik `Batal` → pastikan modal tertutup, email tetap.

**B. Validasi state “Menyimpan…”**
- Saat request berjalan: tombol `Simpan` disabled + label `Menyimpan...` muncul.

**C. (Opsional) “Update nama/telepon” versi flow Pendaftaran**
- Route: `/pendaftaran/data-diri`
- BVA/EP untuk `noPonsel` (min 10): test boundary `9` vs `10` digit.

---

### 1.6. (Opsional) Test suite “Update profil (nama/telepon)” yang paling dekat di aplikasi

Kalau requirement-mu benar-benar harus mencakup **update nama & telepon**, implementasi FE yang ada sekarang bukan di `/profil`, tapi di:

- Route: **`/pendaftaran/data-diri`**
- Field relevan (di FormSchema):
  - `namaLengkap` minimal 2 karakter
  - `noPonsel` minimal 10 karakter (validasi: `Nomor Ponsel tidak valid.`)

**EP/BVA yang dipakai (minimal):**

| TC ID | Teknik | Input fokus | Contoh data | Expected |
|---|---|---|---|---|
| DD-01 | EP | `namaLengkap` kosong | `""` | Muncul error form untuk nama (wajib/min 2) |
| DD-02 | BVA | `namaLengkap` boundary | `"A"` (1 char) | Error: minimal 2 karakter |
| DD-03 | BVA | `namaLengkap` valid | `"Ab"` (2 char) | Lolos validasi |
| DD-04 | **BVA** | `noPonsel` invalid boundary | `"081234567"` (9 digit) | Error: `Nomor Ponsel tidak valid.` |
| DD-05 | **BVA** | `noPonsel` valid boundary | `"0812345678"` (10 digit) | Lolos validasi |
| DD-06 | EP (happy) | simpan data diri | nama valid + noPonsel valid | Submit sukses (toast/redirect sesuai app) |

> Catatan: detail toast/redirect di `data-diri` tergantung implementasi submit di page tersebut. Secara minimal, cukup assert: tidak ada error message dan form lanjut ke step berikutnya.

---

## 2) BDD (Gherkin) + Struktur POM Minimal

Target: skenario di bawah **langsung bisa dijadikan** file `.feature` untuk Cucumber.

### 2.1. Konvensi penamaan & tags

- Tag disarankan:
  - `@e2e` → end-to-end
  - `@smoke` → test cepat (happy path)
  - `@negative` → validasi/error
  - `@destructive` → mengubah state akun (email/password)

---

### 2.2. Feature: Change Password

```gherkin
@e2e @profile
Feature: Profile - Change Password
  Sebagai user yang sudah login
  Saya ingin mengubah password
  Agar keamanan akun saya meningkat

  Background:
    Given user sudah login sebagai "pendaftar"
    And user berada di halaman profile "/profil"

  @negative
  Scenario: Gagal simpan karena ada field password kosong
    When user membuka dialog "Ubah Password"
    And user menekan tombol "Simpan" pada dialog
    Then user melihat toast "Semua field password harus diisi!"

  @negative
  Scenario Outline: Validasi boundary panjang password baru
    When user membuka dialog "Ubah Password"
    And user mengisi password saat ini "<current>"
    And user mengisi password baru "<new>"
    And user mengisi konfirmasi password baru "<confirm>"
    And user menekan tombol "Simpan" pada dialog
    Then user melihat toast "<toast>"

    Examples:
      | current      | new       | confirm   | toast                              |
      | CorrectPass  | 1234567   | 1234567   | Password baru minimal 8 karakter!  |
      | CorrectPass  | 12345678  | 00000000  | Konfirmasi password tidak cocok!   |

  @smoke @destructive
  Scenario: Berhasil mengubah password dengan data valid
    When user membuka dialog "Ubah Password"
    And user mengisi password saat ini "<CURRENT_PASSWORD>"
    And user mengisi password baru "NewPass123"
    And user mengisi konfirmasi password baru "NewPass123"
    And user menekan tombol "Simpan" pada dialog
    Then user melihat toast "Password berhasil diubah"
```

> Notes implementasi:
> - Step `Then user melihat toast "Password berhasil diubah"` bisa dibuat lebih fleksibel:
>   - cocokkan substring seperti `"Password berhasil"` atau ambil message dari backend.
> - Untuk keamanan dan stabilitas, credential `CURRENT_PASSWORD` sebaiknya dibaca dari env (bukan hardcode di feature).

---

### 2.3. Feature: Change Email

```gherkin
@e2e @profile
Feature: Profile - Change Email
  Background:
    Given user sudah login sebagai "pendaftar"
    And user berada di halaman profile "/profil"

  @negative
  Scenario Outline: Validasi input change email (EP)
    When user membuka dialog "Ubah Email"
    And user mengisi email baru "<email>"
    And user mengisi password email "<pass>"
    And user mengisi konfirmasi password email "<confirm>"
    And user menekan tombol "Simpan" pada dialog
    Then user melihat toast "<toast>"

    Examples:
      | email              | pass     | confirm  | toast                                       |
      |                    | x        | x        | Email tidak valid!                          |
      | invalid-email      | x        | x        | Email tidak valid!                          |
      | user2@example.com  |          |          | Password harus diisi untuk mengganti email. |
      | user2@example.com  | a        | b        | Konfirmasi password tidak cocok!            |

  @smoke @destructive
  Scenario: Berhasil mengubah email
    When user membuka dialog "Ubah Email"
    And user mengisi email baru "user2@example.com"
    And user mengisi password email "<CURRENT_PASSWORD>"
    And user mengisi konfirmasi password email "<CURRENT_PASSWORD>"
    And user menekan tombol "Simpan" pada dialog
    Then user melihat toast "Email berhasil diubah"
    And email yang tampil di profile menjadi "user2@example.com"
```

---

### 2.4. Feature: Upload Avatar

```gherkin
@e2e @profile
Feature: Profile - Upload Avatar
  Background:
    Given user sudah login sebagai "pendaftar"
    And user berada di halaman profile "/profil"

  @negative
  Scenario: Upload avatar gagal karena file bukan gambar
    When user mengupload avatar dengan file "fixtures/not-image.pdf"
    Then user melihat toast "File harus berupa gambar!"

  @negative
  Scenario: Upload avatar gagal karena ukuran file terlalu besar
    When user mengupload avatar dengan file "fixtures/oversize-2mb-plus.jpg"
    Then user melihat toast "Ukuran file maksimal 2MB!"

  @smoke
  Scenario: Upload avatar berhasil
    When user mengupload avatar dengan file "fixtures/avatar-ok.jpg"
    Then user melihat toast "Avatar berhasil diupload"
```

---

### 2.5. (Opsional) Feature: Update profil (nama/telepon) lewat Pendaftaran → Data Diri

```gherkin
@e2e @pendaftaran @profile
Feature: Pendaftaran - Data Diri (Update nama & telepon)
  Background:
    Given user sudah login sebagai "pendaftar"
    And user berada di halaman "\/pendaftaran\/data-diri"

  @negative
  Scenario Outline: Validasi nomor ponsel (BVA min 10)
    When user mengisi nama lengkap "Budi"
    And user mengisi nomor ponsel "<phone>"
    And user menekan tombol "Simpan" pada form data diri
    Then user melihat pesan validasi "<message>"

    Examples:
      | phone       | message                   |
      | 081234567   | Nomor Ponsel tidak valid. |

  @smoke
  Scenario: Berhasil menyimpan data diri dengan nomor ponsel valid
    When user mengisi nama lengkap "Budi"
    And user mengisi nomor ponsel "0812345678"
    And user menekan tombol "Simpan" pada form data diri
    Then data diri tersimpan dan user bisa lanjut ke step berikutnya
```

---

### 2.6. Struktur POM minimal (contoh) + step definitions (contoh)

> Ini contoh **kode minimal** agar kelihatan sudah menerapkan POM + Cucumber. Implementasi real bisa kamu sesuaikan nanti.

**Struktur folder yang disarankan (minimal):**

```text
FE-Pendaftaran/
  e2e/
    features/
      profile.change-email.feature
      profile.change-password.feature
      profile.avatar-upload.feature
    pages/
      LoginPage.js
      ProfilePage.js
    steps/
      auth.steps.js
      profile.steps.js
    support/
      world.js
      hooks.js
    fixtures/
      avatar-ok.jpg
      not-image.pdf
      oversize-2mb-plus.jpg
```

**Contoh POM: `ProfilePage.js` (Playwright style pseudo-code)**

```js
export class ProfilePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;

    // Read-only fields di page utama
    this.emailReadonly = page.locator('#email');

    // Icon edit (SquarePen) tidak ada aria-label.
    // Cara stabil: cari svg di container input email/password.
    this.emailEditIcon = page.locator('#email').locator('xpath=..').locator('svg');
    this.passwordEditIcon = page.locator('#password').locator('xpath=..').locator('svg');

    // Dialog - change email
    this.newEmail = page.locator('#new-email');
    this.emailPassword = page.locator('#email-password');
    this.emailPasswordConfirm = page.locator('#email-password-confirm');

    // Dialog - change password
    this.currentPassword = page.locator('#current');
    this.newPassword = page.locator('#new');
    this.newPasswordConfirm = page.locator('#confirm');

    // Buttons di dialog
    this.saveButton = page.getByRole('button', { name: 'Simpan' });
    this.cancelButton = page.getByRole('button', { name: 'Batal' });

    // Avatar
    this.avatarFileInput = page.locator('#picture');
    this.uploadAvatarButton = page.getByRole('button', { name: 'Ubah Foto Profil' });
  }

  async goto(baseUrl) {
    await this.page.goto(`${baseUrl}/profil`);
  }

  async openChangeEmailDialog() {
    await this.emailEditIcon.click();
  }

  async openChangePasswordDialog() {
    await this.passwordEditIcon.click();
  }

  async save() {
    await this.saveButton.click();
  }

  async uploadAvatar(filePath) {
    // file input hidden, jadi langsung setInputFiles
    await this.avatarFileInput.setInputFiles(filePath);
  }

  async expectToast(text) {
    await this.page.getByText(text, { exact: false }).waitFor({ state: 'visible' });
  }
}
```

**Contoh step definitions minimal: `profile.steps.js`**

```js
import { When, Then } from '@cucumber/cucumber';

When('user membuka dialog {string}', async function (title) {
  if (title === 'Ubah Email') await this.profilePage.openChangeEmailDialog();
  if (title === 'Ubah Password') await this.profilePage.openChangePasswordDialog();
});

When('user mengisi email baru {string}', async function (email) {
  await this.profilePage.newEmail.fill(email);
});

When('user mengisi password email {string}', async function (pass) {
  await this.profilePage.emailPassword.fill(pass);
});

When('user mengisi konfirmasi password email {string}', async function (pass) {
  await this.profilePage.emailPasswordConfirm.fill(pass);
});

When('user mengisi password saat ini {string}', async function (pass) {
  await this.profilePage.currentPassword.fill(pass);
});

When('user mengisi password baru {string}', async function (pass) {
  await this.profilePage.newPassword.fill(pass);
});

When('user mengisi konfirmasi password baru {string}', async function (pass) {
  await this.profilePage.newPasswordConfirm.fill(pass);
});

When('user menekan tombol {string} pada dialog', async function (label) {
  if (label === 'Simpan') await this.profilePage.save();
});

Then('user melihat toast {string}', async function (toastText) {
  await this.profilePage.expectToast(toastText);
});
```

---

## 3) Tahap Selanjutnya (Bug Reporting) — Rinci

Bagian ini **belum menghasilkan bug report final** sampai test beneran dijalankan.
Tapi supaya progress-mu jelas, ini SOP lengkapnya.

### 3.1. Cara eksekusi test untuk menemukan bug

1. Jalankan aplikasi FE + BE di environment test (local/docker).
2. Jalankan skenario BDD satu per satu (mulai dari `@negative` karena cepat dan stabil).
3. Saat gagal:
   - capture **screenshot**
   - simpan **log console/network** (kalau perlu)
   - simpan **step yang gagal** (Cucumber output)

### 3.2. Format bug report (template)

Gunakan template ini biar konsisten:

```md
### Bug: <judul singkat>

**ID**: BUG-PROFILE-XXX
**Area**: ProfilePage (/profil) / Change Email / Change Password / Avatar
**Severity**: Low / Medium / High / Critical
**Priority**: P3 / P2 / P1
**Environment**:
- FE: FE-Pendaftaran (commit/branch: ...)
- BE: Be-Pendaftaran (commit/branch: ...)
- Browser: Chrome/Edge (version ...)
- OS: Windows

**Precondition**:
- User sudah login sebagai ...

**Steps to Reproduce**:
1. ...
2. ...

**Expected**:
- ...

**Actual**:
- ...

**Evidence**:
- Screenshot: ...
- Video/Trace: ... (kalau ada)
- Console/Network log: ...

**Notes / Suspected Cause** (opsional):
- ...
```

### 3.3. Kandidat bug yang *layak diuji* dari hasil reading code (to be confirmed)

> Ini bukan “bug ditemukan”, tapi **hipotesis bug** yang biasanya kejadian dan gampang dibuktikan dengan test.

1. **Validasi email terlalu longgar**
   - FE hanya cek `email.includes('@')`, sehingga input seperti `"a@"` atau `"@b"` kemungkinan lolos validasi FE.
   - Kalau backend menolak format email tersebut, user akan lihat error server (ini bisa dianggap bug UX karena validasi FE tidak cukup ketat).

2. **Avatar upload gagal (server error) bisa bikin user tidak bisa pilih file yang sama lagi**
   - Input file di-clear hanya saat **invalid file** atau **onSuccess**, tapi tidak saat **onError**.
   - Di beberapa browser, memilih file yang sama tidak memicu `onChange` kalau value input tidak berubah.
   - Dampak: user harus pilih file berbeda dulu baru bisa retry.

---

## 4) Nilai Tambahan: Auto-generated Test Report (rencana implementasi)

Kalau kamu implement Cucumber beneran, bonus yang umum:

### 4.1. Output JSON + HTML report

- Set Cucumber output JSON: `--format json:reports/cucumber.json`
- Generate HTML via tool, contoh:
  - `multiple-cucumber-html-reporter`
  - atau `cucumber-html-reporter`

**Flow ideal di CI/local:**
1. Run test → output `cucumber.json`
2. Generate HTML report → `reports/cucumber-html/index.html`
3. Simpan artifact (kalau CI)

### 4.2. Evidence otomatis untuk bug triage

- Screenshot on failure
- Video (opsional)
- Playwright trace (opsional, sangat membantu)

---

## 5) Checklist next actions (biar progress mingguan jelas)

Minggu ini (dokumen):
- [x] Mapping fitur ProfilePage aktual
- [x] Test suite BVA/EP (password/email/avatar)
- [x] Draft Gherkin (Cucumber)
- [x] Draft POM & step definitions minimal

Minggu depan (implementasi):
- [ ] Pilih stack automation (rekomendasi: Playwright + CucumberJS)
- [ ] Buat folder `e2e/` dan file `.feature`
- [ ] Implement POM & step definitions real
- [ ] Siapkan test user + env vars
- [ ] Jalankan test → kumpulkan bukti → tulis bug report final
- [ ] (Bonus) Generate HTML report
