import { useFetcher } from '@remix-run/react';
import { useEffect } from 'react';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { useDialog } from '~/hooks/use-dialog-store';
import { ErrorMessage } from '../error-message';
import { Checkbox } from '../ui/checkbox';
import { Textarea } from '../ui/textarea';

export const NewPlanDialog = () => {
  const { isOpen, onClose, type } = useDialog();
  const fetcher = useFetcher();

  const isDialogOpen = isOpen && type === 'createPlan';

  useEffect(() => {
    if (fetcher.data) {
      if ('ok' in fetcher.data) onClose();
    }
  }, [fetcher.data, onClose]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Plan</DialogTitle>
          <DialogDescription>
            Enter the details required for creating a new plan.
          </DialogDescription>
        </DialogHeader>
        <fetcher.Form
          className="grid gap-4 py-4"
          method="post"
          action="/plans/create"
        >
          <div className="space-y-1">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="HOME 499"
              className="col-span-3"
            />

            <ErrorMessage>
              {fetcher.data?.errors?.name?._errors[0]}
            </ErrorMessage>
          </div>
          <div className="space-y-1">
            <Label htmlFor="speed" className="text-right">
              Speed
            </Label>
            <Input
              type="number"
              id="speed"
              name="speed"
              placeholder="40 mbps"
              className="col-span-3"
            />
            <ErrorMessage>
              {fetcher.data?.errors?.speed?._errors[0]}
            </ErrorMessage>
          </div>
          <div className="space-y-1">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              type="number"
              id="price"
              name="price"
              placeholder="499"
              className="col-span-3"
            />
            <ErrorMessage>
              {fetcher.data?.errors?.price._errors[0]}
            </ErrorMessage>
          </div>
          <div className="space-y-1">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              className="col-span-3"
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="is-special" name="is-special" />
            <Label htmlFor="is-special" className="text-right">
              This is a special plan
            </Label>
          </div>
          <DialogFooter>
            <Button type="submit" name="__action" value="create">
              Save
            </Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
};
