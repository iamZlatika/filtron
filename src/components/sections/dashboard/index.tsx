import Banner from "@/components/sections/dashboard/banner";
import { Dictionary } from "@/lib/i18n/getDictionary";

interface DashboardProps {
  locale: string;
  t: Dictionary;
}

const Dashboard = ({ t, locale }: DashboardProps) => {
  return (
    <div>
      <Banner t={t} locale={locale} />
    </div>
  );
};

export default Dashboard;
