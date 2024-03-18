"use client";

import { signIn } from "next-auth/react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Icons } from "./icons";

export function GoogleLoginButton({ ...props }: ButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={() =>
        signIn("google", {
          callbackUrl: "/?toast=Login berhasil, selamat datang!",
        })
      }
      {...props}
    >
      <Icons.Google className="mr-2 h-4 w-4" />
      Login with Google
    </Button>
  );
}
