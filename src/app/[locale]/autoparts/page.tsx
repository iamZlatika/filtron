import { getDictionary } from "@/lib/i18n/getDictionary";
import Image from "next/image";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: "uk" | "ru" };
}): Promise<Metadata> {
  const { locale } = params;
  const t = getDictionary(locale);

  return {
    title: t.meta_title_autoparts,
    description: t.meta_description_autoparts,
  };
}

const AutopartsPage = async ({
  params,
}: {
  params: Promise<{ locale: "uk" | "ru" }>;
}) => {
  const { locale } = await params;
  const t = getDictionary(locale);
  return (
    <div className="flex flex-col gap-0 py-0">
      <h1 className="h1-bold mb-8">{t.autoparts_title}</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 items-center">
        <div className="relative w-full h-64 md:h-80">
          <Image
            src="/autoparts.webp"
            alt={t.autoparts_title1}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold">{t.autoparts_title1}</h2>
          <p className="text-base leading-relaxed">{t.autoparts_text1}</p>
          <p className="text-base leading-relaxed">{t.autoparts_text2}</p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 items-center">
        <div className="relative w-full h-64 md:h-80 md:order-2">
          <Image
            src="/delivery.webp"
            alt={t.autoparts_title2}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-3 md:order-1">
          <h2 className="text-2xl font-bold">{t.autoparts_title2}</h2>
          <p className="text-base leading-relaxed">{t.autoparts_text3}</p>
          <p className="text-base leading-relaxed">{t.autoparts_text4}</p>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 items-center">
        <div className="relative w-full h-64 md:h-80">
          <Image
            src="/order.webp"
            alt={t.autoparts_title3}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold">{t.autoparts_title3}</h2>
          <p className="text-base leading-relaxed">{t.autoparts_text5}</p>
          <p className="text-base leading-relaxed">{t.autoparts_text6}</p>
        </div>
      </section>
    </div>
  );
};

export default AutopartsPage;
