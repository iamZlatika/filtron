import Image from "next/image";
import { getDictionary } from "@/lib/i18n/getDictionary";

export default async function B2bPage({
  params,
}: {
  params: Promise<{ locale: "uk" | "ru" }>;
}) {
  const { locale } = await params;
  const t = getDictionary(locale);
  return (
    <div>
      <h3>{t.b2b}</h3>
      <div>
        <Image
          src="/corporative.webp"
          alt="corporative"
          width={350}
          height={230}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>
    </div>
  );
}
