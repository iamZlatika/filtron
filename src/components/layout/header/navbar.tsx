"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, getLocalizedHref } from "@/lib/utils";
import { useTranslations } from "@/hooks/useTranslations";
import type { Dictionary } from "@/lib/i18n/getDictionary";

const links = [
  { key: "navAutoparts", href: "/autoparts" },
  { key: "navWix", href: "/wix-filters" },
  { key: "navServices", href: "/services" },
  { key: "navContacts", href: "/contacts" },
  { key: "navAboutUs", href: "/about-us" },
] as const;

const Navbar = () => {
  const { dict: t, locale } = useTranslations();
  const pathname = usePathname();

  return (
    <nav aria-label="navigation" className="max-w-full">
      <ul className="flex items-center overflow-x-auto md:whitespace-nowrap">
        {links.map((item, idx) => {
          const fullHref = getLocalizedHref(item.href, locale);
          const isActive = pathname === fullHref;

          return (
            <li
              key={item.href}
              className={cn(
                "flex items-center",
                idx === 0 ? "" : "ml-3 pl-3 border-l border-gray-200",
              )}
            >
              <Link
                href={fullHref}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative inline-block px-2 py-3 text-base md:text-lg text-gray-900 transition-colors",
                  "visited:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                  isActive
                    ? "text-primary after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-full after:bg-primary after:rounded"
                    : "hover:text-primary active:text-primary",
                )}
              >
                {t[item.key as keyof Dictionary]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
