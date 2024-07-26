"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function BotCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Minta Phonix-chan untuk ngingetin postingan terbaru
        </CardTitle>
        <CardDescription>
          Phoenix-chan adalah bot telegram official HIMARPL yang siap memberi
          notifikasi terbaru terkait postingan artikel secara real-time!
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild variant="secondary" className="w-full">
          <Link href="https://t.me/himarpl_bot" target="_blank">
            <Image
              src={
                "https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.3.6/images/phoenix-chan.png"
              }
              alt="Foto profil phoenix-chan: sang phoenix yang lemah lembut"
              className="mr-2 rounded-full"
              width={32}
              height={32}
            />
            Chat Phoenix-chan
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
