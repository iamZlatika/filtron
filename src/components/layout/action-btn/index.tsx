import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getLocalizedHref } from "@/lib/utils";

interface IActionButton {
  title: string;
  color?: string;
  locale: string;
}

const ActionButton = ({ title, locale }: IActionButton) => {
  const href = getLocalizedHref("/order", locale);
  return (
    <Button
      asChild
      className="bg-primary text-white text-base md:text-lg h-9 md:h-10 px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
    >
      <Link href={href}> {title} </Link>
    </Button>
  );
};

export default ActionButton;
