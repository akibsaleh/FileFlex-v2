'use server';
import { auth } from '@/auth';
import { db } from '../lib/db';

export default async function getSingleFile(id: string) {
  const session = await auth();
  if (!session) {
    return { status: false, message: 'Unauthorized access', data: null };
  }
  try {
    const file = await db.uploadedFiles.findFirst({
      where: {
        id,
      },
    });
    return { status: true, message: 'file fetched', data: file };
  } catch (error) {
    return { status: false, message: 'No files found', data: null };
  }
}
