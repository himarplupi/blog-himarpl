"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { api } from "@/trpc/react";

export const usePublishPost = () => {
  const router = useRouter();
  const publishPost = api.post.publish.useMutation();

  const publish = (title: string) => {
    const publishPromise = publishPost.mutateAsync({ title });

    toast.promise(publishPromise, {
      loading: "Mengubah status postingan menjadi publik",
      success: "Postingan selesai dipublikasi",
      error: "Postingan gagal dipublikasi",
    });

    publishPromise
      .then(() => {
        router.push("/me");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return { publish };
};
