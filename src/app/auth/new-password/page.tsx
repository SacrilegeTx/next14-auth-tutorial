import { Suspense } from 'react';

import { NewPasswordForm } from '@/components/auth/NewPasswordForm';

function NewPasswordPage() {
  return (
    <Suspense fallback="Loading...">
      <NewPasswordForm />
    </Suspense>
  );
}

export default NewPasswordPage;
