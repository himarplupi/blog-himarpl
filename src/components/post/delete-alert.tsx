"use client";

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
import type { ReactNode } from "react";
import { api } from "@/trpc/react";
import { toast } from "sonner";

export function DeleteAlertDialog({
  slug,
  authorId,
  children,
  onDelete,
}: {
  slug: string;
  authorId: string;
  children: ReactNode;
  onDelete?: (item: { slug: string; authorId: string }) => void;
}) {
  return (
    <AlertDialog>
      <DeleteAlertTrigger>{children}</DeleteAlertTrigger>
      <DeleteAlertContent authorId={authorId} slug={slug} onDelete={onDelete} />
    </AlertDialog>
  );
}

export function DeleteAlertTrigger({ children }: { children: ReactNode }) {
  return <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>;
}

export function DeleteAlertContent({
  slug,
  authorId,
  onDelete,
}: {
  slug: string;
  authorId: string;
  onDelete?: (item: { slug: string; authorId: string }) => void;
}) {
  const deleteMutation = api.post.delete.useMutation();

  const handleDelete = async () => {
    const deletePromise = deleteMutation.mutateAsync({ authorId, slug });

    toast.promise(deletePromise, {
      loading: "Menghapus postingan...",
      success: "Postingan berhasil dihapus",
      error: "Gagal menghapus postingan",
      duration: 3000,
    });

    if (onDelete) {
      await deletePromise;
      onDelete({ slug, authorId });
    }
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
