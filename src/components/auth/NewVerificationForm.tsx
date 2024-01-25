'use client';

import { BeatLoader } from 'react-spinners';
import { useEffect } from 'react';

import { CardWrapper } from '@/components/auth/CardWrapper';
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';
import { useNewVerificationForm } from '@/hooks/useNewVerificationForm';

export function NewVerificationForm() {
  const { error, success, onSubmit } = useNewVerificationForm();

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      headerLabel="Confirming your verification"
    >
      <div className="flex w-full items-center justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
}
