"use client";

import { toast } from "sonner";
import { useEffect } from "react";

export function NotificationToast({ msg }: { msg?: string }) {
  useEffect(() => {
    if (msg) {
      const timeoutId = setTimeout(() => {
        toast.success(msg, { duration: 3000 });
      }, 100);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [msg]);

  return <span />;
}
