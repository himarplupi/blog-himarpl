<!--
    Before submitting a Pull Request, please ensure you've done the following:
    - 👷‍♀️ Create small PRs. In most cases this will be possible.
    - ✅ Provide tests for your changes.
    - 📝 Use descriptive commit messages.
    - 📗 Update any related documentation and include any relevant screenshots.
-->

## Jenis PR (centang semua yang berlaku)

- [ ] Feature
- [ ] Refactor
- [ ] Bug Fix
- [ ] Optimization
- [ ] Documentation Update

## Deskripsi (Description)

<!-- deskripsikan tentang perubahan yang kamu berikan -->

- [ ] saya menambahkan fitur baru
- [ ] saya memperbaiki fitur yang sudah ada
- [ ] saya memperbaiki bug
- [ ] saya melakukan optimasi
- [ ] saya menambah dokumentasi
- [ ] saya memperbaiki dokumentasi

## Related Tickets & Documents

<!--
For pull requests that relate or close an issue, please include them
below.  We like to follow [Github's guidance on linking issues to pull requests](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue).

For example having the text: "closes #1234" would connect the current pull
request to issue 1234.  And when we merge the pull request, Github will
automatically close the issue.
-->

- Related Issue #
- Closes #

## Testing

> _Beberapa testing akan otomatis dilakukan jika commit menggunakan git cmd tanpa menggunakan git GUI_

- [ ] lint testing eslint `npm run lint` || `bun run lint`
- [ ] commit message sesuai [Conventional Commits](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13) `npm run commitlint` || `bun run commitlint`
- [ ] build local `npm run build` || `bun run build`

### UI Accessibility Checklist

> _Jika PR Anda menyertakan perubahan UI, silakan ceklis daftar berikut ini:_

- [ ] Semantic HTML implemented?
- [ ] Color contrast tested?

> _Info lebih lanjut, cek tautan berikut: [Forem Accessibility Docs](https://developers.forem.com/frontend/accessibility)._

## Environment

saya menggunakan (im used):

- `os` = `linux / windows / macOS`

<!-- jika ada gagal pada salah satu test kami akan mengeceknya kembali -->
<!-- if there is a failure in one of the tests we will check it again -->
