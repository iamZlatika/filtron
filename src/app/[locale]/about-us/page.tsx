import Image from "next/image";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { Metadata } from "next";


export async function generateMetadata({
  params,
}: {
  params: { locale: "uk" | "ru" };
}): Promise<Metadata> {
  const { locale } = params;
  const t = getDictionary(locale);

  return {
    title: t.meta_title_about_us,
    description: t.meta_description_about_us,
  };
}


export default async function AboutUsPage({
  params,
}: {
  params: Promise<{ locale: "uk" | "ru" }>;
}) {
  const { locale } = await params;
  const t = getDictionary(locale);

  return (
    <div className="flex flex-col gap-0 py-0">
      {/* Title */}
      <h1 className="h1-bold">{t.about_us}</h1>

      {/* Block 1: logo left (~3/9), text right (~6/9) */}
      <section className="grid grid-cols-1 md:grid-cols-9 items-center gap-4 md:gap-6 mt-4 md:mt-6">
        <div className="flex justify-center md:justify-start md:col-span-3">
          <Image
            src="/shop.webp"
            alt="shop"
            width={420}
            height={260}
            className="h-auto w-full max-w-full object-contain"
            sizes="(max-width: 768px) 90vw, 33vw"
            priority
          />
        </div>
        <div className="md:col-span-6">
          <p className="text-black text-sm md:text-base lg:text-lg leading-relaxed">
            {t.about_us_p1}
          </p>
          <p className="text-black text-sm md:text-base lg:text-lg leading-relaxed">
            {t.about_us_p2}
          </p>
          <ul className="list-disc list-inside mt-3 space-y-1">
            <li>{t.about_us_list1}</li>
            <li>{t.about_us_list2}</li>
            <li>{t.about_us_list3}</li>
          </ul>
        </div>
      </section>

      {/* Block 2: text left (~6/9), image right (~3/9) */}
      <section className="grid grid-cols-1 md:grid-cols-9 items-center gap-4 md:gap-6 mt-6">
        <div className="md:col-span-6">
          <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
            {t.about_us_subtitle1}
          </h3>
          <p className="text-black text-sm md:text-base lg:text-lg leading-relaxed">
            {t.about_us_p3}
          </p>
        </div>
        <div className="flex justify-center md:justify-end md:col-span-3">
          <Image
            src="/shop_inside.webp"
            alt="shop_inside"
            width={700}
            height={500}
            className="h-auto w-full max-w-full object-contain rounded-md"
            sizes="(max-width: 768px) 90vw, 33vw"
          />
        </div>
      </section>

      {/* Block 3: text only */}
      <section className="grid grid-cols-1 md:grid-cols-9 items-center gap-4 md:gap-6 mt-6">
        <div className="md:col-span-9">
          <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
            {t.about_us_subtitle3}
          </h3>
          <p className="text-black text-sm md:text-base lg:text-lg leading-relaxed">
            {t.about_us_p4}
          </p>
          <h3 className="text-xl md:text-2xl font-bold mb-3 mt-6 text-gray-900">
            {t.about_us_subtitle4}
          </h3>
          <p className="text-black text-sm md:text-base lg:text-lg leading-relaxed">
            {t.about_us_p5}
          </p>
        </div>
      </section>
    </div>
  );
}
