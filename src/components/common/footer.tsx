"use client";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="container bg-secondary/50">
      <div className="md:px-8">
        <div className="flex flex-col justify-between gap-4 py-8 text-sm sm:flex-row sm:items-center">
          <p className="max-w-[512px] text-balance leading-5 text-muted-foreground [&:not(:first-child)]:mt-2">
            HIMARPL - PMB merupakan portal informasi penerimaan mahasiswa baru
            untuk calon mahasiswa Universitas Pendidikan Indonesia program studi
            Rekayasa Perangkat Lunak.
          </p>
          <div className="flex h-40 items-center gap-x-4">
            <Separator orientation="vertical" />
            <ul className="flex flex-col gap-y-1">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:underline"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/information"
                  className="text-muted-foreground hover:underline"
                >
                  Info Pendaftaran
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-muted-foreground hover:underline"
                >
                  Berita
                </Link>
              </li>
              <li>
                <Link
                  href="/software-engineering"
                  className="text-muted-foreground hover:underline"
                >
                  Mengenal RPL
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:underline"
                >
                  FAQ
                </Link>
              </li> */}
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:underline"
                >
                  Kontak
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
