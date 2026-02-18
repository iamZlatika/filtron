"use server";

import { revalidatePath } from "next/cache";

import { normalizeError } from "@/actions/services";
import type {
  ActionResponse,
  News,
  NewsFormValues,
} from "@/schemas/news.schema";
import { createNewsSchema } from "@/schemas/news.schema";
import { newsService } from "@/services/news.service";

export async function createNews(
  rawData: NewsFormValues,
): Promise<ActionResponse<News>> {
  const validatedFields = createNewsSchema({
    title_uk: "Заголовок обязателен (UA)",
    text_uk: "Текст обязателен (UA)",
    title_ru: "Заголовок обязателен (RU)",
    text_ru: "Текст обязателен (RU)",
  }).safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Неверные данные формы",
    };
  }

  try {
    const news = await newsService.create(validatedFields.data);

    revalidatePath("/admin-news", "page");

    return { success: true, data: news };
  } catch (error: unknown) {
    console.error("Fetch Error:", error);
    return { success: false, error: normalizeError(error) };
  }
}

export async function getAllNews(): Promise<ActionResponse<News[]>> {
  try {
    const newsData = await newsService.getAll();
    return { success: true, data: newsData };
  } catch (error: unknown) {
    console.error("Fetch Error:", error);
    return { success: false, error: normalizeError(error) };
  }
}

export async function deleteNewsAction(
  id: string,
): Promise<ActionResponse<void>> {
  try {
    await newsService.delete(id);
    revalidatePath("/admin-news", "page");
    return { success: true, data: undefined };
  } catch (error: unknown) {
    console.error("Fetch Error:", error);
    return { success: false, error: normalizeError(error) };
  }
}
export async function updateNews(
  id: string,
  rawData: NewsFormValues,
): Promise<ActionResponse<News>> {
  const validatedFields = createNewsSchema({
    title_uk: "Заголовок обязателен (UA)",
    text_uk: "Текст обязателен (UA)",
    title_ru: "Заголовок обязателен (RU)",
    text_ru: "Текст обязателен (RU)",
  }).safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Неверные данные формы",
    };
  }

  try {
    const news = await newsService.update(id, validatedFields.data);

    revalidatePath("/admin-news", "page");

    return { success: true, data: news };
  } catch (error: unknown) {
    console.error("Fetch Error:", error);
    return { success: false, error: normalizeError(error) };
  }
}
