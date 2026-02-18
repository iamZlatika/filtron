import { prisma } from "@/lib/db/prisma";

import { Prisma } from "../../../prisma/generated/client";

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const CLEANUP_THRESHOLD = 24 * 60 * 60 * 1000;

export async function checkRateLimit(ip: string) {
  const now = new Date();

  await prisma.loginAttempt.deleteMany({
    where: {
      lastAttempt: {
        lt: new Date(now.getTime() - CLEANUP_THRESHOLD),
      },
    },
  });

  const attempt = await prisma.loginAttempt.findUnique({
    where: { ip },
  });

  if (!attempt) {
    await prisma.loginAttempt.create({
      data: { ip, count: 1, lastAttempt: now },
    });
    return { success: true };
  }

  if (now.getTime() - attempt.lastAttempt.getTime() > WINDOW_MS) {
    await prisma.loginAttempt.update({
      where: { ip },
      data: { count: 1, lastAttempt: now },
    });
    return { success: true };
  }

  if (attempt.count >= MAX_ATTEMPTS) {
    return { success: false };
  }

  await prisma.loginAttempt.update({
    where: { ip },
    data: {
      count: attempt.count + 1,
      lastAttempt: now,
    },
  });

  return { success: true };
}

export async function resetRateLimit(ip: string) {
  try {
    await prisma.loginAttempt.delete({
      where: { ip },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return;
    }
    throw error;
  }
}
