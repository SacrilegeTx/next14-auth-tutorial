import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

import { CardWrapper } from '@/components/auth/CardWrapper';

export function ErrorCard() {
  return (
    <CardWrapper
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
      headerLabel="Oops! Something went wrong."
    >
      <div className="flex w-full items-center justify-center">
        <ExclamationTriangleIcon className="h-10 w-10 text-destructive" />
      </div>
    </CardWrapper>
  );
}
