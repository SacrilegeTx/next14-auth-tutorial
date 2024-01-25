'use client';

import type { UserRole } from '@prisma/client';

import { useCurrentRole } from '@/hooks/useCurrentRole';
import { FormError } from '@/components/FormError';

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export function RoleGate({ children, allowedRole }: RoleGateProps) {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return <FormError message="You are not authorized to view this page" />;
  }

  return <>{children}</>;
}
