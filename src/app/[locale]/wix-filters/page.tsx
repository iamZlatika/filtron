import Image from "next/image";
import { getDictionary } from "@/lib/i18n/getDictionary";

export default async function WixFiltersPage({
  params,
}: {
  params: Promise<{ locale: "uk" | "ru" }>;
}) {
  const { locale } = await params;
  const t = getDictionary(locale);

  return (
    <div className="flex flex-col gap-0 py-0">
      {/* Title */}
      <h1 className="h1-bold">{t.filtersTitle}</h1>

      {/* Block 1: logo left (~2/9), text right (~7/9) */}
      <section className="grid grid-cols-1 md:grid-cols-9 items-center gap-4 md:gap-6 mt-4 md:mt-6">
        <div className="flex justify-center md:justify-start md:col-span-2">
          <Image
            src="/wix_logo.jpg"
            alt="WIX logo"
            width={420}
            height={260}
            className="h-auto w-full max-w-full object-contain"
            sizes="(max-width: 768px) 70vw, 22vw"
            priority
          />
        </div>
        <div className="md:col-span-7">
          <p className="text-black text-sm md:text-base lg:text-lg leading-relaxed">
            {t.filtersText1}
          </p>
        </div>
      </section>

      {/* Block 2: text left (~7/9), image right (~2/9) */}
      <section className="grid grid-cols-1 md:grid-cols-9 items-center gap-4 md:gap-6">
        <div className="md:col-span-7">
          <p className="text-black text-sm md:text-base lg:text-lg leading-relaxed">
            {t.filtersText2}
          </p>
        </div>
        <div className="flex justify-center md:justify-end md:col-span-2">
          <Image
            src="/wix-filters1.jpg"
            alt="WIX filters set 1"
            width={700}
            height={500}
            className="h-auto w-full max-w-full object-contain rounded-md"
            sizes="(max-width: 768px) 80vw, 22vw"
          />
        </div>
      </section>

      {/* Block 3: image left (~2/9), text right (~7/9) */}
      <section className="grid grid-cols-1 md:grid-cols-9 items-center gap-4 md:gap-6">
        <div className="order-1 md:order-none flex justify-center md:justify-start md:col-span-2">
          <Image
            src="/wix-filters2.jpg"
            alt="WIX filters set 2"
            width={700}
            height={500}
            className="h-auto w-full max-w-full object-contain rounded-md"
            sizes="(max-width: 768px) 80vw, 22vw"
          />
        </div>
        <div className="md:col-span-7">
          <p className="text-black text-sm md:text-base lg:text-lg leading-relaxed">
            {t.filtersText3}
          </p>
        </div>
      </section>
    </div>
  );
}
