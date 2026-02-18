"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import type { Dictionary } from "@/lib/i18n/getDictionary";

export function ThankYouClient({ t }: { t: Dictionary }) {
  const router = useRouter();
  const [isValidated, setIsValidated] = useState(false);

  useEffect(() => {
    const submitted = sessionStorage.getItem("form_submitted");

    if (!submitted) {
      router.replace("/");
      return;
    }

    setIsValidated(true);

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "thank_you_page_view",
      page_name: "Thank You",
    });

    const timer = setTimeout(() => {
      sessionStorage.removeItem("form_submitted");
    }, 500);

    return () => clearTimeout(timer);
  }, [router]);

  if (!isValidated) return null;

  return (
    <div>
      <h1 className="h1-bold mb-8">{t.thank_you_text}</h1>
      <div id="conversion-anchor" />
    </div>
  );
}

export default ThankYouClient;
