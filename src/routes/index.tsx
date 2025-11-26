import { createFileRoute } from '@tanstack/react-router';
import { TaskDashboard } from '@/components/dashboard/task-item.tsx';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <>
      <TaskDashboard />
    </>
  );
}
