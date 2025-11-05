import { useNavigate } from '@tanstack/react-router';
import type { FC } from 'react';
import type { Case } from '@/types/case';
import { DataTable } from '@/components/ui/data-table/data-table.tsx';
import { useColumns } from '@/components/cases/cases-table/hooks/use-columns.tsx';

interface CasesTableProps {
  data: Case[];
}

export const CasesTable: FC<CasesTableProps> = ({ data }) => {
  const columns = useColumns();
  const navigate = useNavigate({ from: '/cases/$id' });

  return (
    <DataTable
      columns={columns}
      data={data}
      withSearchBar={true}
      onRowClick={(rowData) => navigate({ to: `/cases/${rowData.id}` })}
    />
  );
};
