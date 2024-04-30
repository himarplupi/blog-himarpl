"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { api } from "@/trpc/server";

const schemaProfile = z.object({
  username: z
    .string({
      invalid_type_error: "Username harus berupa teks.",
      required_error: "Username tidak boleh kosong.",
    })
    .min(3, {
      message: "Username minimal 3 karakter.",
    })
    .max(32, {
      message: "Username maksimal 32 karakter.",
    }),
  bio: z
    .string({
      invalid_type_error: "Bio harus berupa teks.",
    })
    .optional(),
});

export async function handleSubmitProfile(_: null, formData: FormData) {
  try {
    const validatedFields = schemaProfile.safeParse({
      username: formData.get("username"),
      bio: formData.get("bio"),
    });

    // Return early if the form data is invalid
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        data: undefined,
      };
    }

    const { username, bio } = validatedFields.data;

    const res = await api.user.byUsername.query(username);

    if (res) {
      return {
        errors: {
          username: "Username sudah digunakan.",
        },
        data: undefined,
      };
    }

    await api.user.updateSelf.mutate({
      username,
      bio,
    });

    revalidatePath("/me");
    return { errors: undefined, data: { username, bio } };
  } catch (e) {
    throw new Error("Gagal mengubah profil.");
  }
}

const schemaSocialMedia = z.object({
  instagram: z.string().optional(),
  github: z.string().optional(),
});

export async function handleSubmitSocialMedia(_: null, formData: FormData) {
  try {
    const validatedFields = schemaSocialMedia.safeParse({
      instagram: formData.get("instagram"),
      github: formData.get("github"),
    });

    // Return early if the form data is invalid
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        data: undefined,
      };
    }

    const data = validatedFields.data;

    const socialMedia = [];

    if (data.instagram) {
      socialMedia.push({
        name: "Instagram",
        username: data.instagram,
        url: `https://instagram.com/${data.instagram}`,
      });
    }

    if (data.github) {
      socialMedia.push({
        name: "github",
        username: data.github,
        url: `https://github.com/${data.github}`,
      });
    }

    await api.user.updateSelf.mutate({ socialMedia });

    revalidatePath("/me");
    return { errors: undefined, data };
  } catch (e) {
    throw new Error("Gagal mengubah sosial media.");
  }
}
