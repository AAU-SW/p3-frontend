import { useNavigate } from '@tanstack/react-router';
import type { FC } from 'react';
import type { Customer } from '@/types/customer';
import { DataTable } from '@/components/ui/data-table/data-table.tsx';
import { useColumns } from '@/components/customer/customer-table/hooks/use-columns';

interface CustomerTableProps {
  data: Customer[];
  isLoading: boolean;
}

export const CustomersTable: FC<CustomerTableProps> = ({ data, isLoading }) => {
  const navigate = useNavigate({ from: '/customers' });
  const columns = useColumns();

  return (
    <DataTable
      columns={columns}
      data={data}
      withSearchBar={true}
      onRowClick={(rowData) => navigate({ to: `/customers/${rowData.id}` })}
      isLoading={isLoading}
    />
  );
};
