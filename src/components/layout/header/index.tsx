"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "@/hooks/useTranslations";
import { APP_NAME } from "@/lib/constants";
import { MapPin, Phone, Menu } from "lucide-react";
import Navbar from "@/components/layout/header/navbar";
import ActionBtn from "@/components/layout/action-btn";
import { LanguageSwitcher } from "@/components/layout/header/language-switcher";
import { useState } from "react";
import MobileNav from "@/components/layout/header/mobile-nav";

const Header = () => {
  const { dict: t, locale } = useTranslations();
  const homeLink = locale === "ru" ? "/ru" : "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const addressParts = t.address.split(", ");
  const city = addressParts[0];
  const street = addressParts.slice(1).join(", ");

  return (
    <header className="w-full">
      {/* Desktop Header */}
      <div className="hidden md:block">
        {/* Top bar */}
        <div className="w-full bg-black text-white">
          <div className="wrapper flex justify-between items-center">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center select-none">
                <span className="text-primary font-bold text-2xl leading-none">
                  <Link href={homeLink}>F</Link>
                </span>
              </div>

              <span className="text-xl md:text-2xl font-medium shrink-0">
                <Link href={homeLink}> {APP_NAME}</Link>
              </span>

              {/* Address */}
              <div className="flex items-center gap-2 pl-4 min-w-0">
                <a
                  href="https://www.google.com/maps?newwindow=1&sca_esv=0d39acdbfaa95ae9&output=search&q=%D0%BC.+%D0%97%D0%B0%D0%BF%D0%BE%D1%80%D1%96%D0%B6%D0%B6%D1%8F,+%D0%B2%D1%83%D0%BB.+%D0%A2%D1%80%D0%BE%D1%97%D1%86%D1%8C%D0%BA%D0%B0,+18/1&source=lnms&fbs=AIIjpHz6rxOFWsZjqtCJ84pWShUOk1D6SDcnv9maJfu4MgHP4IVVZjB4XyyP8cogXUcg9MgpPe53tWhiCz94zrTDlXqD0EX8Ycgucb3hprBIxOm8GZlxccobTkchfVCofTKffiMSxiZYK_HkgM9w0MqltYosc85FqN6j5yZvuqhYGa-YUsLOSB8vJB4lupfMuosUe-SC7THKLbW3NxUnwCIXpCRF2Sl574Udz50AJlgZEPlR8v5QQD7CQl-Iw1Ggc7olVrYkZ7iDCcmM8LVY_I6Sx864BJlh9A&entry=mc&ved=1t:200715&ictx=111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 pl-4 min-w-0"
                >
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <span className="truncate text-sm md:text-base text-white/90">
                    {t.address}
                  </span>
                </a>
              </div>
            </div>

            {/* Language Switch */}
            <LanguageSwitcher />
          </div>
        </div>

        {/* Second bar */}
        <div className="w-full bg-white text-gray-900 border-b border-gray-200">
          <div className="wrapper flex-between py-4 gap-4">
            <Navbar />
            <div aria-hidden="true" />

            {/* CTA + phones */}
            <div className="flex items-center gap-3 md:gap-5">
              <ActionBtn title={t.actionBtn} />

              <div className="flex flex-col items-end gap-1 text-sm md:text-base leading-tight">
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
                <a
                  href="https://t.me/+380676172194"
                  target="_blank"
                  aria-label="Telegram"
                >
                  <Image
                    src="/telegram.svg"
                    width={22}
                    height={22}
                    alt="Telegram"
                  />
                </a>
                <a
                  href="viber://chat?number=%2B380676172194"
                  aria-label="Viber"
                >
                  <Image src="/viber.svg" width={22} height={22} alt="Viber" />
                </a>
                <a
                  href="https://wa.me/380996243042"
                  target="_blank"
                  aria-label="WhatsApp"
                >
                  <Image
                    src="/whats-app.svg"
                    width={22}
                    height={22}
                    alt="WhatsApp"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden">
        {/* Top bar - Black with Logo and Language Switcher */}
        <div className="w-full bg-black text-white">
          <div className="px-4 py-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center select-none">
                <span className="text-primary font-bold text-xl leading-none">
                  <Link href={homeLink}>F</Link>
                </span>
              </div>
              <span className="text-lg font-medium">
                <Link href={homeLink}>{APP_NAME}</Link>
              </span>
            </div>

            {/* Language Switch */}
            <LanguageSwitcher />
          </div>
        </div>

        {/* First Level - Phones, Messengers, Burger */}
        <div className="w-full bg-white border-b border-gray-200">
          <div className="px-4 py-3 flex items-center justify-between">
            {/* Left: Phones and Messengers */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-1">
                <a
                  href="tel:+380676172194"
                  className="text-xs text-gray-900 hover:text-primary transition-colors"
                >
                  (067)6172194
                </a>
                <a
                  href="tel:+380996243042"
                  className="text-xs text-gray-900 hover:text-primary transition-colors"
                >
                  (099)6243042
                </a>
              </div>

              <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                <a
                  href="https://t.me/+380676172194"
                  target="_blank"
                  aria-label="Telegram"
                >
                  <Image
                    src="/telegram.svg"
                    width={20}
                    height={20}
                    alt="Telegram"
                  />
                </a>
                <a
                  href="viber://chat?number=%2B380676172194"
                  aria-label="Viber"
                >
                  <Image src="/viber.svg" width={20} height={20} alt="Viber" />
                </a>
                <a
                  href="https://wa.me/380996243042"
                  target="_blank"
                  aria-label="WhatsApp"
                >
                  <Image
                    src="/whats-app.svg"
                    width={20}
                    height={20}
                    alt="WhatsApp"
                  />
                </a>
              </div>
            </div>

            {/* Right: Burger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-900 hover:text-primary transition-colors"
              aria-label="Открыть меню"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Second Level - Address and CTA Button */}
        <div className="w-full bg-white border-b border-gray-200">
          <div className="px-4 py-3 flex items-center justify-between gap-3">
            {/* Left: Address with Icon in Center */}
            <div className="flex items-center gap-2 flex-1">
              <MapPin className="w-4 h-4 text-primary shrink-0 self-center" />
              <div className="flex flex-col text-xs text-gray-700 leading-tight">
                <a
                  href="https://www.google.com/maps?newwindow=1&sca_esv=0d39acdbfaa95ae9&output=search&q=%D0%BC.+%D0%97%D0%B0%D0%BF%D0%BE%D1%80%D1%96%D0%B6%D0%B6%D1%8F,+%D0%B2%D1%83%D0%BB.+%D0%A2%D1%80%D0%BE%D1%97%D1%86%D1%8C%D0%BA%D0%B0,+18/1&source=lnms&fbs=AIIjpHz6rxOFWsZjqtCJ84pWShUOk1D6SDcnv9maJfu4MgHP4IVVZjB4XyyP8cogXUcg9MgpPe53tWhiCz94zrTDlXqD0EX8Ycgucb3hprBIxOm8GZlxccobTkchfVCofTKffiMSxiZYK_HkgM9w0MqltYosc85FqN6j5yZvuqhYGa-YUsLOSB8vJB4lupfMuosUe-SC7THKLbW3NxUnwCIXpCRF2Sl574Udz50AJlgZEPlR8v5QQD7CQl-Iw1Ggc7olVrYkZ7iDCcmM8LVY_I6Sx864BJlh9A&entry=mc&ved=1t:200715&ictx=111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70"
                >
                  <span>{city}</span>
                  <span>{street}</span>
                </a>
              </div>
            </div>

            {/* Right: CTA Button */}
            <ActionBtn title={t.actionBtn} />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <MobileNav
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </div>
    </header>
  );
};

export default Header;
