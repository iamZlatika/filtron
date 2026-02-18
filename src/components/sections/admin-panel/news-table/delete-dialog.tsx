"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";

import { deleteNewsAction } from "@/actions/news";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DeleteNewsDialogProps {
  id: string;
  title: string;
}

const DeleteNewsDialog = ({ id, title }: DeleteNewsDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteNewsAction(id);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to delete news:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {/* Добавлены классы text-destructive (красный цвет) и cursor-pointer */}
        <Button variant="destructive" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Удаление новости</DialogTitle>
          <DialogDescription>
            Вы точно хотите удалить новость{" "}
            <span className="font-bold text-foreground">"{title}"</span>? Это
            действие нельзя будет отменить.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Отмена
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Удаление..." : "Удалить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteNewsDialog;
