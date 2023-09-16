import type { LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { SITE_TITLE } from '~/consts';
import { getUser } from '~/lib/session.server';
import { BottomNavList } from './bottom-nav-list';
import { NavList } from './nav-list';
import { UserProfile } from './user-profile';

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request);
  if (!user) return redirect('/login');
  return json({ user });
};

export default function PanelLayout() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="flex h-full w-full flex-col overflow-hidden sm:flex-row">
      {/* sidebar */}
      <aside className="hidden flex-col gap-6 bg-primary p-4 text-primary-foreground sm:flex lg:w-1/6">
        {/* brand */}
        <h1 className="py-6 text-center font-montserrat font-semibold uppercase text-yellow-400 lg:text-3xl">
          {SITE_TITLE}
        </h1>
        {/* nav links */}
        <nav className="flex-1">
          <NavList />
        </nav>
        {/* user details */}
        <UserProfile
          user={{
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          }}
        />
      </aside>
      {/* outlet */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
        {/* <div className="flex w-full h-full items-center justify-center">
          <div className="font-outfit text-6xl font-medium">
            <Outlet />
          </div>
        </div> */}
      </main>
      {/* mobile bottom navbar */}
      <nav className="bg-primary text-primary-foreground sm:hidden">
        <BottomNavList />
      </nav>
    </div>
  );
}
