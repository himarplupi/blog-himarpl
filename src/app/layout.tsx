import "@/styles/globals.css";

import { Montserrat as FontSans } from "next/font/google";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "@/components/ui/sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavBar } from "./_components/navbar";

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
      path: "./fonts/minion-pro/MinionPro-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/minion-pro/MinionPro-SemiBoldIt.otf",
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
  description:
    "Informasi terkini seputar teknologi, programming, dan lainnya, oleh Himpunan Rekayasa Perangkat Lunak Universitas Pendidikan Indonesia",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontSerif.variable,
        )}
      >
        <ScrollArea className="h-screen">
          <TRPCReactProvider>
            <NavBar />
            {children}
          </TRPCReactProvider>

          <Toaster />
        </ScrollArea>
      </body>
    </html>
  );
}
