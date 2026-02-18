import { prisma } from "@/lib/db/prisma";
import type { NewsFormValues } from "@/schemas/news.schema";

export const newsService = {
  async getAll() {
    return prisma.news.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  async create(data: NewsFormValues) {
    return prisma.news.create({
      data,
    });
  },

  async delete(id: string) {
    return prisma.news.delete({
      where: { id },
    });
  },

  async update(id: string, data: NewsFormValues) {
    return prisma.news.update({
      where: { id },
      data,
    });
  },
};
