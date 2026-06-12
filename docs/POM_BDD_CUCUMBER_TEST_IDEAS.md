# Ide Testing Frontend (POM + BDD Gherkin/Cucumber)

Dokumen ini berisi daftar ide test yang **mudah dulu** (quick wins) untuk dijadikan bahan automated testing dengan **Page Object Model (POM)** dan **BDD Gherkin (Cucumber)**.

> Catatan: Nama halaman/route bisa kamu sesuaikan dengan aplikasi aslinya. Di bawah ini sengaja dibuat generik supaya tetap kepakai walau struktur UI sedikit beda.

---

## Konvensi POM yang disarankan (minimal)

- `LoginPage`: input email/username, password, tombol login, pesan error
- `Navbar` / `Header`: tombol logout, menu profil
- `ProfilePage`: form profil, tombol simpan, toast/alert sukses/gagal
- `AdminLoginPage` (opsional kalau UI login berbeda): sama seperti `LoginPage`
- `AdminSettingsPage`: pengaturan visibilitas form (toggle), tombol simpan
- `FormPage` / `RegistrationFormPage`: elemen form yang visibility-nya diatur

---

## 10 ide test (urut dari paling mudah)

### 1) Login berhasil (user)
**Target:** flow autentikasi paling dasar.

**POM yang kepakai:** `LoginPage`.

**Gherkin (contoh):**
```gherkin
Feature: Authentication - Login

  Scenario: Login berhasil dengan kredensial valid
    Given user berada di halaman login
    When user mengisi email "user@example.com" dan password "correct_password"
    And user menekan tombol login
    Then user berhasil masuk dan diarahkan ke halaman utama
```

---

### 2) Login gagal (password salah / akun tidak ada)
**Target:** validasi error message + tetap di halaman login.

**POM yang kepakai:** `LoginPage`.

**Gherkin (contoh):**
```gherkin
Feature: Authentication - Login

  Scenario Outline: Login gagal dengan kredensial tidak valid
    Given user berada di halaman login
    When user mengisi email "<email>" dan password "<password>"
    And user menekan tombol login
    Then user melihat pesan error "<message>"
    And user tetap berada di halaman login

    Examples:
      | email            | password        | message                   |
      | user@example.com | wrong_password  | Email atau password salah |
      | none@example.com | any_password    | Akun tidak ditemukan      |
```

---

### 3) Validasi field login wajib diisi (client-side)
**Target:** tanpa hit API pun bisa jalan; cepat dan stabil.

**POM yang kepakai:** `LoginPage`.

**Gherkin (contoh):**
```gherkin
Feature: Authentication - Login Form Validation

  Scenario: User menekan login tanpa mengisi field
    Given user berada di halaman login
    When user menekan tombol login
    Then user melihat validasi "Email wajib diisi"
    And user melihat validasi "Password wajib diisi"
```

---

### 4) Logout berhasil
**Target:** memastikan session/credential dibersihkan dan redirect benar.

**POM yang kepakai:** `Navbar`.

**Gherkin (contoh):**
```gherkin
Feature: Authentication - Logout

  Background:
    Given user sudah login

  Scenario: User logout dari aplikasi
    When user menekan tombol logout
    Then user diarahkan ke halaman login
    And user tidak bisa mengakses halaman yang butuh login
```

---

### 5) Guard akses halaman admin (role-based access)
**Target:** pembatasan akses paling sederhana.

**POM yang kepakai:** `LoginPage`, (opsional) `AdminDashboardPage`.

**Gherkin (contoh):**
```gherkin
Feature: Authorization - Admin Route Protection

  Scenario: User non-admin mencoba akses halaman admin
    Given user login sebagai "user"
    When user membuka halaman admin
    Then user melihat pesan "Tidak memiliki akses" atau diarahkan ke halaman lain
```

---

### 6) Update profil (nama/telepon) berhasil
**Target:** perubahan setting akun yang umum.

**POM yang kepakai:** `ProfilePage`.

**Gherkin (contoh):**
```gherkin
Feature: Account - Update Profile

  Background:
    Given user sudah login

  Scenario: User mengubah nama profil
    Given user berada di halaman profil
    When user mengganti nama menjadi "Budi"
    And user menyimpan perubahan
    Then user melihat notifikasi "Profil berhasil diperbarui"
    And nama profil tersimpan sebagai "Budi"
```

---

### 7) Update profil gagal karena validasi (contoh: nomor telepon tidak valid)
**Target:** cek pesan error dari server/client.

**POM yang kepakai:** `ProfilePage`.

**Gherkin (contoh):**
```gherkin
Feature: Account - Update Profile Validation

  Background:
    Given user sudah login

  Scenario: User memasukkan nomor telepon tidak valid
    Given user berada di halaman profil
    When user mengisi nomor telepon "abcd"
    And user menyimpan perubahan
    Then user melihat pesan error "Nomor telepon tidak valid"
```

---

### 8) Ganti password (happy path)
**Target:** pengaturan akun yang sering diminta.

**POM yang kepakai:** `ProfilePage` atau `ChangePasswordPage`.

**Gherkin (contoh):**
```gherkin
Feature: Account - Change Password

  Background:
    Given user sudah login

  Scenario: User mengganti password dengan data valid
    Given user berada di halaman ganti password
    When user mengisi password lama "old_password"
    And user mengisi password baru "new_password"
    And user mengkonfirmasi password baru "new_password"
    And user menyimpan perubahan
    Then user melihat notifikasi "Password berhasil diperbarui"
```

---

### 9) Visibilitas form: admin menonaktifkan form, user tidak bisa lihat/akses
**Target:** sesuai kebutuhan kamu tentang visibilitas form.

**POM yang kepakai:** `AdminSettingsPage`, `FormPage`.

**Gherkin (contoh):**
```gherkin
Feature: Form Visibility

  Scenario: Admin menonaktifkan form dan user tidak bisa mengakses
    Given admin sudah login
    And admin berada di halaman pengaturan visibilitas form
    When admin menonaktifkan form "Pendaftaran"
    And admin menyimpan pengaturan
    Then status form "Pendaftaran" menjadi "Nonaktif"

    When user login sebagai "user"
    And user membuka halaman form "Pendaftaran"
    Then user melihat informasi "Form sedang ditutup" atau form tidak tampil
```

---

### 10) Visibilitas form: admin mengaktifkan form, user bisa isi dan submit (smoke)
**Target:** memastikan toggle benar-benar berdampak dan submit minimal berjalan.

**POM yang kepakai:** `AdminSettingsPage`, `FormPage`.

**Gherkin (contoh):**
```gherkin
Feature: Form Visibility

  Scenario: Admin mengaktifkan form dan user bisa submit
    Given admin sudah login
    And admin mengaktifkan form "Pendaftaran"
    And admin menyimpan pengaturan

    When user login sebagai "user"
    And user membuka halaman form "Pendaftaran"
    Then form "Pendaftaran" tampil

    When user mengisi field wajib dengan data valid
    And user mengirim form
    Then user melihat notifikasi "Berhasil" atau diarahkan ke halaman konfirmasi
```
