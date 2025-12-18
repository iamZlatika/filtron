import type { Metadata } from "next";
import "../styles/globals.css";
import { roboto } from "./fonts";
import React from "react";

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
      <body>{children}</body>
    </html>
  );
}
