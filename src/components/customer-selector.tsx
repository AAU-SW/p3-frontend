import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { type FC, useEffect, useState } from 'react';
import { getCustomers } from '@/api/customer.ts';
import type { Customer } from '@/types/customer.ts';
import { toast } from 'sonner';

interface CustomerSelectorProps {
  value: Customer | undefined;
  onChange: (customer: Customer) => void;
}

export const CustomerSelector: FC<CustomerSelectorProps> = ({
  value,
  onChange,
}) => {
  const [customersData, setCustomersData] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchAllCustomers = async () => {
      try {
        const response = await getCustomers();
        setCustomersData(response);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch customers');
      }
    };

    fetchAllCustomers();
  }, []);

  const handleSelectChange = (selectedId: string) => {
    const selectedCustomer = customersData.find(
      (customer) => customer.id === selectedId,
    );
    if (selectedCustomer) {
      onChange(selectedCustomer);
    }
  };

  return (
    <Select value={value?.id || undefined} onValueChange={handleSelectChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a customer" />
      </SelectTrigger>
      <SelectContent>
        {customersData.map((customer) => (
          <SelectItem key={customer.id} value={customer.id}>
            {customer.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
