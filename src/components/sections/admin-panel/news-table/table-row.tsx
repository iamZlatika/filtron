import { CSSProperties, ReactElement } from "react";
import { News } from "@/schemas/news.schema";

export interface NewsRowData {
  items: News[];
}

// Определяем интерфейс пропсов точно в соответствии с react-window.d.ts
export interface NewsRowProps extends NewsRowData {
  index: number;
  style: CSSProperties;
  ariaAttributes: {
    "aria-posinset": number;
    "aria-setsize": number;
    role: "listitem";
  };
}

// Экспортируем как обычную функцию для совместимости типов
export const NewsRow = ({
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
      <div className="w-[100px] p-4 text-right">
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 text-destructive">
          ✕
        </button>
      </div>
    </div>
  );
};

NewsRow.displayName = "NewsRow";
