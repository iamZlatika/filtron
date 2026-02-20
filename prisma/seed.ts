import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { Pool } from "pg";

import { PrismaClient } from "./generated/client";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Создание администратора...");

  const adminName = "filtradmin";
  const password = "F1ltro№@26";
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { login: adminName },
    update: {
      password: hashedPassword,
    },
    create: {
      login: adminName,
      password: hashedPassword,
    },
  });

  console.log(`Администратор ${adminName} успешно создан или обновлен.`);
}

main()
  .catch((e) => {
    console.error("Ошибка при выполнении сида:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
