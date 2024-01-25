'use client';

import { logout } from '@/actions/auth/logout';

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export function LogoutButton({ children }: LogoutButtonProps) {
  const handleLogout = () => {
    logout();
  };

  return (
    <span className="cursor-pointer" onClick={handleLogout}>
      {children}
    </span>
  );
}
