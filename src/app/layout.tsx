import type { Metadata } from "next";
import "../styles/globals.css";
import { roboto } from "./fonts";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { LanguageProvider } from "@/app/providers";
import React from "react";

export const metadata: Metadata = {
  title: "Filtron",
  description: "Автозапчастини Запоріжжя",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={roboto.className}>
      <body>
        <LanguageProvider>
          <Header />
          <main className="wrapper">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
