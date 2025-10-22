import { useColumns } from '@/components/assets/assets-table/hooks/use-columns.tsx';
import { DataTable } from '@/components/ui/data-table/data-table.tsx';
import type { FC } from 'react';
import type { Asset } from '@/types/asset.ts';

interface AssetsTableProps {
  data: Asset[];
}

export const AssetsTable: FC<AssetsTableProps> = ({ data }) => {
  const columns = useColumns();

  return <DataTable columns={columns} data={data} withSearchBar={true} />;
};
