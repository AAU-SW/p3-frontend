import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/orders/$id/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/orders/$id/"!</div>;
}
