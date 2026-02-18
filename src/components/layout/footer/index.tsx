import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { APP_NAME } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/getDictionary";
import { getLocalizedHref } from "@/lib/utils";

interface FooterProps {
  locale: string;
  t: Dictionary;
}

const Footer = ({ locale, t }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black text-white">
      <div className="wrapper py-8 md:py-12">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-around gap-8 mb-8">
          {/* Column 1: Navigation */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">
              {locale === "ru" ? "Навигация" : "Навігація"}
            </h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link
                href={getLocalizedHref("/autoparts", locale)}
                className="text-white/70 hover:text-primary transition-colors"
              >
                {t.navAutoparts}
              </Link>
              <Link
                href={getLocalizedHref("/wix-filters", locale)}
                className="text-white/70 hover:text-primary transition-colors"
              >
                {t.navWix}
              </Link>
              <Link
                href={getLocalizedHref("/services", locale)}
                className="text-white/70 hover:text-primary transition-colors"
              >
                {t.navServices}
              </Link>
              <Link
                href={getLocalizedHref("/about-us", locale)}
                className="text-white/70 hover:text-primary transition-colors"
              >
                {t.navAboutUs}
              </Link>
              <Link
                href={getLocalizedHref("/contacts", locale)}
                className="text-white/70 hover:text-primary transition-colors"
              >
                {t.navContacts}
              </Link>
            </nav>
          </div>

          {/* Column 2: Contacts */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">{t.contactsTitle}</h3>
            <div className="flex flex-col gap-3 text-sm">
              {/* Address */}
              <div className="flex items-start gap-2">
                <MapPin
                  className="w-4 h-4 text-primary shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <a
                  href="https://www.google.com/maps?newwindow=1&sca_esv=0d39acdbfaa95ae9&output=search&q=%D0%BC.+%D0%97%D0%B0%D0%BF%D0%BE%D1%80%D1%96%D0%B6%D0%B6%D1%8F,+%D0%B2%D1%83%D0%BB.+%D0%A2%D1%80%D0%BE%D1%97%D1%86%D1%8C%D0%BA%D0%B0,+18/1&source=lnms&fbs=AIIjpHz6rxOFWsZjqtCJ84pWShUOk1D6SDcnv9maJfu4MgHP4IVVZjB4XyyP8cogXUcg9MgpPe53tWhiCz94zrTDlXqD0EX8Ycgucb3hprBIxOm8GZlxccobTkchfVCofTKffiMSxiZYK_HkgM9w0MqltYosc85FqN6j5yZvuqhYGa-YUsLOSB8vJB4lupfMuosUe-SC7THKLbW3NxUnwCIXpCRF2Sl574Udz50AJlgZEPlR8v5QQD7CQl-Iw1Ggc7olVrYkZ7iDCcmM8LVY_I6Sx864BJlh9A&entry=mc&ved=1t:200715&ictx=111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70"
                >
                  {t.address}
                </a>
              </div>

              {/* Phones */}
              <div className="flex flex-col gap-1">
                <a
                  href="tel:+380676172194"
                  className="flex items-center gap-2 text-white/70 hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>(067) 617-21-94</span>
                </a>
                <a
                  href="tel:+380996243042"
                  className="flex items-center gap-2 text-white/70 hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>(099) 624-30-42</span>
                </a>
              </div>

              {/* Email */}
              <a
                href="mailto:filtron.wix@gmail.com"
                className="flex items-center gap-2 text-white/70 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                <span>filtron.wix@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Column 3: Messengers */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">{t.contactsSocial}</h3>
            <div className="flex items-center gap-3">
              <a
                href="https://t.me/+380676172194"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/telegram.svg"
                  width={32}
                  height={32}
                  alt="Telegram"
                />
              </a>
              <a
                href="viber://chat?number=%2B380676172194"
                aria-label="Viber"
                className="hover:opacity-80 transition-opacity"
              >
                <Image src="/viber.svg" width={32} height={32} alt="Viber" />
              </a>
              <a
                href="https://wa.me/380996243042"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/whats-app.svg"
                  width={32}
                  height={32}
                  alt="WhatsApp"
                />
              </a>
            </div>
            <div className="text-sm text-white/70">
              <p>{t.footer_schedule}</p>
              <p>{t.footer_schedule_saturday}</p>
              <p>{t.footer_schedule_sunday}</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-6"></div>

        {/* Bottom Bar - Column on Desktop, Column on Mobile */}
        <div className="flex flex-col items-center gap-3 text-sm text-white/60">
          <p>
            © {currentYear} {APP_NAME}.{" "}
            {locale === "ru" ? "Все права защищены" : "Всі права захищені"}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
