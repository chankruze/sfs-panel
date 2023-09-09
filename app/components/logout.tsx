import { Form } from '@remix-run/react';
import type { ReactNode } from 'react';

type LogoutProps = {
  children: ReactNode;
};

export const Logout = ({ children }: LogoutProps) => {
  return (
    <Form method="post" action="/logout">
      {children}
    </Form>
  );
};
