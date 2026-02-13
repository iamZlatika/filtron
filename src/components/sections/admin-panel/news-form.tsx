"use client";

import { useMemo, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

import { createNewsSchema, NewsFormValues } from "@/schemas/news.schema";

interface NewsFormProps {
  action: (
    values: NewsFormValues,
  ) => Promise<{ success: boolean; data?: any; error?: string }>;
  onSuccess?: () => void;
}

const NewsForm = ({ action, onSuccess }: NewsFormProps) => {
  const [isPending, startTransition] = useTransition();

  const schema = useMemo(
    () =>
      createNewsSchema({
        title_uk: "Нужен заголовок на украинском языке",
        text_uk: "Нужен текст новости на украинском языке",
        title_ru: "Нужен заголовок на русском языке",
        text_ru: "Нужен текст новости на русском языке",
      }),
    [],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title_uk: "",
      text_uk: "",
      title_ru: "",
      text_ru: "",
    },
  });

  const onSubmit = (values: NewsFormValues) => {
    startTransition(async () => {
      try {
        const result = await action(values);
        if (result?.success) {
          onSuccess?.();
        }
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-md md:max-w-none mt-4"
    >
      <div className="grid gap-4">
        {/* uk */}
        <div className="space-y-1 md:space-y-2">
          <Label className="md:text-base">
            Заголовок на украинском
            <span className="text-destructive">*</span>
          </Label>
          <Input
            {...register("title_uk")}
            placeholder="Заголовок на украинском"
            className="md:h-12 md:text-base"
          />
          {errors.title_uk && (
            <p className="text-sm md:text-base text-destructive">
              {errors.title_uk.message}
            </p>
          )}
        </div>

        <div className="space-y-1 md:space-y-2">
          <Label className="md:text-base">
            Текст новости на украинском
            <span className="text-destructive">*</span>
          </Label>
          <Textarea
            {...register("text_uk")}
            placeholder="Текст на украинском"
            rows={4}
            className="md:min-h-[120px] md:text-base"
          />
          {errors.text_uk && (
            <p className="text-sm md:text-base text-destructive">
              {errors.text_uk.message}
            </p>
          )}
        </div>

        {/* ru */}
        <div className="space-y-1 md:space-y-2">
          <Label className="md:text-base">
            Заголовок на русском
            <span className="text-destructive">*</span>
          </Label>
          <Input
            {...register("title_ru")}
            placeholder="Заголовок на русском"
            className="md:h-12 md:text-base"
          />
          {errors.title_ru && (
            <p className="text-sm md:text-base text-destructive">
              {errors.title_ru.message}
            </p>
          )}
        </div>

        <div className="space-y-1 md:space-y-2">
          <Label className="md:text-base">
            Текст на русском
            <span className="text-destructive">*</span>
          </Label>
          <Textarea
            {...register("text_ru")}
            placeholder="Текст на русском"
            rows={4}
            className="md:min-h-[120px] md:text-base"
          />
          {errors.text_ru && (
            <p className="text-sm md:text-base text-destructive">
              {errors.text_ru.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between items-end">
        <Button
          type="submit"
          disabled={isPending}
          className="w-full md:w-auto md:h-12 md:px-8 md:text-base text-white"
        >
          {isPending ? "Создание" : "Создать новость"}
        </Button>

        <DialogClose asChild>
          <Button
            type="button"
            variant="outline"
            className="mt-4 w-full md:w-auto md:h-12 md:px-8"
          >
            Закрыть
          </Button>
        </DialogClose>
      </div>
    </form>
  );
};

export default NewsForm;
