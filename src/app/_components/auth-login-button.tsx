"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export function GoogleLoginButton() {
  return (
    <Button variant="outline" onClick={() => signIn("google")}>
      <Icons.Google className="mr-2 h-4 w-4" />
      Login with Google
    </Button>
  );
}
