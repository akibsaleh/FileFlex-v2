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
  events: {},
  callbacks: {},
  ...authConfig,
});

export interface NextAuthRequest extends NextRequest {
  auth: Session | null;
}
