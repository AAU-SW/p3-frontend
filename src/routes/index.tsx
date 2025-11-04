import { createFileRoute } from '@tanstack/react-router';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import Header from '@/components/header.tsx';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <>
      <Header />
      <div>
        <Button onClick={() => toast.success('Welcome to the')}>
          Home Page
        </Button>
      </div>
    </>
  );
}
