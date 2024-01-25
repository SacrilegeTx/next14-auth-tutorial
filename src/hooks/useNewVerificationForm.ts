import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

import { newVerification } from '@/actions/auth/new-verification';

export function useNewVerificationForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError('Missing token');

      return;
    }
    newVerification(token)
      .then((response) => {
        setError(response.error);
        setSuccess(response.success);
      })
      .catch((error) => {
        setError(`Something went wrong! Error: ${error.message}`);
      });
  }, [token, success, error]);

  return {
    error,
    success,
    onSubmit,
  };
}
