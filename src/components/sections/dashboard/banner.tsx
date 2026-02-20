import Image from "next/image";

import ActionBtn from "@/components/layout/action-btn";
import type { Dictionary } from "@/lib/i18n/getDictionary";

interface BannerProps {
  t: Dictionary;
  locale: string;
}

const Banner = ({ locale, t }: BannerProps) => {
  return (
    <div className="mx-auto w-full max-w-[1920px] bg-white">
      {/* Убрали md:h-[600px] и items-center для десктопа */}
      <div className="flex flex-col md:flex-row h-auto w-full items-stretch">
        {/* Левая часть: текст */}
        <div className="w-full md:w-1/2 flex items-center justify-center py-10 md:py-20">
          <div className="flex flex-col items-start justify-center gap-6 px-6 md:px-12 max-w-xl">
            <p className="text-black text-xl md:text-2xl lg:text-3xl leading-snug">
              {t.bannerTitle}
            </p>
            <ActionBtn title={t.bannerVin} locale={locale} />
          </div>
        </div>

        {/* Правая часть: изображение */}
        <div className="w-full md:w-1/2 flex items-end justify-end overflow-hidden">
          <Image
            src="/banner.webp"
            alt="Banner"
            width={900}
            height={600}
            className="w-full h-auto object-contain"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
