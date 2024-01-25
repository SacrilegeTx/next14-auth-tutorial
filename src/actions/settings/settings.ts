'use server';

import type * as z from 'zod';
import type { SettingsSchema } from '@/schemas';

import bcrypt from 'bcryptjs';

import prisma from '@/lib/prisma';
import { getUserByEmail, getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return {
      error: 'You are not authorized to access this resource',
    };
  }

  const existingUser = await getUserById(user.id!);

  if (!existingUser) {
    return {
      error: 'You are not authorized to access this resource',
    };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== existingUser.email) {
    const userWithEmailExisting = await getUserByEmail(values.email);

    if (userWithEmailExisting && userWithEmailExisting.id !== user.id) {
      return {
        error: 'Email already in use!',
      };
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return {
      success: 'Verification email sent to your new email address',
    };
  }

  if (values.password && values.newPassword && existingUser.password) {
    const passwordMatch = await bcrypt.compare(values.password, existingUser.password);

    if (!passwordMatch) {
      return {
        error: 'Current password is incorrect',
      };
    }

    if (values.password === values.newPassword) {
      return {
        error: 'New password cannot be the same as the old password',
      };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      ...values,
    },
  });

  return {
    success: 'Settings updated successfully',
  };
};
