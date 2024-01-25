'use client';

import { UserRole } from '@prisma/client';
import { toast } from 'sonner';

import { FormSuccess } from '@/components/FormSuccess';
import { RoleGate } from '@/components/auth/RoleGate';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { admin } from '@/actions/admin/admin';

function AdminPage() {
  const onApiRouteClick = () => {
    fetch('/api/admin').then((res) => {
      if (res.ok) {
        toast.success('API Route success');
      } else {
        toast.error('API Route failed');
      }
    });
  };

  const onServerActionClick = () => {
    admin().then((res) => {
      if (res.success) {
        toast.success(res.success);
      }
      if (res.error) {
        toast.error(res.error);
      }
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-center text-2xl font-semibold">🔑Admin Page</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are authorized to view this page" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API Route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default AdminPage;
