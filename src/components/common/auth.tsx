"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { SiGoogle } from "@icons-pack/react-simple-icons";

export function GoogleLoginButton() {
  return (
    <Button variant="outline" onClick={() => signIn("google")}>
      {/* @ts-expect-error React Simple Icons Lol Type */}
      <SiGoogle color="default" className="mr-2 h-4 w-4" />
      Login with Google
    </Button>
  );
}
