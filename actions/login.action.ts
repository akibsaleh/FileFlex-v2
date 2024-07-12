'use server';
import { signIn } from '@/auth';
import { getUserByEmail } from '@/lib/utils/getUser';
import LoginSchema from '@/schema/LoginSchema';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { DEFAULT_LOGIN_REDIRECT } from '../routes';

export default async function loginAction(
  data: z.infer<typeof LoginSchema>,
): Promise<{ status: boolean; message: string }> {
  const validated = LoginSchema.safeParse(data);
  if (!validated.success) {
    return { status: false, message: 'Something Went wrong' };
  }
  const existingUser = await getUserByEmail(validated.data.email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { status: false, message: 'Email and password do not match' };
  }

  try {
    await signIn('credentials', {
      email: validated.data.email,
      password: validated.data.password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { status: false, message: 'Email and password do not match' };
        case 'OAuthAccountNotLinked':
          return {
            status: false,
            message: 'You are registered with another provider',
          };
        default:
          return { status: false, message: 'Something went baler wrong' };
      }
    }
    throw error;
  }
  return { status: true, message: 'Sign in Successful' };
}
