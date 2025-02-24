"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { SubmitButton } from "@/components/me/button-submit";
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
import { useMe } from "@/hooks/useMe";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SiGithub, SiInstagram } from "@icons-pack/react-simple-icons";

const socialMediaSchema = z.object({
  instagram: z.string().optional(),
  github: z.string().optional(),
});

export function FormSocialMedia() {
  const me = useMe();

  const mutation = api.user.updateSelfSocialMedia.useMutation();

  const form = useForm<z.infer<typeof socialMediaSchema>>({
    resolver: zodResolver(socialMediaSchema),
    defaultValues: {
      instagram:
        me?.socialMedias?.find((value) => value?.name === "instagram")
          ?.username ?? "",
      github:
        me?.socialMedias?.find((value) => value?.name === "github")?.username ??
        "",
    },
  });

  useEffect(() => {
    if (mutation.isError) {
      toast.error("Gagal menyimpan perubahan sosial media", {
        description: mutation.error.message,
        duration: 3000,
      });
    }
    if (mutation.isSuccess) {
      toast.success("Berhasil menyimpan perubahan sosial media", {
        duration: 3000,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isSuccess, mutation.isError]);

  const onSubmit = (values: z.infer<typeof socialMediaSchema>) => {
    const socialMedia = [];

    if (values.instagram) {
      socialMedia.push({
        name: "instagram",
        username: values.instagram,
        url: `https://instagram.com/${values.instagram}`,
      });
    }

    if (values.github) {
      socialMedia.push({
        name: "github",
        username: values.github,
        url: `https://github.com/${values.github}`,
      });
    }

    mutation.mutate(socialMedia);
  };

  return (
    <Card className="mt-4">
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="social-media-form">
            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem className="grid gap-1">
                    <FormLabel className="flex items-center gap-x-2">
                      <span>
                        <SiInstagram color="hsl(var(--foreground))" />
                      </span>
                      <span>Username Instagram</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormDescription>
                      {"Jangan menggunakan karakter '@.'"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem className="grid gap-1">
                    <FormLabel className="flex items-center gap-x-2">
                      <span>
                        <SiGithub color="hsl(var(--foreground))" />
                      </span>
                      <span>Username Github</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-end">
        <SubmitButton isLoading={mutation.isLoading} form="social-media-form">
          Simpan Perubahan
        </SubmitButton>
      </CardFooter>
    </Card>
  );
}
