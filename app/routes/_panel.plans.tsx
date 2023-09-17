import type { Plan } from '@prisma/client';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import { ScrollArea } from '~/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { useDialog } from '~/hooks/use-dialog-store';
import { getPlans } from '~/models/plan.server';

export async function loader() {
  const _plans = await getPlans();

  if (_plans.ok) {
    return json({
      plans: _plans.val,
    });
  }

  return json({
    error: _plans.val,
  });
}

export default function Plans() {
  const { onOpen } = useDialog();
  const { plans } = useLoaderData();

  return (
    <div className="flex h-full w-full flex-col">
      <header className="flex items-center justify-end border-b p-2">
        <Button onClick={() => onOpen('createPlan', {})}>New Plan</Button>
      </header>
      <ScrollArea>
        <Table>
          {/* <TableCaption>A list of all plans.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Speed</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Special</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((plan: Plan) => (
              <TableRow key={plan.id}>
                <TableCell className="font-medium">{plan.name}</TableCell>
                <TableCell>{plan.speed} mbps</TableCell>
                <TableCell>{plan.price} INR</TableCell>
                <TableCell>{plan.isSpecial ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
