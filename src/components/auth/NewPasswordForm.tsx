'use client';

import { useEffect } from 'react';

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
import { useNewPasswordForm } from '@/hooks/useNewPasswordForm';

export function NewPasswordForm() {
  const { isPending, loaded, setLoaded, errorMessage, successMessage, form, onSubmit } =
    useNewPasswordForm();

  useEffect(() => {
    setLoaded(true);
  }, [setLoaded]);

  return (
    <>
      {loaded ? (
        <CardWrapper
          backButtonHref="/auth/login"
          backButtonLabel="Back to login"
          headerLabel="Enter a new password"
        >
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={errorMessage} />
              <FormSuccess message={successMessage} />
              <Button className="w-full" disabled={isPending} type="submit">
                Reset password
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
