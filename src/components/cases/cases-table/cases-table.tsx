import type { FC } from 'react';
import { DataTable } from '@/components/ui/data-table/data-table.tsx';
import type { Case } from '@/types/case';
import { useColumns } from '@/components/cases/cases-table/hooks/use-columns.tsx';

interface CasesTableProps {
  data: Case[];
}

export const CasesTable: FC<CasesTableProps> = ({ data }) => {
  const columns = useColumns();

  return (
    <DataTable
      columns={columns}
      data={data}
      withSearchBar={true}
      onRowClick={(row) => console.log(row.name)}
    />
  );
};
