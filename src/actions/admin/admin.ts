'use server';

import { UserRole } from '@prisma/client';

import { currentRole } from '@/lib/auth';

export const admin = async () => {
  const role = await currentRole();

  if (role !== UserRole.ADMIN) {
    return {
      error: 'You are not authorized to access this resource',
    };
  }

  return {
    success: 'You are authorized to access this resource',
  };
};
