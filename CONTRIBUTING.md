# Blog HIMARPL Website Contributing Guide

Thank you for your interest in contributing to the Blog HIMARPL Website. Before you proceed, briefly go through the following:

- [Code of Conduct](https://github.com/himarplupi/blog-himarpl/blob/main/CODE_OF_CONDUCT.md)
- [Contributing](#contributing)
- [Getting started](#getting-started)
  - [CLI Commands](#cli-commands)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Policy](#pull-request-policy)
- [Developer's Certificate of Origin 1.1](#developers-certificate-of-origin-11)

## Contributing

Any individual is welcome to contribute to the Blog HIMARPL Website. The repository currently has one kind of contribution personas:

- A **Contributor** is any individual who creates an issue/PR, comments on an issue/PR, or contributes in some other way.

## Prerequisites for .env file

1. Create a `.env` file in the root of the project.

2. Follow the getting started guide in [CoackroachDB](https://www.cockroachlabs.com/docs/cockroachcloud/quickstart) for the `DATABASE_URL` value.

   ```bash
   DATABASE_URL=
   ```

3. Follow the getting started guide in [Google OAuth](https://developers.google.com/identity/protocols/oauth2) to obtain OAuth 2.0 credentials from the Google API Console for the `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` values.

   ```bash
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   ```

4. Follow the getting started guide in [Upstash Ratelimiting](https://upstash.com/docs/oss/sdks/ts/ratelimit/gettingstarted) to obtain the `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` values.

   ```bash
   UPSTASH_REDIS_REST_URL=
   UPSTASH_REDIS_REST_TOKEN=
   ```

## Getting started

The steps below will give you a general idea of how to prepare your local environment for the Blog HIMARPL Website and general steps for getting things done and landing your contribution.

1. Click the fork button in the top right to clone the [Blog HIMARPL Website Repository](https://github.com/himarplupi/blog-himarpl/fork)

2. Clone your fork using SSH, GitHub CLI, or HTTPS.

   ```bash
   git clone git@github.com:<YOUR_GITHUB_USERNAME>/blog-himarpl.git # SSH
   git clone https://github.com/<YOUR_GITHUB_USERNAME>/blog-himarpl.git # HTTPS
   gh repo clone <YOUR_GITHUB_USERNAME>/blog-himarpl # GitHub CLI
   ```

3. Change into the blog-himarpl directory.

   ```bash
   cd blog-himarpl
   ```

4. Create a remote to keep your fork and local clone up-to-date.

   ```bash
   git remote add upstream git@github.com:nodejs/blog-himarpl.git # SSH
   git remote add upstream https://github.com/nodejs/blog-himarpl.git # HTTPS
   gh repo sync nodejs/blog-himarpl # GitHub CLI
   ```

5. Create a new branch for your work.

   ```bash
   git checkout -b name-of-your-branch
   ```

6. Run the following to install the dependencies and start a local preview of your work.

   ```bash
   npm ci # installs this project's dependencies
   npm run dev # starts a development environment
   ```

7. Perform your changes. In case you're unfamiliar with the structure of this repository, we recommend a read on the [HIMARPL Documentation Website](https://docs.himarpl.com).

8. Perform a merge to sync your current branch with the upstream branch.

   ```bash
   git fetch upstream
   git merge upstream/main
   ```

9. Run `npm run format` to confirm that linting and formatting are passing.

   ```bash
   npm run lint
   ```

10. Once you're happy with your changes, add and commit them to your branch, then push the branch to your fork.

    ```bash
    cd ~/blog-himarpl
    git add .
    git commit # Please follow the commit guidelines below
    git push -u origin name-of-your-branch
    ```

> [!IMPORTANT]\
> Before committing and opening a Pull Request, please go first through our [Commit](#commit-guidelines) and [Pull Request](#pull-request-policy) guidelines outlined below.

11. Create a Pull Request.

> [!NOTE]\
> We ask for PR authors to avoid to rebase/update their PRs with the base branch (`main`) unnecessarily.

### CLI Commands

This repository contains several scripts and commands for performing numerous tasks. The most relevant ones are described below.

<details>
  <summary>Commands for Running & Building the Website</summary>

- `npm run dev` runs Next.js's Local Development Server, listening by default on `http://localhost:3000/`.
- `npm run build` builds the Application on Production mode. The output is by default within `.next` folder.
  - This is used for the Blog HIMARPL Vercel Deployments (Preview & Production)
- `npm run start` starts a web server running serving the built content from `npm run build`

</details>

<details>
  <summary>Commands for Maintenance Tasks and Tests</summary>

- `npm run lint` runs the linter for all files.
- `npm run test` runs all tests locally

</details>

## Commit Guidelines

This project follows the [Conventional Commits][] specification.

Commits should be signed. You can read more about [Commit Signing][] here.

### Commit Message Guidelines

- Commit messages must include a "type" as described on Conventional Commits
- Commit messages **must not** end with a period `.`

## Pull Request Policy

This policy governs how contributions should land within this repository. The lines below state the checks and policies to be followed before merging and in the act of merging.

### When merging

- All required Status-checks must have passed.
- Please make sure that all discussions are resolved.
- [`squash`][] pull requests made up of multiple commits

## Developer's Certificate of Origin 1.1

```
By contributing to this project, I certify that:

- (a) The contribution was created in whole or in part by me and I have the right to
  submit it under the open source license indicated in the file; or
- (b) The contribution is based upon previous work that, to the best of my knowledge,
  is covered under an appropriate open source license and I have the right under that
  license to submit that work with modifications, whether created in whole or in part
  by me, under the same open source license (unless I am permitted to submit under a
  different license), as indicated in the file; or
- (c) The contribution was provided directly to me by some other person who certified
  (a), (b) or (c) and I have not modified it.
- (d) I understand and agree that this project and the contribution are public and that
  a record of the contribution (including all personal information I submit with it,
  including my sign-off) is maintained indefinitely and may be redistributed consistent
  with this project or the open source license(s) involved.

```

[`squash`]: https://help.github.com/en/articles/about-pull-request-merges#squash-and-merge-your-pull-request-commits
[Conventional Commits]: https://www.conventionalcommits.org/
[Commit Signing]: https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits
