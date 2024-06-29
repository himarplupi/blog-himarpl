import { Montserrat as FontSans } from "next/font/google";
import localFont from "next/font/local";

import { ReactLenis } from "@/components/common/lenis";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { TRPCReactProvider } from "@/trpc/react";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import "@/styles/globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = localFont({
  src: [
    {
      path: "./fonts/minion-pro/MinionPro-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/minion-pro/MinionPro-It.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/minion-pro/MinionPro-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/minion-pro/MinionPro-MediumIt.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/minion-pro/MinionPro-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/minion-pro/MinionPro-SemiboldIt.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/minion-pro/MinionPro-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/minion-pro/MinionPro-BoldIt.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-serif",
});

export const metadata = {
  title: "Blog | HIMARPL",
  metadataBase: new URL("https://blog.himarpl.com"),
  description: "Tulisan-tulisan pengurus HIMARPL",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
  openGraph: {
    title: "Blog HIMARPL",
    description: "Tulisan-tulisan pengurus HIMARPL",
    url: "https://blog.himarpl.com",
    siteName: "Blog HIMARPL",
    images: "https://blog.himarpl.com/opengraph-image.gif",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog HIMARPL",
    description: "Tulisan-tulisan pengurus HIMARPL",
    creator: "@himarpl",
    images: ["https://blog.himarpl.com/twitter-image.gif"], // Must be an absolute URL
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <GoogleTagManager gtmId="G-BNJKV201XL" />

      <body
        className={cn(
          "dark bg-background font-sans antialiased",
          fontSans.variable,
          fontSerif.variable,
        )}
      >
        <TRPCReactProvider>
          <ReactLenis>{children}</ReactLenis>
        </TRPCReactProvider>
        <Toaster />
      </body>

      <GoogleAnalytics gaId="G-BNJKV201XL" />
    </html>
  );
}
