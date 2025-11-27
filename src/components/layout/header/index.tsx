"use client";

import { useTranslation } from "react-i18next";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import Navbar from "@/components/layout/header/navbar";
import ActionBtn from "@/components/layout/action-btn";
import Link from "next/link";

const Header = () => {
  const { i18n, t } = useTranslation();

  const current = i18n.language === "ru" ? "ru" : "uk";

  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="w-full bg-black text-white">
        <div className="wrapper flex justify-between items-center">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center select-none">
              <span className="text-primary font-bold text-2xl leading-none">
                <Link href="/">F</Link>
              </span>
            </div>

            <span className="text-xl md:text-2xl font-medium shrink-0">
              <Link href="/"> {APP_NAME}</Link>
            </span>

            {/* Address */}
            <div className="hidden sm:flex items-center gap-2 pl-4 min-w-0">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <span className="truncate text-sm md:text-base text-white/90">
                {t("address")}
              </span>
            </div>
          </div>

          {/* Language Switch */}
          <div className="flex items-center gap-2 leading-none">
            {["uk", "ru"].map((lng) => {
              const isActive = current === lng;
              return (
                <button
                  key={lng}
                  type="button"
                  aria-pressed={isActive}
                  aria-current={isActive ? "true" : undefined}
                  className={`uppercase inline-flex items-center justify-center h-8 px-3 rounded-full border text-xs md:text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "text-white/90 border-white/20 hover:bg-white/10 hover:text-white"
                  } focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/70 focus-visible:outline-offset-2`}
                  onClick={() => i18n.changeLanguage(lng)}
                >
                  {lng}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Second bar */}
      <div className="w-full bg-white text-gray-900 border-b border-gray-200">
        <div className="wrapper flex-between py-4 gap-4">
          <Navbar />
          <div aria-hidden="true" />

          {/* CTA + phones */}
          <div className="flex items-center gap-3 md:gap-5">
            <ActionBtn title={t("actionBtn")} />

            <div className="hidden sm:flex flex-col items-start md:items-end gap-1 text-sm md:text-base leading-tight">
              <a
                href="tel:+380676172194"
                className="group inline-flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>(067)6172194</span>
              </a>
              <a
                href="tel:+380996243042"
                className="group inline-flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>(099)6243042</span>
              </a>
            </div>

            <div className="flex items-center gap-2">
              <a href="https://t.me/" target="_blank" aria-label="Telegram">
                <Image
                  src="/telegram.svg"
                  width={22}
                  height={22}
                  alt="Telegram"
                />
              </a>
              <a href="#" aria-label="Viber">
                <Image src="/viber.svg" width={22} height={22} alt="Viber" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
