import type { ActionArgs, LoaderArgs, V2_MetaFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { z } from 'zod';
import { FormField } from '~/components/form-field';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';
import { SITE_TITLE } from '~/consts';
import { createUserSession, getUser } from '~/lib/session.server';
import { safeRedirect } from '~/utils';
import { formToJSON } from '~/utils/form.server';
import { verifyLogin } from '~/utils/login.server';

export const meta: V2_MetaFunction = () => {
  return [
    { title: `Login / ${SITE_TITLE}` },
    {
      property: 'og:title',
      content: `Login / ${SITE_TITLE}`,
    },
    {
      name: 'description',
      content: `Authentication is required to access ${SITE_TITLE}`,
    },
  ];
};

const loginSchema = z.object({
  email: z.string().nonempty('Email is required!').email(),
  password: z.string().nonempty('Password is required!'),
});

export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request);
  if (user) return redirect('/');
  return null;
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const redirectTo = safeRedirect(formData.get('redirectTo'), '/');

  const _validation = loginSchema.safeParse(formToJSON(formData));

  // if validation success
  if (_validation.success) {
    const { email, password } = _validation.data;
    const remember = formData.get('remember');
    // check if user already exists and if password matches
    const _existingUser = await verifyLogin(email, password);

    if (_existingUser.ok) {
      return await createUserSession({
        request,
        userId: _existingUser.val.id,
        remember: remember === 'on' ? true : false,
        redirectTo,
      });
    }

    return json({ error: _existingUser.val.message }, { status: 401 });
  }

  return json({ errors: _validation.error.format() }, { status: 400 });
}

export default function Login() {
  const actionData = useActionData();
  const { state } = useNavigation();

  const busy = state === 'submitting';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex flex-1 flex-col items-center gap-12 p-[5vw]">
      <div className="flex flex-col items-center justify-center gap-4">
        <img
          src="/favicon.ico"
          alt="SFS Panel logo"
          loading="lazy"
          className="h-12 w-12"
        />
        <h1 className="text-2xl font-bold sm:text-4xl">Welcome back</h1>
      </div>
      <Form method="post" className="mx-auto w-full space-y-6 sm:w-[400px]">
        {/* form error message */}
        {actionData?.error ? (
          <p className="rounded-xl bg-red-300/20 p-4 text-center font-mono text-red-500">
            {actionData?.error}
          </p>
        ) : null}
        {/* email */}
        <FormField
          label="email"
          id="email"
          name="email"
          type="email"
          onChange={handleInputChange}
          value={formData.email}
          error={actionData?.errors?.email?._errors[0]}
        />
        {/* password */}
        <FormField
          label="password"
          id="password"
          name="password"
          type="password"
          onChange={handleInputChange}
          value={formData.password}
          error={actionData?.errors?.password?._errors[0]}
        />
        {/* remember me */}
        <div className="flex items-center space-x-2">
          <Checkbox name="remember" id="remember" />
          <Label htmlFor="remember">Remember me for 7 days</Label>
        </div>
        {/* submit button */}
        <Button disabled={busy} type="submit" className="w-full">
          {busy ? 'Verifying...' : 'Login'}
        </Button>
      </Form>
    </div>
  );
}
