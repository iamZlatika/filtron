"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface IActionButton {
  title: string;
  color?: string;
}

const ActionButton = ({ title, color }: IActionButton) => {
  return (
    <Link href="/order">
      <Button className="bg-primary text-white text-sm md:text-base h-9 md:h-10 px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
        {title}
      </Button>
    </Link>
  );
};

export default ActionButton;
