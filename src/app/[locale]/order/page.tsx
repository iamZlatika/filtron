import VinOrderForm from "@/components/sections/vin-order-form";
import { getDictionary } from "@/lib/i18n/getDictionary";

const OrderPage = async ({
  params,
}: {
  params: Promise<{ locale: "uk" | "ru" }>;
}) => {
  const { locale } = await params;
  const t = getDictionary(locale);
  return (
    <>
      <h1 className="h1-bold">{t.orderTitle}</h1>
      <VinOrderForm dictionary={t} />
    </>
  );
};

export default OrderPage;
