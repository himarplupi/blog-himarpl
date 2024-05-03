"use client";

import { LoaderCircle } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";

type SubmitButtonProps = ButtonProps & {
  isLoading?: boolean;
};

export function SubmitButton({
  children,
  isLoading,
  ...props
}: SubmitButtonProps) {
  return (
    <Button type="submit" disabled={isLoading} {...props}>
      {isLoading ? (
        <>
          <LoaderCircle className="mr-2 animate-spin" /> Mengubah...
        </>
      ) : (
        children
      )}
    </Button>
  );
}
