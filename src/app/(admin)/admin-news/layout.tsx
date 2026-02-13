import { ReactNode } from "react";
import { LogoutButton } from "@/components/sections/admin-panel/logout-button";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="wrapper min-h-screen flex flex-col">
      <header className="flex justify-between items-center py-6 border-b mb-6">
        <span className="text-xl md:text-2xl font-semibold text-gray-800">
          Какие сегодня новости?
        </span>
        <LogoutButton />
      </header>

      <main className="grow">{children}</main>
    </div>
  );
}
