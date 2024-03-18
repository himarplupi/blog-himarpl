"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ComingSoonWrapper({ children }: { children: React.ReactNode }) {
  return <Dialog>{children}</Dialog>;
}

export function ComingSoonTrigger({ children }: { children: React.ReactNode }) {
  return <DialogTrigger asChild>{children}</DialogTrigger>;
}

export function ComingSoonContent({ children }: { children: React.ReactNode }) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Segera Hadir!</DialogTitle>
      </DialogHeader>
      {children}
      <DialogFooter>
        <DialogClose asChild>
          <Button>Okay</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
