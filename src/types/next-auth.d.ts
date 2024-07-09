import NextAuth from "next-auth/next";

declare module "next-auth"{
    interface User{
        email:String
    }
    interface Session{
        user: User &{
                  email:string
        }
        token:{
            email:string
        }
    }
}