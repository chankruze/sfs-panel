import { json, type ActionArgs } from '@remix-run/node';
import { getUser } from '~/lib/session.server';
import type { CreatePlanProps } from '~/models/plan.server';
import { createPlan } from '~/models/plan.server';
import { formToJSON } from '~/utils/form.server';

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

  const isSpecial = formData.get('is-special') === 'on' ? true : false;

  const data = formToJSON(formData) as CreatePlanProps;

  const _plans = await createPlan({
    ...data,
    price: Number(data.price),
    speed: Number(data.speed),
    isSpecial,
  });

  if (_plans.ok) {
    return json({
      plans: _plans.val,
    });
  }

  return json({
    error: _plans.val,
  });
}
