import { useNavigate } from '@tanstack/react-router';
import type { FC } from 'react';
import type { Case } from '@/types/case';
import { DataTable } from '@/components/ui/data-table/data-table.tsx';
import { useColumns } from '@/components/cases/cases-table/hooks/use-columns.tsx';

interface CasesTableProps {
  data: Case[];
  isLoading: boolean;
  showAsset?: boolean;
}

export const CasesTable: FC<CasesTableProps> = ({ data, isLoading, showAsset = false }) => {
  const columns = useColumns(showAsset);
  const navigate = useNavigate({ from: '/cases/$id' });

  return (
    <DataTable
      columns={columns}
      data={data}
      withSearchBar={true}
      onRowClick={(rowData) => navigate({ to: `/cases/${rowData.id}` })}
      isLoading={isLoading}
    />
  );
};
