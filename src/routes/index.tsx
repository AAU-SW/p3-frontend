import { createFileRoute, useRouter } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/stores/auth';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  const auth = useAuth();
  const router = useRouter();

  return (
    <>
      <div>
        <Button
          onClick={() => {
            auth.logout();
            router.navigate({ to: '/login' });
          }}
        >
          Logout
        </Button>
      </div>
    </>
  );
}
