'use server';
import { db } from '@/lib/db';
import RegisterSchema from '@/schema/RegisterSchema';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

export default async function registerAction(
  data: z.infer<typeof RegisterSchema>,
): Promise<{ status: boolean; message: string }> {
  const validated = RegisterSchema.safeParse(data);
  if (!validated.success) {
    return { status: false, message: 'Please provide valid information' };
  }

  try {
    const isUserExist = await db.user.findUnique({
      where: {
        email: validated.data.email,
      },
    });
    if (isUserExist) {
      return { status: false, message: 'User already exist' };
    }
    const hashedPassword = await bcrypt.hash(validated.data.password, 10);
    const createUser = await db.user.create({
      data: {
        name: validated.data.name,
        email: validated.data.email,
        password: hashedPassword,
      },
    });

    if (!createUser) {
      throw new Error('Failed to sign up user');
    }

    return {
      status: true,
      message: 'Signed up successfully. You can login now',
    };
  } catch (error) {
    console.error(error);
    return { status: false, message: 'Error Server Connection' };
  }
}
