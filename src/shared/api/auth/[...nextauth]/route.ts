import bcrypt from "bcrypt"
import NextAuth, { AuthOptions, DefaultSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import prisma from "@/src/shared/lib/prismadb"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        login: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      //@ts-ignore
      async authorize(credentials) {
        if (!credentials?.login || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findUnique({
          where: {
            login: credentials.login
          }
        });

        if (!user || !user?.password) {
          throw new Error('Invalid credentials')
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials')
        }

        if(typeof user === null) {
          return null
        }

        return user
      }
    })
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: async ({ session, token,  user }) => {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name
        session.user.role = token.role
      }
      return session;
    },
   jwt: async ({ user, token }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role
      }
      return token;
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }