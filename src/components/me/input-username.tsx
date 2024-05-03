"use client";

import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { useDebounce } from "use-debounce";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";

type Props = { defaultValue: string };

export function InputUsername({ defaultValue }: Props) {
  const [username, setUsername] = useState(defaultValue);
  const [outputUsername, setOutputUsername] = useState("");

  const [debouncedUsername] = useDebounce(outputUsername, 500);
  const usernameTaken = api.user.byUsername.useQuery(debouncedUsername);

  useEffect(() => {
    const limitedUsername = username.slice(0, 32).toLowerCase();
    const formattedUsername = limitedUsername.replace(/\s+/g, "-");
    setOutputUsername(formattedUsername);
  }, [username]);

  return (
    <div className="grid gap-3">
      {!!usernameTaken.data && outputUsername !== defaultValue && (
        <Alert variant="destructive" className="animate-in fade-in zoom-in">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Username Telah Digunakan!</AlertTitle>
        </Alert>
      )}
      {username.length > 32 && (
        <Alert variant="destructive" className="animate-in fade-in zoom-in">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Username Terlalu Panjang!</AlertTitle>
        </Alert>
      )}

      {username.length < 4 && (
        <Alert variant="destructive" className="animate-in fade-in zoom-in">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Username Terlalu Pendek!</AlertTitle>
        </Alert>
      )}

      <Label htmlFor="usernameRaw">Username</Label>

      <Input type="hidden" name="username" value={outputUsername} />

      <Input
        id="usernameRaw"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <p className="text-sm text-muted-foreground">
        Ini adalah username tampilan publik kamu. Bisa berupa nama asli atau
        nama samaran.
      </p>
    </div>
  );
}
