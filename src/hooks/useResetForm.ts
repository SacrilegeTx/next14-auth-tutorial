import type * as z from 'zod';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ResetSchema } from '@/schemas';
import { resetPassword } from '@/actions/auth/reset-password';

export function useResetForm() {
  const [isPending, startTransition] = useTransition();
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  const [successMessage, setSuccessMessage] = useState<string | undefined>('');
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setErrorMessage('');
    setSuccessMessage('');
    startTransition(() => {
      resetPassword(values).then((result) => {
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
