import { NextAuthOptions, RequestInternal, User } from "next-auth";
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
      async authorize(credentials: Record<"email" | "password", string> | undefined, req: Pick<RequestInternal, "query" | "body" | "headers" | "method">): Promise<User | null> {
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
        
        // Return user object
        return {
          id: `${existingUser.id}`,
          name: existingUser.fullName,
          email: existingUser.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name?.toString();
        token.id = user.id.toString(); // Ensure id is a string
        token.email = user.email.toString(); // Add email to token
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        name:token.name,
        id: (token.id as string).toString(), // Add id to session user and cast to string
        email: token.email || '', // Add email to session user, default to empty string if undefined or null
      };
      return session;
    },
  },
};

export default authOptions;
