
import { getDictionary } from "@/lib/i18n/getDictionary";
import ThankYouClient from "@/components/sections/thank-you";

export default async function ThankYouPage({
  params,
}: {
  params: { locale: "uk" | "ru" };
}) {
  const { locale } = params;
  const t = getDictionary(locale);

  return <ThankYouClient t={t} />;
}
