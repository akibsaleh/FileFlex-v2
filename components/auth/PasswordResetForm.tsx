'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Chip, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';
import PasswordResetSchema from '../../schema/PasswordResetSchema';
import TailLoaderIcon from '../icons/TailLoaderIcon';
import FormInput from './FormInput';

const PasswordResetForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const [formRes, setFormRes] = React.useState<{
    status: boolean;
    message?: string;
  } | null>(null);
  const form = useForm<z.infer<typeof PasswordResetSchema>>({
    resolver: zodResolver(PasswordResetSchema),
  });

  const handleOnSubmit = async (
    values: z.infer<typeof PasswordResetSchema>,
  ) => {
    startTransition(async () => {
      try {
        console.log(values);
      } catch (error) {
        setFormRes({
          status: false,
          message: 'Something went wrong',
        });
      }
    });
  };
  return (
    <Paper elevation={1} sx={{ px: 5, pt: 4, pb: 5, width: 360 }}>
      <Typography
        align='center'
        fontSize='20px'
        fontWeight={700}
        textTransform='capitalize'
      >
        Reset Password
      </Typography>
      <Typography align='center' fontWeight={500}>
        Enter your new password
      </Typography>
      <FormProvider {...form}>
        <Stack
          component='form'
          direction='column'
          gap={2}
          mt={3}
          onSubmit={form.handleSubmit(handleOnSubmit)}
        >
          <FormInput
            label='Password'
            name='password'
            type='password'
            isDisabled={isPending}
          />
          <FormInput
            label='Confirm Password'
            name='confirmPassword'
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
            {isPending ? <TailLoaderIcon /> : 'Update Password'}
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
    </Paper>
  );
};

export default PasswordResetForm;
