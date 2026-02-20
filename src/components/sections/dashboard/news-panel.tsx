import type { ActionResponse, News } from "@/schemas/news.schema";

interface NewsPanelProps {
  locale: string;
  news?: ActionResponse<News[]>;
}

const NewsPanel = ({ locale, news }: NewsPanelProps) => {
  const newsItems = news?.success ? news.data.slice(0, 3) : [];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(date));
  };

  return (
    <section className="relative z-10 w-full md:w-1/2 mt-6 md:mt-0">
      <div className="bg-[#0088cc]/60 backdrop-blur-md rounded-t-2xl p-6 shadow-xl pt-3 pb-8">
        {newsItems.length > 0 ? (
          <ul className="flex flex-col">
            {newsItems.map((item, index) => (
              <li
                key={item.id}
                className={`py-3 ${
                  index !== newsItems.length - 1
                    ? "border-b border-white/40"
                    : ""
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-lg font-bold text-white leading-tight1">
                    {locale === "uk" ? item.title_uk : item.title_ru}
                  </h3>
                  <span className="hidden md:block text-sm text-white/70 whitespace-nowrap">
                    {formatDate(item.createdAt)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-white/90">
                  {locale === "uk" ? item.text_uk : item.text_ru}
                </p>
                <div className="flex justify-end md:hidden mt-1">
                  <span className="text-xs text-white/70">
                    {formatDate(item.createdAt)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white">Новостей пока нет.</p>
        )}
        {news?.success === false && (
          <p className="text-red-200 text-sm">Ошибка: {news.error}</p>
        )}
      </div>
    </section>
  );
};

export default NewsPanel;
