import Image from "next/image";
import ActionBtn from "@/components/layout/action-btn";

interface IBanner {
  btnTitle: string;
  bannerTitle: string;
}
const Banner = ({ bannerTitle, btnTitle }: IBanner) => {
  return (
    <div className="mx-auto w-full max-w-[1920px] bg-white">
      <div className="flex h-[600px] w-full items-center">
        {/* Left: text + button */}
        <div className="flex w-1/2 h-full items-center justify-center">
          <div className="flex flex-col items-start justify-center gap-6 px-6 md:px-12 max-w-xl">
            <p className="text-black text-xl md:text-2xl lg:text-3xl leading-snug">
              {bannerTitle}
            </p>
            <ActionBtn title={btnTitle} />
          </div>
        </div>

        {/* Right: image ~50% */}
        <div className="w-1/2 h-full flex items-center justify-end overflow-hidden">
          <Image
            src="/banner.png"
            alt="Banner"
            width={900}
            height={600}
            className="h-full max-h-full w-auto object-contain"
            sizes="(max-width: 1024px) 50vw, 50vw"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
