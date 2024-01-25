import { Suspense } from 'react';

import { RegisterForm } from '@/components/auth/RegisterForm';

function RegisterPage() {
  return (
    <div>
      <Suspense fallback="Loading...">
        <RegisterForm />
      </Suspense>
    </div>
  );
}

export default RegisterPage;
