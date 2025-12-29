import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Metadata } from "next";
import { ReactNode } from "react";
import Script from "next/script";

export async function generateStaticParams() {
  return [{ locale: "uk" }, { locale: "ru" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://filtron.zp.ua";

  return {
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

      <Header />
      <div className="wrapper">{children}</div>
      <Footer />
    </>
  );
}
