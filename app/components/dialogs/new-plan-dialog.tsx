import { useFetcher } from '@remix-run/react';
import { useEffect, useState } from 'react';
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

type IssueType = {
  formErrors: string[];
  fieldErrors: {
    [key: string]: string[];
  };
};

export const NewPlanDialog = () => {
  const { isOpen, onClose, type } = useDialog();
  const fetcher = useFetcher();
  const [issues, setIssues] = useState<IssueType | null>(null);

  const isDialogOpen = isOpen && type === 'createPlan';

  useEffect(() => {
    if (fetcher.data) {
      if ('error' in fetcher.data) {
        setIssues(fetcher.data.error);
      } else {
        setIssues(null);
      }

      if ('ok' in fetcher.data) onClose();
    }
  }, [fetcher.data]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Plan</DialogTitle>
          <DialogDescription>
            Enter the details required for creating a new plan.
          </DialogDescription>
        </DialogHeader>
        {/* <div>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div> */}
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
            {issues?.fieldErrors.name ? (
              <ErrorMessage>{issues.fieldErrors.name[0]}</ErrorMessage>
            ) : null}
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
            {issues?.fieldErrors.speed ? (
              <ErrorMessage>{issues.fieldErrors.speed[0]}</ErrorMessage>
            ) : null}
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
            {issues?.fieldErrors.price ? (
              <ErrorMessage>{issues.fieldErrors.price[0]}</ErrorMessage>
            ) : null}
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
