'use client';
import registerAction from '@/actions/register.action';
import FormInput from '@/components/auth/FormInput';
import SocialLogin from '@/components/auth/SocialLogin';
import TailLoaderIcon from '@/components/icons/TailLoaderIcon';
import RegisterSchema from '@/schema/RegisterSchema';
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
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const RegisterForm = () => {
  const [formRes, setFormRes] = React.useState<{
    status: boolean;
    message: string;
  } | null>(null);
  const [isPending, startTransition] = React.useTransition();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });

  const handleOnSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    startTransition(async () => {
      try {
        const res = await registerAction(values);
        setFormRes(res);
      } catch (error) {
        setFormRes({ status: false, message: 'Something went wrong' });
        console.error(error);
      }
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
          Create a new account
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
          Already have an account?{' '}
          <Link className='underline text-[#0b3c5d]' href='/auth/login'>
            Login now
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
            label='Name'
            name='name'
            type='text'
            isDisabled={isPending}
          />
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
            disabled={isPending}
            sx={{ height: 48 }}
          >
            {isPending ? <TailLoaderIcon /> : 'Register'}
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

export default RegisterForm;
