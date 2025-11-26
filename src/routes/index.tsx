import { createFileRoute } from '@tanstack/react-router';
import {TaskItem} from "@/components/dashboard/task-item.tsx";

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
      <div>
          <TaskItem/>
      </div>
  );
}
