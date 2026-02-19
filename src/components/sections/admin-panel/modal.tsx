"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import NewsForm from "@/components/sections/admin-panel/news-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type {
  ActionResponse,
  News,
  NewsFormValues,
} from "@/schemas/news.schema";

type ActionResult<T> = Promise<ActionResponse<T>>;

interface CreateProps<T> {
  mode: "create";
  title: ReactNode;
  action: (values: NewsFormValues) => ActionResult<T>;
}

interface EditProps<T> {
  mode: "edit";
  title: ReactNode;
  id: string;
  content: NewsFormValues;
  action: (id: string, values: NewsFormValues) => ActionResult<T>;
}

type AdminModalProps<T = News> = CreateProps<T> | EditProps<T>;

const AdminModalDialog = <T,>(props: AdminModalProps<T>) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (values: NewsFormValues) => {
    if (props.mode === "edit") {
      return props.action(props.id, values);
    }

    return props.action(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{props.title}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
        </DialogHeader>
        <NewsForm
          action={handleSubmit}
          onSuccess={() => setOpen(false)}
          initialValues={props.mode === "edit" ? props.content : undefined}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AdminModalDialog;
