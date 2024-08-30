import  CredentialsProvider  from "next-auth/providers/credentials";
import prisma from "@/db";

export const NEXT_AUTH_CONFIG = {
    providers : [
      CredentialsProvider({
        name : 'Credentials',
        credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials){
            
            try{
              const result = prisma.user.findUnique({
                where:{
                  id:"6784bca8-3146-454e-941f-62d2511df37c"
                }
              })

              return result;
            }catch(e){
              return null;
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