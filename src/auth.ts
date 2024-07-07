import NextAuth,{CredentialsSignin} from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredintialProvider from "next-auth/providers/credentials"
import email from "next-auth/providers/email"

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GoogleProvider({

  }),
  CredintialProvider({
    name: 'Credentials',
    credentials: {
      email: { label: "Email", type: "text" },
      password: { label: "Password", type: "password" }
    },
    authorize: async({email,password}:CredentialsSignin)=>{
        console.log(email,password)

        if(typeof email !== 'string'){
          throw new Error('Email is required')
        }
        const user = {email}
    }

  })]
})