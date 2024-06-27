"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { AlertCircle } from "lucide-react";
import { useDebounce } from "use-debounce";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { SiGoogle } from "@icons-pack/react-simple-icons";

export function GoogleLoginButton() {
  return (
    <Button variant="outline" onClick={() => signIn("google")}>
      <SiGoogle color="#fafafa" className="mr-2 h-4 w-4" />
      Login with Google
    </Button>
  );
}

export function RegisterUsername() {
  const [username, setUsername] = useState("");
  const [outputUsername, setOutputUsername] = useState("");
  const [debouncedUsername] = useDebounce(outputUsername, 500);
  const usernameTaken = api.user.byUsername.useQuery(debouncedUsername);
  const selfUsername = api.user.setSelfUsername.useMutation();
  const router = useRouter();

  useEffect(() => {
    const limitedUsername = username.slice(0, 32);
    const formattedUsername = limitedUsername.replace(/\s+/g, "-");
    setOutputUsername(formattedUsername);
  }, [username]);

  const handleClick = async () => {
    const res = await selfUsername.mutateAsync(outputUsername);
    if (res) {
      router.push(`/@${res.username}`);
    }
  };

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Register Username</CardTitle>
        <CardDescription className="overflow-hidden text-ellipsis">
          Masukkan username yang akan digunakan untuk membuat URL profil Anda.{" "}
          <span className="text-primary">
            https://blog.himarpl.com/@{outputUsername}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex w-full flex-col gap-y-4">
          {!!usernameTaken.data && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Username Telah Digunakan!</AlertTitle>
            </Alert>
          )}
          {username.length > 32 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Username Terlalu Panjang!</AlertTitle>
            </Alert>
          )}
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <p className="text-sm text-muted-foreground"></p>
          <Button
            disabled={
              username.length == 0 ||
              !!usernameTaken.data?.username ||
              usernameTaken.isLoading ||
              username.length > 32
            }
            onClick={handleClick}
          >
            Register
          </Button>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">© 2024 HIMARPL UPI.</p>
      </CardFooter>
    </Card>
  );
}
