import Header from "@/components/layout/header";
import { Metadata } from "next";
import Footer from "@/components/layout/footer";

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
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <div className="">
      <Header />
      <div className="wrapper">{children}</div>
      <Footer />
    </div>
  );
}
