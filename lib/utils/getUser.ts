import { db } from '@/lib/db';

export async function getUserByEmail(email: string) {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) return null;
  return user;
}

export async function getUserById(id: string) {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) return null;
  return user;
}
