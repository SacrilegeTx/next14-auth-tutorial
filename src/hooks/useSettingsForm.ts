import type * as z from 'zod';

import { useTransition, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { SettingsSchema } from '@/schemas';
import { settings } from '@/actions/settings/settings';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export function useSettingsForm() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const { user } = useCurrentUser();
  const { update } = useSession();
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((res) => {
          if (res.error) {
            setError(res.error);
          }
          if (res.success) {
            update();
            setSuccess(res.success);
          }
        })
        .catch((err) => {
          setError(`Something went wrong => ${err.message}`);
        });
    });
  };

  return {
    isPending,
    error,
    success,
    form,
    onSubmit,
    loaded,
    setLoaded,
    user,
  };
}
