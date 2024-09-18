import  CredentialsProvider  from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const NEXT_AUTH_CONFIG = {
    providers : [
      CredentialsProvider({
        id: "guest",
      name: "Guest",
      credentials: {},
      async authorize() {
        const guestUser = await prisma.user.create({
          data: {
            name: `Guest_${Math.floor(Math.random() * 10000)}`,
            email: `guest_${Math.floor(Math.random() * 10000)}@example.com`,
          },
        });

        if (guestUser) {
          return guestUser;
        } else {
          return null;
        }
      },
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
      })
    ],
    secret: process.env.SECRET,
    adapter:PrismaAdapter(prisma),
    session:{
      strategy:'jwt' as const , 
    },
    callbacks: {
      session:async ({ session, token, user }: any) => {
          if (session.user) {
              session.user.id = token.sub
          }
          return session
      }
    },  
}