import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <div>
      <Button onClick={() => toast.success('Welcome to the')}>Home Page</Button>
    </div>
  );
}
