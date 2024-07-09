import { NextAuthOptions, RequestInternal } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined, req: Pick<RequestInternal, "query" | "body" | "headers" | "method">) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        const existingUser = await db.user.findFirst({
          where: {
            email: credentials.email,
          },
        });
        
        if (!existingUser) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(credentials.password, existingUser.password);

        if (!passwordMatch) {
          return null;
        }
        console.log(existingUser);
        return {
          id: `${existingUser.id}`,
          name: existingUser.fullName,
          email: existingUser.email,
        };
      },
    }),
  ],
};
