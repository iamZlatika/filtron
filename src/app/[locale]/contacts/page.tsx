import InteractiveStoreMap from "@/components/sections/contacts/google-map";
import { getDictionary } from "@/lib/i18n/getDictionary";
import Image from "next/image";

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: "uk" | "ru" }>;
}) {
  const { locale } = await params;
  const t = getDictionary(locale);

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <h1 className="h1-bold">{t.contactsTitle}</h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
        <div className="md:col-span-1 flex flex-col gap-5">
          {/* Address */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {t.contactsAddress}
            </h3>
            <p className="text-gray-800">{t.address}</p>
          </div>

          {/* Phones */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {t.contactsPhones}
            </h3>
            <div className="flex flex-col gap-1 text-gray-800">
              <a
                href="tel:+380676172194"
                className="hover:text-primary transition-colors"
              >
                (067)6172194
              </a>
              <a
                href="tel:+380996243042"
                className="hover:text-primary transition-colors"
              >
                (099)6243042
              </a>
            </div>
          </div>

          {/* Email */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
            <a
              href="mailto:filtron.wix@gmail.com"
              className="text-gray-800 hover:text-primary transition-colors"
            >
              filtron.wix@gmail.com
            </a>
          </div>

          {/* Messengers */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t.contactsSocial}
            </h3>
            <div className="flex items-center gap-3">
              <a
                href="https://t.me/+380676172194"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="inline-flex hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/telegram.svg"
                  width={24}
                  height={24}
                  alt="Telegram"
                />
              </a>
              <a
                href="viber://chat?number=%2B380676172194"
                aria-label="Viber"
                className="inline-flex hover:opacity-80 transition-opacity"
              >
                <Image src="/viber.svg" width={24} height={24} alt="Viber" />
              </a>
              <a
                href="https://wa.me/380996243042"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="inline-flex hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/whats-app.svg"
                  width={24}
                  height={24}
                  alt="WhatsApp"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Right: map */}
        <div className="md:col-span-2">
          <InteractiveStoreMap />
        </div>
      </section>
    </div>
  );
}
