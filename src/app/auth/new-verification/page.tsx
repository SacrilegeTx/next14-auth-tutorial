import { Suspense } from 'react';

import { NewVerificationForm } from '@/components/auth/NewVerificationForm';

function NewVerificationPage() {
  return (
    <Suspense fallback="Loading...">
      <NewVerificationForm />
    </Suspense>
  );
}

export default NewVerificationPage;
