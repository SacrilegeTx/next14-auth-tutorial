import { LoginButton } from '@/components/auth/LoginButton';
import { Button } from '@/components/ui/button';
import { onest } from '@/config/font';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1 className={cn('text-6xl font-semibold text-white drop-shadow-sm', onest.className)}>
          🔐 Auth
        </h1>
        <p className="text-lg font-semibold text-white drop-shadow-sm">
          A simple Next.js app with authentication service
        </p>
        <div>
          <LoginButton asChild>
            <Button size="lg" variant="secondary">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
