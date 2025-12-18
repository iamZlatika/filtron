"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTranslations } from "@/hooks/useTranslations";

const titles: Record<string, string> = {
  "wix-filters": "navWix",
  services: "navServices",
  contacts: "navContacts",
  "about-us": "navAboutUs",
  order: "orderTitle",
  autoparts: "navAutoparts",
};

function formatSegment(seg: string) {
  return (
    titles[seg] ??
    seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const { dict: t, locale } = useTranslations();

  const hiddenOn = ["/"];

  if (hiddenOn.includes(pathname)) return null;

  const segments = pathname.split("/").filter(Boolean);

  // Пропускаем первый сегмент (локаль)
  const pathSegments = segments.slice(1);

  const items = pathSegments.map((segment, index) => {
    // Формируем href с учетом локали
    const href = `/${locale}/` + pathSegments.slice(0, index + 1).join("/");
    const isLast = index === pathSegments.length - 1;

    // Получаем ключ перевода
    const translationKey = formatSegment(segment);
    // Безопасно получаем перевод
    const label = (t as any)[translationKey] || translationKey;

    return (
      <BreadcrumbItem key={href}>
        {isLast ? (
          <BreadcrumbPage>{label}</BreadcrumbPage>
        ) : (
          <BreadcrumbLink asChild>
            <Link href={href}>{label}</Link>
          </BreadcrumbLink>
        )}
      </BreadcrumbItem>
    );
  });

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/${locale}`}>{t.breadHome}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {items.length > 0 && <BreadcrumbSeparator />}

        {items.map((item, i) => (
          <div key={i} className="flex items-center">
            {item}
            {i < items.length - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
