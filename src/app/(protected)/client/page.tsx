'use client';
import { UserInfo } from '@/components/UserInfo';
import { useCurrentUser } from '@/hooks/useCurrentUser';

function ClientPage() {
  const { user } = useCurrentUser();

  return <UserInfo label="👻Client Component" user={user} />;
}

export default ClientPage;
