"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

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
  "thank-you": "thank_you_text",
  b2b: "b2b",
  delivery: "delivery",
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

  if (segments.length <= 1) {
    return null;
  }
  const pathSegments = segments.slice(1);

  return (
    <nav aria-label="Breadcrumb">
      <Breadcrumb className="mb-4 mt-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/${locale}`}>{t.breadHome}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {pathSegments.map((segment, index) => {
            const href =
              `/${locale}/` + pathSegments.slice(0, index + 1).join("/");
            const isLast = index === pathSegments.length - 1;

            const label = titles[segment]
              ? t[titles[segment] as keyof typeof t] || formatSegment(segment)
              : formatSegment(segment);

            return (
              <Fragment key={href}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={href}>{label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
}
