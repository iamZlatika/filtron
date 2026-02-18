import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "@/lib/db/prisma";

import { checkRateLimit, resetRateLimit } from "./rate-limit";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        login: { label: "Login", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.login || !credentials?.password) {
          return null;
        }
        let ip = "127.0.0.1";

        if (req?.headers) {
          const forwarded = req.headers.get("x-forwarded-for");
          if (forwarded) {
            ip = forwarded.split(",")[0].trim();
          }
        }
        const { success } = await checkRateLimit(ip);
        if (!success) {
          throw new Error("Too many attempts. Please try again later.");
        }

        const user = await prisma.user.findUnique({
          where: {
            login: credentials.login,
          },
        });

        if (
          !user ||
          !(await bcrypt.compare(credentials.password, user.password))
        ) {
          return null;
        }
        await resetRateLimit(ip);
        return {
          id: user.id,
          name: user.login,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};
