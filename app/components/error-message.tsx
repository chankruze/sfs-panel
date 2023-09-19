import type { ReactNode } from 'react';

type ErrorMessageProps = {
  children: ReactNode;
};

export const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <div className="flex items-center text-sm text-red-500">{children}</div>
  );
};
