import type { FC } from 'react';
import { useColumns } from '@/components/assets/cases-table/hooks/use-columns.tsx';
import { DataTable } from '@/components/ui/data-table/data-table.tsx';
import type { Case } from '@/types/case';

interface CasesTableProps {
  data: Case[];
}

export const CasesTable: FC<CasesTableProps> = ({ data }) => {
  const columns = useColumns();

  return <DataTable columns={columns} data={data} withSearchBar={true} />;
};
