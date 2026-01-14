import Dashboard from "@/components/sections/dashboard";
import { getDictionary } from "@/lib/i18n/getDictionary";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getDictionary(locale);

  return (
    <div className="flex justify-between items-center">
      <Dashboard t={t} locale={locale} />
    </div>
  );
}
