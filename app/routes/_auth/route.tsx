import { Outlet } from '@remix-run/react';

export default function auth() {
  return (
    <div className="flex h-full w-full select-none flex-col">
      <Outlet />
    </div>
  );
}
