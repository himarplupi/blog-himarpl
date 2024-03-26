import Link from "next/link";
import { LogoAscendia } from "@/components/brand/logo-ascendia";
import { ComingSoon } from "@/components/home/coming-soon";

export default function Home() {
  return (
    <>
      <nav className="container bg-secondary/50 py-2 text-center">
        <Link
          href="https://pmb.himarpl.com"
          className="underline transition hover:text-foreground/75"
        >
          Website Informasi Penerimaan Mahasiswa Baru Telah Dibuka
        </Link>
      </nav>
      <main className="container flex min-h-screen flex-col items-center justify-center py-8">
        <LogoAscendia />
        <ComingSoon />
      </main>
    </>
  );
}
