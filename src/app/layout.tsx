// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import StickyNav from "./components/header/StickyNav";
import Footer
 from "./components/footer/Footer";
export const metadata: Metadata = {
  title: "Digital Activision – Modern, gyors, reszponzív weboldalak",
  description:
    "Gyors, átlátható és szép weboldalak. Kézzelfogható eredmények: több megkeresés, jobb Google-pozíció.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hu">
      <body className="min-h-dvh bg-white text-neutral-900 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-black focus:px-3 focus:py-2 focus:text-white"
        >
          Ugrás a tartalomra
        </a>

        <StickyNav/>

        <main id="main" className="pt-0 md:pt-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
