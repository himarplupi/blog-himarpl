"use client";

import * as React from "react";
import { ClipboardCopy } from "lucide-react";
import {
  FacebookIcon,
  FacebookShareButton,
  InstapaperIcon,
  InstapaperShareButton,
  LineIcon,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { toast } from "sonner";

import { Button, buttonVariants } from "../ui/button";

export function CopyLink() {
  const url = useCurrentUrl();

  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={() => {
        toast.promise(navigator.clipboard.writeText(url), {
          loading: "Menyalin tautan...",
          success: "Tautan berhasil disalin",
          error: "Gagal menyalin tautan",
          duration: 2000,
        });
      }}
    >
      <ClipboardCopy />
    </Button>
  );
}

export function Whatsapp() {
  const url = useCurrentUrl();

  return (
    <WhatsappShareButton
      url={url}
      className={buttonVariants({ variant: "ghost", size: "icon" })}
    >
      <WhatsappIcon size={32} />
    </WhatsappShareButton>
  );
}

export function Facebook() {
  const url = useCurrentUrl();

  return (
    <FacebookShareButton
      url={url}
      className={buttonVariants({ variant: "ghost", size: "icon" })}
    >
      <FacebookIcon size={32} />
    </FacebookShareButton>
  );
}

export function Twitter() {
  const url = useCurrentUrl();

  return (
    <TwitterShareButton
      url={url}
      className={buttonVariants({ variant: "ghost", size: "icon" })}
    >
      <TwitterIcon size={32} />
    </TwitterShareButton>
  );
}

export function Line() {
  const url = useCurrentUrl();

  return (
    <LineShareButton
      url={url}
      className={buttonVariants({ variant: "ghost", size: "icon" })}
    >
      <LineIcon size={32} />
    </LineShareButton>
  );
}

export function Linkedin() {
  const url = useCurrentUrl();

  return (
    <LinkedinShareButton
      url={url}
      className={buttonVariants({ variant: "ghost", size: "icon" })}
    >
      <LinkedinIcon size={32} />
    </LinkedinShareButton>
  );
}

export function Telegram() {
  const url = useCurrentUrl();

  return (
    <TelegramShareButton
      url={url}
      className={buttonVariants({ variant: "ghost", size: "icon" })}
    >
      <TelegramIcon size={32} />
    </TelegramShareButton>
  );
}

export function Instapaper() {
  const url = useCurrentUrl();

  return (
    <InstapaperShareButton
      url={url}
      className={buttonVariants({ variant: "ghost", size: "icon" })}
    >
      <InstapaperIcon size={32} />
    </InstapaperShareButton>
  );
}

const useCurrentUrl = () => {
  const [url, setUrl] = React.useState("");

  React.useEffect(() => {
    if (!window) return;

    setUrl(window.location.href);
  }, []);

  return url;
};
