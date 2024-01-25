import { Suspense } from 'react';

import { LoginForm } from '@/components/auth/LoginForm';

function LoginPage() {
  return (
    <div>
      <Suspense fallback="Loading...">
        <LoginForm />
      </Suspense>
    </div>
  );
}

export default LoginPage;
