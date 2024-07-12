'use server';
import { auth } from '@/auth';
import { db } from '../lib/db';

export default async function getFiles() {
  const session = await auth();
  if (!session) {
    return { status: false, message: 'Unauthorized access', data: [] };
  }
  const files = await db.uploadedFiles.findMany({
    where: {
      userId: session.user?.id!,
      email: session.user?.email!,
    },
  });

  if (files.length === 0) {
    return { status: false, message: 'No files found', data: files };
  }

  return { status: true, message: 'file fetched', data: files };
}
