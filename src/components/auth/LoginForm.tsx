'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { CardWrapper } from '@/components/auth/CardWrapper';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';
import { useLoginForm } from '@/hooks/useLoginForm';

export function LoginForm() {
  const {
    urlError,
    isPending,
    loaded,
    setLoaded,
    errorMessage,
    successMessage,
    form,
    onSubmit,
    showTwoFactor,
  } = useLoginForm();

  useEffect(() => {
    setLoaded(true);
  }, [setLoaded]);

  return (
    <>
      {loaded ? (
        <CardWrapper
          showSocialLogin
          backButtonHref="/auth/register"
          backButtonLabel="Don’t have an account?"
          headerLabel="Welcome back!"
        >
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                {showTwoFactor ? (
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Two Factor Code</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={isPending} placeholder="123456" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : null}
                {!showTwoFactor && (
                  <>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="john.doe@email.com"
                              type="email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="******"
                              type="password"
                            />
                          </FormControl>
                          <Button asChild className="px-0 font-normal" size="sm" variant="link">
                            <Link href="/auth/reset-password">Forgot password?</Link>
                          </Button>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>
              <FormError message={errorMessage || urlError} />
              <FormSuccess message={successMessage} />
              <Button className="w-full" disabled={isPending} type="submit">
                {showTwoFactor ? 'Confirm' : 'Login'}
              </Button>
            </form>
          </Form>
        </CardWrapper>
      ) : (
        <span>Loading...</span>
      )}
    </>
  );
}
