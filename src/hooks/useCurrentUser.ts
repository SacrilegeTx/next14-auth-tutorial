import { useSession } from 'next-auth/react';

export const useCurrentUser = () => {
  const { data: session, status } = useSession();
  const user = session?.user;

  return { user, status };
};
