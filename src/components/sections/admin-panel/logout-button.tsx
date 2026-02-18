"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export const LogoutButton = () => {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="md:h-12 md:px-8 md:text-base text-white"
    >
      Выйти
    </Button>
  );
};
