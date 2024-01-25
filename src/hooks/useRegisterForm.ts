import type * as z from 'zod';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';

import { RegisterSchema } from '@/schemas';
import { register } from '@/actions/auth/register';

export function useRegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  const [successMessage, setSuccessMessage] = useState<string | undefined>('');
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setErrorMessage('');
    setSuccessMessage('');
    startTransition(() => {
      register(values).then((result) => {
        setErrorMessage(result.error);
        setSuccessMessage(result.success);
      });
    });
  };

  return {
    isPending,
    errorMessage,
    successMessage,
    form,
    onSubmit,
  };
}
