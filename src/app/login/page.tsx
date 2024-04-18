import { redirect } from "next/navigation";
import { AlertCircle } from "lucide-react";

import { GoogleLoginButton } from "@/components/common/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServerAuthSession } from "@/server/auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { errorMsg?: string };
}) {
  const session = await getServerAuthSession();

  if (session && !session.user.username) {
    return redirect("/register/username");
  }

  if (session) return redirect("/");

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Mulai posting dengan menggunakan akun Google UPI Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full flex-col gap-y-4">
            {searchParams?.errorMsg && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Terjadi kesalahan saat login!</AlertTitle>
                <AlertDescription>{searchParams?.errorMsg}</AlertDescription>
              </Alert>
            )}
            <GoogleLoginButton />
          </div>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Copyright © 2024 HIMARPL UPI.
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
