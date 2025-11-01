import { createFileRoute } from '@tanstack/react-router';
import Header from '@/components/header.tsx';

export const Route = createFileRoute('/calendar/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header />
      <div>Hello "/calendar/"!</div>
    </>
  );
}
