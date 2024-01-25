import type * as z from 'zod';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';

import { NewPasswordSchema } from '@/schemas';
import { newPassword } from '@/actions/auth/new-password';

export function useNewPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [isPending, startTransition] = useTransition();
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  const [successMessage, setSuccessMessage] = useState<string | undefined>('');
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setErrorMessage('');
    setSuccessMessage('');
    startTransition(() => {
      newPassword(values, token!).then((result) => {
        setErrorMessage(result?.error);
        setSuccessMessage(result?.success);
      });
    });
  };

  return {
    isPending,
    loaded,
    setLoaded,
    errorMessage,
    successMessage,
    form,
    onSubmit,
  };
}
