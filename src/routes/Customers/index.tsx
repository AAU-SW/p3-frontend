import { createFileRoute } from '@tanstack/react-router';
import type { Customer } from '@/types/customer.ts';
import { CustomersTable } from '@/components/customers/customers-table.tsx';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/Customers/')({
  component: RouteComponent,
});

function RouteComponent() {
  const data: Customer[] = [
    {
      name: 'Jonas',
      id: '1',
    },
    {
      name: 'Ryan',
      id: '2',
    },
  ];

  return (
    <>
      <div className="w-full p-4 container mx-auto">
        <div className="flex flex-row justify-between items-center mb-4">
          <h1 className="text-4xl"> Customers </h1>
          <Button variant="outline">Add Customer</Button>
        </div>
        <CustomersTable data={data} />
      </div>
    </>
  );
}
