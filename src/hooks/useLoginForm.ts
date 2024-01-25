import type * as z from 'zod';

import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { login } from '@/actions/auth/login';
import { LoginSchema } from '@/schemas';

export function useLoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? undefined;
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'This account is linked to different provider. Please sign up or login with a different account.'
      : '';
  const [isPending, startTransition] = useTransition();
  const [loaded, setLoaded] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  const [successMessage, setSuccessMessage] = useState<string | undefined>('');
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setErrorMessage('');
    setSuccessMessage('');
    startTransition(() => {
      login(values, callbackUrl)
        .then((result) => {
          if (result?.error) {
            form.reset({ email: values.email, password: '' });
            setErrorMessage(result.error);
          }

          if (result?.success) {
            form.reset({ email: values.email, password: '' });
            setSuccessMessage(result.success);
          }

          if (result?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setErrorMessage('An error occurred. Please try again later.'));
    });
  };

  return {
    urlError,
    isPending,
    loaded,
    setLoaded,
    errorMessage,
    successMessage,
    form,
    onSubmit,
    showTwoFactor,
  };
}
