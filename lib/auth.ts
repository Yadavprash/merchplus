import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/db";


export const NEXT_AUTH_CONFIG: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "guest",
      name: "Guest",
      credentials: {},
      async authorize() {
        try {
          const guestUser = await prisma.user.create({
            data: {
              name: `Guest_${Math.floor(Math.random() * 10000)}`,
              email: `guest_${Math.floor(Math.random() * 10000)}@example.com`,
            },
          });
          return guestUser;
        } catch (error) {
          console.error("Error creating guest user:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: 'c1Sez681eEPN/xd52i7yQxnFYRK87c4wOvd9EVf1cRc=',
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }: { token: JWT; user?: any; account?: any }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.id = user.id; 
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token.id) {
        session.user.id = String(token.id); 
      }
      return session;
    },
  },
  debug:true,
};
