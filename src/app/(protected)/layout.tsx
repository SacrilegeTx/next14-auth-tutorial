import { cn } from '@/lib/utils';
import { onest } from '@/config/font';

import { Navbar } from './_components/Navbar';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <div
      className={cn(
        'flex h-full w-full flex-col items-center justify-center gap-y-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800',
        onest.className,
      )}
    >
      <Navbar />
      {children}
    </div>
  );
}
