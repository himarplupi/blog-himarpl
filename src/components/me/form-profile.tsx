"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

import { SubmitButton } from "@/components/me/button-submit";
import { InputUsername } from "@/components/me/input-username";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMe } from "@/hooks/useMe";
import { abbreviation } from "@/lib/utils";
import { handleSubmitProfile } from "@/server/me-actions";

export function FormProfile() {
  const me = useMe();
  const [state, formAction] = useFormState(handleSubmitProfile, null);

  useEffect(() => {
    if (state?.errors) {
      toast.error("Gagal menyimpan perubahan profil", {
        duration: 3000,
      });
    }
    if (state?.data) {
      toast.success("Berhasil menyimpan perubahan profil", {
        duration: 3000,
      });
    }
  }, [state]);

  return (
    <Card className="mt-4 h-fit basis-8/12">
      <form action={formAction}>
        <CardHeader>
          <CardTitle className="scroll-m-20 font-serif text-2xl font-semibold tracking-wide">
            Profil
          </CardTitle>
          <CardDescription>
            Ini adalah cara orang lain mengenal kamu di website HIMARPL.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="image">Foto Profil</Label>
              <Avatar className="h-20 w-20" id="image">
                <AvatarImage
                  src={me?.image ?? ""}
                  alt={`${me?.name} profile picture`}
                />
                <AvatarFallback>{abbreviation(me?.name)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name">Nama</Label>
              <Input
                id="name"
                type="text"
                className="w-full"
                name="name"
                defaultValue={me?.name ?? ""}
                readOnly
              />
              <p className="text-sm text-muted-foreground">
                Nama kamu tidak bisa diubah.
              </p>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="posisi">Posisi</Label>
              <Input
                id="posisi"
                type="text"
                className="w-full"
                name="position"
                defaultValue={`${me?.position} ${me?.department?.name ?? ""}`}
                readOnly
              />
              <p className="text-sm text-muted-foreground">
                Posisi kamu tidak bisa diubah.
              </p>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                className="w-full"
                name="email"
                defaultValue={me?.email ?? ""}
                readOnly
              />
              <p className="text-sm text-muted-foreground">
                Email kamu tidak bisa diubah.
              </p>
            </div>

            <div className="grid gap-3">
              <InputUsername defaultValue={me?.username ?? ""} />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                defaultValue={me?.bio ?? ""}
                placeholder="Tulis sesuatu tentang dirimu..."
                className="min-h-32"
                name="bio"
              />
              <p className="text-sm text-muted-foreground">
                Bio kamu akan membantu orang lain mengenal kamu lebih baik.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-x-2 md:justify-between">
          <p className="text-sm text-muted-foreground">
            Jika ada kesalahan pada profil kamu, silakan hubungi departemen
            Kominfo.
          </p>
          <SubmitButton>Simpan Perubahan</SubmitButton>
        </CardFooter>
      </form>
    </Card>
  );
}
