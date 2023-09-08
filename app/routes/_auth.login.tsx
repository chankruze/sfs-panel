import type {
  ActionFunction,
  LoaderFunction,
  V2_MetaFunction,
} from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import * as Yup from 'yup';
import { FormField } from '~/components/form-field';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';
import { SITE_TITLE } from '~/consts';
import { createUserSession, getUser } from '~/lib/session.server';
import { safeRedirect } from '~/utils';
import { validateForm } from '~/utils/form.server';
import { verifyLogin } from '~/utils/login.server';

export const meta: V2_MetaFunction = () => {
  return [
    { title: `Login / ${SITE_TITLE}` },
    {
      property: 'og:title',
      content: `Login / ${SITE_TITLE}`,
    },
  ];
};

const schema = Yup.object({
  email: Yup.string().email('Not a valid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  if (user) return redirect('/');
  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const redirectTo = safeRedirect(formData.get('redirectTo'), '/');
  const remember = formData.get('remember');

  try {
    // validate form
    const { email, password } = await validateForm(formData, schema);
    // if not valid error is thrown
    // if all valid, trigger registration function
    // if it's a success, redirect the user to the redirectTo

    // check if user already exists and if password matches
    const user = await verifyLogin(email, password);
    // if verification fails, error is thrown
    // if verification is successful, create a new session
    return createUserSession({
      request,
      userId: user.id,
      remember: remember === 'on' ? true : false,
      redirectTo,
    });
  } catch (errors) {
    // return error to render in the components
    return json({ errors }, { status: 400 });
  }
};

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
        {typeof actionData?.errors === 'string' ? (
          <p className="bg-red-900/50 p-4 text-center font-mono text-red-300">
            {actionData?.errors}
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
          error={actionData?.errors?.['email']}
        />
        {/* password */}
        <FormField
          label="password"
          id="password"
          name="password"
          type="password"
          onChange={handleInputChange}
          value={formData.password}
          error={actionData?.errors?.['password']}
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
