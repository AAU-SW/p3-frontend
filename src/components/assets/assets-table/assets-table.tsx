import { useNavigate } from '@tanstack/react-router';
import type { Asset } from '@/types/asset.ts';
import type { FC } from 'react';
import { useColumns } from '@/components/assets/assets-table/hooks/use-columns.tsx';
import { DataTable } from '@/components/ui/data-table/data-table.tsx';

interface AssetsTableProps {
  data: Array<Asset>;
}

export const AssetsTable: FC<AssetsTableProps> = ({ data }) => {
  const navigate = useNavigate({ from: '/assets' });
  const columns = useColumns();

  return (
    <DataTable
      columns={columns}
      data={data}
      withSearchBar={true}
      onRowClick={(rowData) => navigate({ to: `/assets/${rowData.id}` })}
    />
  );
};
