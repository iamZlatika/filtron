import { z } from "zod";
type ValidationMessages = {
  title_uk: string;
  text_uk: string;
  title_ru: string;
  text_ru: string;
};

export const createNewsSchema = (messages: ValidationMessages) => {
  return z.object({
    title_uk: z.string().min(3, messages.title_uk),
    text_uk: z.string().min(5, messages.text_uk),
    title_ru: z.string().min(3, messages.title_ru),
    text_ru: z.string().min(5, messages.text_ru),
  });
};

export type NewsFormValues = z.infer<ReturnType<typeof createNewsSchema>>;

export const newsSchema = z.object({
  id: z.string(),
  title_uk: z.string(),
  text_uk: z.string(),
  title_ru: z.string(),
  text_ru: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type News = z.infer<typeof newsSchema>;

export type ActionResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };
