'use client';
import loginAction from '@/actions/login.action';
import FormInput from '@/components/auth/FormInput';
import SocialLogin from '@/components/auth/SocialLogin';
import TailLoaderIcon from '@/components/icons/TailLoaderIcon';
import LoginSchema from '@/schema/LoginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const LoginForm = () => {
  const router = useRouter();
  const [formRes, setFormRes] = React.useState<{
    status: boolean;
    message: string;
  } | null>(null);
  const [isPending, startTransition] = React.useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const handleOnSubmit = async (values: z.infer<typeof LoginSchema>) => {
    startTransition(async () => {
      const res = await loginAction(values);
      setFormRes({
        status: res.status,
        message: res.message,
      });
    });
  };

  return (
    <Paper variant='elevation' sx={{ width: 360, padding: 3 }}>
      <Box mb={2.5}>
        <Typography
          component='h2'
          align='center'
          sx={{
            textTransform: 'capitalize',
            fontSize: '24px !important',
            fontWeight: 'bold !important',
            color: 'text.primary',
          }}
        >
          Log in to your account
        </Typography>
        <Typography
          component='p'
          align='center'
          sx={{
            fontSize: '14px !important',
            fontWeight: '500 !important',
            color: 'text.primary',
          }}
        >
          Don&apos;t have account?{' '}
          <Link className='underline text-[#0b3c5d]' href='/auth/register'>
            Register now
          </Link>
        </Typography>
      </Box>
      {/* Login Form  */}
      <FormProvider {...form}>
        <Stack
          component='form'
          direction='column'
          gap={2}
          onSubmit={form.handleSubmit(handleOnSubmit)}
        >
          <FormInput
            label='Email'
            name='email'
            type='email'
            isDisabled={isPending}
          />
          <FormInput
            label='Password'
            name='password'
            type='password'
            isDisabled={isPending}
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            size='large'
            sx={{ height: 48 }}
            disabled={isPending}
          >
            {isPending ? <TailLoaderIcon /> : 'Log in'}
          </Button>
        </Stack>
      </FormProvider>
      {formRes && (
        <Chip
          label={formRes?.message}
          color={formRes.status ? 'success' : 'error'}
          sx={{ borderRadius: 1, marginTop: 2, width: '100%' }}
        />
      )}
      <Divider sx={{ marginY: 2 }}>
        <Chip label='OR' size='small' />
      </Divider>
      <SocialLogin />
    </Paper>
  );
};

export default LoginForm;
