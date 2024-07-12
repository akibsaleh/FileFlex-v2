import authConfig from '@/auth.config';
import { db } from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { Session } from 'next-auth';
import { NextRequest } from 'next/server';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    //   linkAccount: async ({ user }) => {
    //     await db.user.update({
    //       where: { id: user.id },
    //       data: {
    //         emailVerified: new Date(),
    //       },
    //     });
    //   },
  },
  callbacks: {
    // async signIn({ user, account }) {
    //   if (account?.provider !== 'credentials') {
    //     return true;
    //   }
    //   const existingUser = await getUserById(user.id!);
    //   if (existingUser && !existingUser.emailVerified) {
    //     return false;
    //   }
    //   return true;
    // },
  },
  ...authConfig,
});

export interface NextAuthRequest extends NextRequest {
  auth: Session | null;
}
