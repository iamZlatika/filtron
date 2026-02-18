import "../styles/globals.css";

import type { Metadata } from "next";
import React from "react";

import { AuthProvider } from "@/providers/AuthProvider";

import { roboto } from "./fonts";

export const metadata: Metadata = {
  title: "Filtron",
  description: "Автозапчастини Запоріжжя",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}) {
  const { locale } = await params;

  const lang = (locale === "ru" ? "ru" : "uk") as "uk" | "ru";

  return (
    <html lang={lang} className={roboto.className}>
      <body className="min-h-screen flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
