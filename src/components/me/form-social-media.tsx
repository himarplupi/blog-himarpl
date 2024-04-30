"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

import { SubmitButton } from "@/components/me/button-submit";
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
import { useMe } from "@/hooks/useMe";
import { handleSubmitSocialMedia } from "@/server/me-actions";
import { SiGithub, SiInstagram } from "@icons-pack/react-simple-icons";

export function FormSocialMedia() {
  const me = useMe();
  const [state, formAction] = useFormState(handleSubmitSocialMedia, null);

  useEffect(() => {
    if (state?.errors) {
      toast.error("Gagal menyimpan perubahan sosial media", {
        duration: 3000,
      });
    }
    if (state?.data) {
      toast.success("Berhasil menyimpan perubahan sosial media", {
        duration: 3000,
      });
    }
  }, [state]);

  return (
    <Card className="mt-4 h-fit basis-4/12">
      <form action={formAction}>
        <CardHeader>
          <CardTitle className="scroll-m-20 font-serif text-2xl font-semibold tracking-wide">
            Sosial Media
          </CardTitle>
          <CardDescription>
            Tambahkan akun sosial media kamu agar orang lain bisa lebih mudah
            mengenal kamu.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="instagram" className="flex items-center gap-x-2">
                <span>
                  {/* @ts-expect-error: Simple Icon onpointer error */}
                  <SiInstagram color="hsl(var(--foreground))" />
                </span>
                <span>Instagram</span>
              </Label>
              <Input
                id="instagram"
                type="text"
                className="w-full"
                name="instagram"
                defaultValue={
                  me?.socialMedia?.find((value) => value.name === "Instagram")
                    ?.username ?? ""
                }
              />
              <p className="text-sm text-muted-foreground">
                {"Jangan menggunakan karakter '@.'"}
              </p>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="github" className="flex items-center gap-x-2">
                <span>
                  {/* @ts-expect-error: Simple Icon onpointer error */}
                  <SiGithub color="hsl(var(--foreground))" />
                </span>
                <span>Github</span>
              </Label>
              <Input
                id="github"
                type="text"
                className="w-full"
                name="github"
                defaultValue={
                  me?.socialMedia?.find((value) => value.name === "github")
                    ?.username ?? ""
                }
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <SubmitButton>Simpan Perubahan</SubmitButton>
        </CardFooter>
      </form>
    </Card>
  );
}
