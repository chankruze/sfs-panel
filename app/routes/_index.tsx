import { json, redirect, type LoaderFunction } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import { getUser } from '~/lib/session.server';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  if (!user) return redirect('/login');
  return json({ user });
};

export default function Index() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="grid min-h-screen place-content-center">
      <h1 className="text-3xl">{user.email}</h1>
      <Form method="post" action="/logout">
        <Button type="submit" variant="destructive">
          logout
        </Button>
      </Form>
    </div>
  );
}
