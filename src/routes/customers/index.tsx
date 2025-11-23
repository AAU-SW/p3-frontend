import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import type { Customer } from '@/types/customer.ts';
import { getCustomers } from '@/api/customer';
import { CustomersTable } from '@/components/customer/customer-table/customer-table';
import { CreateCustomerDialog } from '@/components/customer/create-customer/create-customer-dialog';

export const Route = createFileRoute('/customers/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCustomerCreation = (newCustomer: Customer) => {
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const response = await getCustomers();
        setCustomers(response);
      } catch (error) {
        console.error('Failed to fetch customers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <>
      <div className="w-full p-4 container mx-auto">
        <div className="flex flex-row justify-between items-center mb-4">
          <h1 className="text-4xl"> Customers </h1>
          <CreateCustomerDialog onCustomerCreation={handleCustomerCreation} />
        </div>
        <CustomersTable data={customers} isLoading={loading} />
      </div>
    </>
  );
}
