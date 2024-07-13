"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { api } from "@/trpc/react";

export const usePublishPost = () => {
  const router = useRouter();
  const publishPost = api.post.publish.useMutation();
  const [isPublishing, setIsPublishing] = React.useState(false);

  const publish = (id: string, title: string) => {
    const publishPromise = publishPost.mutateAsync({ id, title });

    toast.promise(publishPromise, {
      loading: "Mengubah status postingan menjadi publik",
      success: "Postingan selesai dipublikasi",
      error: "Postingan gagal dipublikasi",
    });
  };

  React.useEffect(() => {
    if (publishPost.isLoading) {
      setIsPublishing(true);
    } else if (publishPost.isSuccess) {
      const id = setTimeout(() => {
        router.push("/me/posts/public");
        setIsPublishing(false);
      }, 2000);

      return () => clearTimeout(id);
    }

    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publishPost.isLoading]);

  return { publish, isPublishing };
};
