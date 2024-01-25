'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Header } from '@/components/auth/Header';
import { Social } from '@/components/auth/Social';
import { BackButton } from '@/components/auth/BackButton';

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocialLogin?: boolean;
}

export function CardWrapper({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocialLogin,
}: CardWrapperProps) {
  return (
    <Card className="w-[400] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocialLogin ? (
        <CardFooter>
          <Social />
        </CardFooter>
      ) : null}
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
}
