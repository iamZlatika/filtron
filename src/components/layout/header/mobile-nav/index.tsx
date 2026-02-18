"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useTranslations } from "@/hooks/useTranslations";
import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const links = [
  { key: "navAutoparts", href: "/autoparts" },
  { key: "navWix", href: "/wix-filters" },
  { key: "navServices", href: "/services" },
  { key: "navContacts", href: "/contacts" },
  { key: "navAboutUs", href: "/about-us" },
] as const;

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  const { dict: t, locale } = useTranslations();
  const pathname = usePathname();
  const homeLink = locale === "ru" ? "/ru" : "/";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center select-none">
            <span className="text-primary font-bold text-xl leading-none">
              <Link href={homeLink} onClick={onClose}>
                F
              </Link>
            </span>
          </div>
          <span className="font-medium text-lg">
            <Link href={homeLink} onClick={onClose}>
              {APP_NAME}
            </Link>
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-gray-900 hover:text-primary transition-colors"
          aria-label="Закрыть меню"
        >
          <X size={28} />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col p-6 gap-6">
        {/* Navigation Links */}
        <nav className="flex flex-col gap-1">
          {links.map((link) => {
            const fullHref = locale === "ru" ? `/ru${link.href}` : link.href;
            const isActive = pathname === fullHref;
            return (
              <Link
                key={link.href}
                href={fullHref}
                onClick={onClose}
                className={cn(
                  "text-lg py-3 px-2 border-b border-gray-100 transition-colors",
                  isActive
                    ? "text-primary font-semibold"
                    : "text-gray-900 hover:text-primary",
                )}
              >
                {t[link.key as keyof typeof t] || link.key}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;
