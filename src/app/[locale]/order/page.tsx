import { getDictionary } from "@/lib/i18n/getDictionary";
import VinOrderForm from "@/components/sections/vin-order-form";

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
      <VinOrderForm locale={locale} dictionary={t} />
    </div>
  );
};

export default OrderPage;
