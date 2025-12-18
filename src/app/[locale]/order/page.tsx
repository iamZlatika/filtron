import { getDictionary } from "@/lib/i18n/getDictionary";

const OrderPage = async ({
  params,
}: {
  params: Promise<{ locale: "uk" | "ru" }>;
}) => {
  const { locale } = await params;
  const t = getDictionary(locale);
  return (
    <div>
      <h1 className="h1-bold">{t.orderTitle}</h1>
    </div>
  );
};

export default OrderPage;
