import { Outlet } from '@remix-run/react';

export default function auth() {
  return (
    <div className="flex h-screen w-full select-none flex-col overflow-hidden">
      <Outlet />
    </div>
  );
}
