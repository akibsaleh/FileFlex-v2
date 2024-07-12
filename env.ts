import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';
export const env = createEnv({
  shared: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
  },
  server: {
    BASE_URL: z.string().url(),
    DATABASE_URL: z.string().url(),
    AUTH_SECRET: z.string().min(1),
    AUTH_GOOGLE_ID: z.string().min(1),
    AUTH_GOOGLE_SECRET: z.string().min(1),
    RESEND_KEY: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    BASE_URL: process.env.BASE_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    RESEND_KEY: process.env.RESEND_KEY,
  },
});
