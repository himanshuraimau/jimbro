import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import  User  from "./models/userModel";
import {compare} from "bcryptjs";


export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
         const email = credentials.email as string;
         const password = credentials.password as string;
        if (!email || !password) {
          throw new Error("Email and password are required")};

        const user  = await User.findOne({email}).select('+password');
        if (!user) {
          throw new Error("Invalid email or password");
        }
        if(!user.password){
          throw new Error("Invalid email or password");
        
        }
        const isMatch = await compare(password,user.password);
        if (!isMatch) {
          throw new Error("Invalid email or password");
        }

        return {email: user.email, name: user.name, id: user._id};
      }
    }),
   
  ],
  });