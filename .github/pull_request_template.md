<!--
    Sebelum mengajukan Pull Request, pastikan Anda telah melakukan hal berikut:
    - 👷‍♀️ Buat PR yang kecil. Biasanya hal ini mungkin dilakukan.
    - ✅ Sediakan tes untuk perubahan Anda.
    - 📝 Gunakan pesan commit yang deskriptif.
    - 📗 Perbarui dokumentasi terkait dan sertakan tangkapan layar yang relevan.
-->

## Jenis PR (centang semua yang berlaku)

- [ ] Fitur Baru
- [ ] Refaktor
- [ ] Perbaikan Bug
- [ ] Optimasi
- [ ] Pembaruan Dokumentasi

## Deskripsi

<!--
  Deskripsikan tentang perubahan yang Anda berikan
  Lebih baik jika dijelaskan lebih detail
 -->

- [ ] Saya menambahkan fitur baru
- [ ] Saya memperbaiki fitur yang sudah ada
- [ ] Saya memperbaiki bug
- [ ] Saya melakukan optimasi
- [ ] Saya menambah dokumentasi
- [ ] Saya memperbaiki dokumentasi

## Terkait Tiket & Dokumen

<!--
Untuk pull request yang berkaitan atau menutup sebuah isu, silakan sertakan di bawah ini.
Kami mengikuti panduan [Github tentang menghubungkan isu ke pull request](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue).

Contohnya dengan menuliskan: "closes #1234" akan menghubungkan pull request ini dengan isu 1234. Dan ketika pull request digabung, Github akan otomatis menutup isu tersebut.
-->

- Terkait Isu #
- Menutup #

## Pengujian

> _Beberapa pengujian akan dilakukan otomatis dengan GitHub Actions saat pull request dibuat_

- [ ] Tes linting eslint `npm run lint` || `bun run lint`
- [ ] Pesan commit sesuai [Conventional Commits](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13) `npm run commitlint` || `bun run commitlint`
- [ ] Build lokal `npm run build` || `bun run build`

### Checklist Aksesibilitas UI

> _Jika PR Anda menyertakan perubahan UI, silakan ceklis daftar berikut ini:_

- [ ] HTML Semantik diterapkan?
- [ ] Kontras warna diuji?

> _Untuk informasi lebih lanjut, cek tautan berikut: [Forem Accessibility Docs](https://developers.forem.com/frontend/accessibility)._

## Lingkungan Pengembangan

Saya menggunakan:

> _Misal: tuliskan hanya "Windows" jika Anda menggunakan Windows_

- `os` = `linux / windows / macOS`

<!-- jika ada kegagalan pada salah satu tes, kami akan memeriksanya kembali -->
