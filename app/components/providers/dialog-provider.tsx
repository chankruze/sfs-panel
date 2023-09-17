import { useEffect, useState } from 'react';
import { NewPlanDialog } from '~/components/dialogs/new-plan-dialog';

export const DialogProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <NewPlanDialog />
    </>
  );
};
