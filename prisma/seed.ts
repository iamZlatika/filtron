import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/client";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Начинаем заполнение базы данных...");

  const START = 4;
  const COUNT = 10;

  for (let i = START; i < START + COUNT; i++) {
    await prisma.news.create({
      data: {
        title_uk: `Тестова новина №${i}`,
        text_uk: `Це опис тестової новини під номером ${i} українською мовою.`,
        title_ru: `Тестовая новость №${i}`,
        text_ru: `Это описание тестовой новости под номером ${i} на русском языке.`,
      },
    });
  }

  console.log("Сид успешно завершен!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
