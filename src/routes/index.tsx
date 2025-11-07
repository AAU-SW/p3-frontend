import { createFileRoute } from '@tanstack/react-router';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <>
      <div>
        <Button onClick={() => toast.success('Welcome to the')}>
          Home Page
        </Button>
      </div>
    </>
  );
}
