import { createFileRoute } from '@tanstack/react-router';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { CreateUserDialog } from '@/components/users/create-user/create-user-dialog';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <>
      <div>
        <CreateUserDialog />
        <Button onClick={() => toast.success('Welcome to the')}>
          Home Page
        </Button>
      </div>
    </>
  );
}
