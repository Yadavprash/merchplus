import  CredentialsProvider  from "next-auth/providers/credentials";

export const NEXT_AUTH_CONFIG = {
    providers : [
      CredentialsProvider({
        name : 'Credentials',
        credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials){

            return {
              id :"5ddef83e-01ee-4e9e-a083-717f816f8408",
              email: "Yadavprashant@gmail.com",
              name: "Prashant Yadav",
            }
          }
      })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      session:async ({ session, token, user }: any) => {
          if (session.user) {
              session.user.id = token.sub
          }
          return session
      }
    },
}