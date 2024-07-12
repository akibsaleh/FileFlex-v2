import { env } from '@/env';
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();
if (env.NODE_ENV !== 'production') globalThis.prisma = db;

export const testConnection = async () => {
  try {
    await db.$connect();
    console.log('Successfully connected to MongoDB');
    return true;
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    return false;
  } finally {
    await db.$disconnect();
  }
};
