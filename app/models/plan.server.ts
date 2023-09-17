import type { Plan } from '@prisma/client';
import type { Result } from 'ts-results';
import { Err, Ok } from 'ts-results';
import { prisma } from '~/lib/prisma.server';

export type CreatePlanProps = {
  name: Plan['name'];
  price: Plan['price'];
  speed: Plan['speed'];
  description: Plan['description'];
  isSpecial: Plan['isSpecial'];
};

export async function createPlan({
  name,
  price,
  speed,
  description,
  isSpecial,
}: CreatePlanProps): Promise<Result<Plan, Error>> {
  const newPlan = await prisma.plan.create({
    data: {
      name,
      price,
      speed,
      description,
      isSpecial,
    },
  });

  if (newPlan) return Ok(newPlan);

  return Err(new Error('Unable to create new plan'));
}

export async function getPlans(): Promise<Result<Plan[], Error>> {
  const allPlans = await prisma.plan.findMany();

  if (allPlans) return Ok(allPlans);

  return Err(new Error('Unable to fetch all plans'));
}
