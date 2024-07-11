"use client";

import type { ReactNode } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { api } from "@/trpc/react";

export function DeleteAlertDialog({
  slug,
  authorId,
  children,
}: {
  slug: string;
  authorId: string;
  children: ReactNode;
}) {
  return (
    <AlertDialog>
      <DeleteAlertTrigger>{children}</DeleteAlertTrigger>
      <DeleteAlertContent authorId={authorId} slug={slug} />
    </AlertDialog>
  );
}

export function DeleteAlertTrigger({ children }: { children: ReactNode }) {
  return <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>;
}

export function DeleteAlertContent({
  slug,
  authorId,
}: {
  slug: string;
  authorId: string;
}) {
  const deleteMutation = api.post.delete.useMutation();
  const utils = api.useUtils();

  const handleDelete = async () => {
    const deletePromise = deleteMutation.mutateAsync({ authorId, slug });

    toast.promise(deletePromise, {
      loading: "Menghapus postingan...",
      success: "Postingan berhasil dihapus",
      error: "Gagal menghapus postingan",
      duration: 3000,
    });

    await deletePromise;
    await utils.post.invalidate();
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
        <AlertDialogDescription>
          Tindakan ini tidak bisa dibatalkan. Tindakan Ini akan menghapus data
          postingan secara permanen dari database.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Batalkan</AlertDialogCancel>
        <AlertDialogAction onClick={handleDelete}>Yakin</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}

export function DeleteAlertWrapper({ children }: { children: ReactNode }) {
  return <AlertDialog>{children}</AlertDialog>;
}
