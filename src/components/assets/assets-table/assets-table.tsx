import { useNavigate } from '@tanstack/react-router';
import type { FC } from 'react';
import type { Asset } from '@/types/asset.ts';
import { DataTable } from '@/components/ui/data-table/data-table.tsx';
import { useColumns } from '@/components/assets/assets-table/hooks/use-columns.tsx';

interface AssetsTableProps {
  data: Asset[];
  isLoading: boolean;
}

export const AssetsTable: FC<AssetsTableProps> = ({ data, isLoading }) => {
  const navigate = useNavigate({ from: '/assets' });
  const columns = useColumns();

  return (
    <DataTable
      columns={columns}
      data={data}
      withSearchBar={true}
      onRowClick={(rowData) => navigate({ to: `/assets/${rowData.id}` })}
      isLoading={isLoading}
    />
  );
};
