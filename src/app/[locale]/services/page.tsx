import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n/getDictionary";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: "uk" | "ru" }>;
}) {
  const { locale } = await params;
  const t = getDictionary(locale);

  const services = [
    {
      src: "/b2b.jpg",
      alt: "b2b",
      text: t.b2b,
      href: `/${locale}/services/b2b`,
    },
    {
      src: "/order_autoparts.jpg",
      alt: "order_autoparts",
      text: t.orderAutoparts,
      href: `/${locale}/services/order`,
    },
    {
      src: "/delivery.jpg",
      alt: "delivery",
      text: t.delivery,
      href: `/${locale}/services/delivery`,
    },
  ];

  return (
    <div className="container mx-auto py-16">
      <div className="flex flex-wrap justify-center gap-12">
        {services.map((service) => (
          <Link
            key={service.href}
            href={service.href}
            className="group flex flex-col items-center text-center gap-4 cursor-pointer"
          >
            <div className="overflow-hidden rounded-xl shadow-md transition-shadow group-hover:shadow-xl">
              <Image
                src={service.src}
                alt={service.alt}
                width={350}
                height={230}
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
            </div>
            <span className="font-semibold text-lg text-gray-800 transition-colors group-hover:text-primary">
              {service.text}
            </span>
          </Link>
        ))}
      </div>
      <p className="mt-16 text-center">{t.servicesText}</p>
    </div>
  );
}
