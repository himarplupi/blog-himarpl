"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { api } from "@/trpc/react";

export const usePublishPost = () => {
  const router = useRouter();
  const publishPost = api.post.publish.useMutation();

  const publish = (id: string, title: string) => {
    const publishPromise = publishPost.mutateAsync({ id, title });

    toast.promise(publishPromise, {
      loading: "Mengubah status postingan menjadi publik",
      success: "Postingan selesai dipublikasi",
      error: "Postingan gagal dipublikasi",
    });

    publishPromise
      .then(() => {
        router.push("/me/posts/public");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return { publish, isPublishing: publishPost.isLoading };
};
