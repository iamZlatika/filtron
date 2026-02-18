"use client";
import { List } from "react-window";

import type { NewsRowData } from "@/components/sections/admin-panel/news-table/table-row";
import NewsRow from "@/components/sections/admin-panel/news-table/table-row";
import type { News } from "@/schemas/news.schema";

interface NewsTableProps {
  news: News[];
}

const ROW_HEIGHT = 48;

const NewsTable = ({ news }: NewsTableProps) => {
  return (
    <div className="bg-white text-card-foreground overflow-hidden border rounded-md">
      <div className="flex w-full border-b bg-muted/50 text-sm font-medium text-muted-foreground">
        <div className="w-[250px] p-4 flex items-center">Новость</div>
        <div className="flex-1 p-4 flex items-center">Дата</div>
        <div className="w-[100px] p-4 text-right flex items-center justify-end">
          Действия
        </div>
      </div>

      <List<NewsRowData>
        rowCount={news.length}
        rowHeight={ROW_HEIGHT}
        rowComponent={NewsRow}
        rowProps={{ items: news }}
        tagName="div"
        overscanCount={5}
        className="scrollbar-thin scrollbar-thumb-muted-foreground/20 h-[500px] w-full block overflow-y-auto relative"
      />
    </div>
  );
};

export default NewsTable;
