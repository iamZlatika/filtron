"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { NewsFormValues } from "@/schemas/news.schema";
import NewsForm from "@/components/sections/admin-panel/news-form";
import { useState } from "react";

interface AdminModalProps {
  title: string;
  action: (
    values: NewsFormValues,
  ) => Promise<{ success: boolean; data?: any; error?: string }>;
  content?: NewsFormValues;
}
const AdminModalDialog = ({ title, action, content }: AdminModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{title}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <NewsForm action={action} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default AdminModalDialog;
