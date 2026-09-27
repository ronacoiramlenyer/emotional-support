import type { Metadata, Viewport } from "next";
import "@fontsource/fraunces/300-italic.css";
import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/400-italic.css";
import "@fontsource-variable/inter";
import "./globals.css";
import { CrisisLink } from "@/components/CrisisLink";

export const metadata: Metadata = {
  title: "Tanglaw",
  description: "A guiding light for heavy days.",
};

export const viewport: Viewport = {
  themeColor: "#0b1530",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CrisisLink />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
