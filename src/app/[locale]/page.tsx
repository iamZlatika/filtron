import { getAllNews } from "@/actions/news";
import Banner from "@/components/sections/dashboard/banner";
import NewsPanel from "@/components/sections/dashboard/news-panel";
import { getDictionary } from "@/lib/i18n/getDictionary";

export async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const newsList = await getAllNews();
  const { locale } = await params;
  const t = getDictionary(locale);

  return (
    <div className="flex-1 flex flex-col justify-evenly">
      <Banner t={t} locale={locale} />
      <NewsPanel locale={locale} news={newsList} />
    </div>
  );
}

export default Home;
