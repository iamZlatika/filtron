import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";

import Breadcrumbs from "@/components/layout/breadcrumb";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { getDictionary } from "@/lib/i18n/getDictionary";

export async function generateStaticParams() {
  return [{ locale: "uk" }, { locale: "ru" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale);

  const baseUrl = "https://filtron.zp.ua";

  return {
    title: t.meta_title_layout,
    description: t.meta_description_layout,
    alternates: {
      canonical: locale === "uk" ? baseUrl : `${baseUrl}/ru`,
      languages: {
        "uk-UA": baseUrl,
        "ru-UA": `${baseUrl}/ru`,
        "x-default": baseUrl,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const t = getDictionary(locale);

  return (
    <>
      {/* GTM Head Script */}
      <Script id="gtm-script" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MW4722F5');
        `}
      </Script>

      {/* GTM Noscript */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-MW4722F5"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>

      <Header locale={locale} t={t} />
      <main className="grow">
        <div className="wrapper">
          <Breadcrumbs />
          {children}
        </div>
      </main>
      <Footer locale={locale} t={t} />
    </>
  );
}
