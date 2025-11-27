'use client'
import Banner from "@/components/sections/dashboard/banner";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Banner btnTitle={t("bannerVin")} bannerTitle={t("bannerTitle")} />
    </div>
  );
};

export default Dashboard;
