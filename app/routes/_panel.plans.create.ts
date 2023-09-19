import { json, type ActionArgs } from '@remix-run/node';
import { z } from 'zod';
import { getUser } from '~/lib/session.server';
import { createPlan } from '~/models/plan.server';
import { formToJSON } from '~/utils/form.server';

export const newPlanSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'name must contain at least 1 character' }),
    speed: z.string().min(1, { message: 'speed must be a positive number' }),
    price: z.string().min(1, { message: 'price must be a positive number' }),
    description: z.string(),
  })
  .required({
    name: true,
    speed: true,
    price: true,
  });

export async function action({ request }: ActionArgs) {
  const user = await getUser(request);

  if (!user)
    return new Response(
      'Identity verfication is required. Please login and try again.',
      {
        status: 401,
      }
    );

  if (user.role !== 'ADMIN')
    return new Response(
      'You have not enough priviledge to perform this action.',
      {
        status: 403,
      }
    );

  const formData = await request.formData();
  const data = formToJSON(formData);
  const isSpecial = formData.get('is-special') === 'on' ? true : false;

  const _validation = newPlanSchema.safeParse(data);

  if (_validation.success) {
    const data = _validation.data;

    const _create = await createPlan({
      ...data,
      price: Number(data.price),
      speed: Number(data.speed),
      isSpecial,
    });

    if (_create.ok) {
      return json({
        ok: true,
      });
    }

    return json({
      error: _create.val,
    });
  }

  return json({
    error: _validation.error.flatten(),
  });
}
