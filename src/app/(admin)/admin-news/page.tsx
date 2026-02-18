import { createNews, getAllNews } from "@/actions/news";
import AdminModalDialog from "@/components/sections/admin-panel/modal";
import NewsTable from "@/components/sections/admin-panel/news-table/news-table";

export default async function AdminNewsPage() {
  const newsList = await getAllNews();

  if (!newsList.success) {
    return <div>Ошибка: {newsList.error}</div>;
  }
  return (
    <div className="p-8">
      <div className="flex justify-between align-middle">
        <h1 className="text-2xl font-bold mb-4">Управление новостями</h1>
        <AdminModalDialog
          title="Добавить новость"
          action={createNews}
          mode="create"
        />
      </div>
      <div className="space-y-4">
        <NewsTable news={newsList.data} />
      </div>
    </div>
  );
}
