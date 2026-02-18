import ThankYouClient from "@/components/sections/thank-you";
import { getDictionary } from "@/lib/i18n/getDictionary";

export default async function ThankYouPage({
  params,
}: {
  params: { locale: "uk" | "ru" };
}) {
  const { locale } = params;
  const t = getDictionary(locale);

  return <ThankYouClient t={t} />;
}
