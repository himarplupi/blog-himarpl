"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { SubmitButton } from "@/components/me/button-submit";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMe } from "@/hooks/useMe";
import { abbreviation } from "@/lib/utils";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";

const profileSchema = z.object({
  bio: z.string().optional(),
});

export function FormProfile() {
  const me = useMe();

  const mutation = api.user.updateSelfProfile.useMutation();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      bio: me?.bio ?? "",
    },
  });

  useEffect(() => {
    if (mutation.isError) {
      toast.error("Gagal menyimpan perubahan profil", {
        description: mutation.error.message,
        duration: 3000,
      });
    }
    if (mutation.isSuccess) {
      toast.success("Berhasil menyimpan perubahan profil", {
        duration: 3000,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isSuccess, mutation.isError]);

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    mutation.mutate({ bio: values.bio });
  };

  return (
    <Card className="mt-4 h-fit md:basis-8/12">
      <CardHeader>
        <CardTitle className="scroll-m-20 font-serif text-2xl font-semibold tracking-wide">
          Profil
        </CardTitle>
        <CardDescription>
          Ini adalah cara orang lain mengenal kamu di website HIMARPL.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="profile-form">
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
                  defaultValue={`${me?.positions?.at(-1)?.name} ${me?.departments?.at(-1)?.name ?? ""}`}
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

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="grid gap-1">
                    <FormLabel className="flex items-center gap-x-2">
                      Bio
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tulis sesuatu tentang dirimu..."
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Bio kamu akan membantu orang lain mengenal kamu lebih
                      baik.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex gap-x-2 md:justify-between">
        <p className="text-sm text-muted-foreground">
          Jika ada kesalahan pada profil kamu, silakan hubungi departemen
          Kominfo.
        </p>
        <SubmitButton isLoading={mutation.isLoading} form="profile-form">
          Simpan Perubahan
        </SubmitButton>
      </CardFooter>
    </Card>
  );
}
