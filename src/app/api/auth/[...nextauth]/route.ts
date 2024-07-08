import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { comparePasswords } from "@/utils/password"; 

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials || {};

        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            fullName: true,
            email: true,
            password: true,
          },
        });

        if (user && password && await comparePasswords(password, user.password)) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },

  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = token.user as { fullName?: string | null | undefined; email?: string | null | undefined; };
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30,
  },
});
