import { Pencil } from "lucide-react";
import type { CSSProperties, ReactElement } from "react";

import { updateNews } from "@/actions/news";
import AdminModalDialog from "@/components/sections/admin-panel/modal";
import DeleteNewsDialog from "@/components/sections/admin-panel/news-table/delete-dialog";
import type { News } from "@/schemas/news.schema";

export interface NewsRowData {
  items: News[];
}

export interface NewsRowProps extends NewsRowData {
  index: number;
  style: CSSProperties;
  ariaAttributes: {
    "aria-posinset": number;
    "aria-setsize": number;
    role: "listitem";
  };
}

const NewsRow = ({
  index,
  style,
  items,
  ariaAttributes,
}: NewsRowProps): ReactElement | null => {
  const news = items[index];

  if (!news) return null;

  return (
    <div
      {...ariaAttributes}
      style={style}
      className="flex w-full items-center border-b border-[#f5f5f5] bg-white text-sm transition-colors hover:bg-muted/50"
    >
      <div className="w-[250px] p-4 truncate font-medium">{news.title_ru}</div>
      <div className="flex-1 p-4 text-muted-foreground">
        {new Date(news.createdAt).toLocaleDateString()}
      </div>
      <div className="w-[400px] p-4 text-right flex items-center justify-end gap-2">
        <AdminModalDialog
          title={<Pencil />}
          action={updateNews}
          mode="edit"
          id={news.id}
          content={news}
        />
        <DeleteNewsDialog id={news.id} title={news.title_ru} />
      </div>
    </div>
  );
};

export default NewsRow;
