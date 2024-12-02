import "@/src/styles/globals.css";
import clsx from "clsx";
import { Metadata, Viewport } from "next";

import { siteConfig } from "@/src/config/site";
import { Providers } from "../lib/providers";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx("min-h-screen bg-background antialiased mx-6 lg:mx-0")}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
