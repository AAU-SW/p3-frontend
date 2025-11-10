import type { FC } from 'react';
import type { Case } from '@/types/case';
import { DataTable } from '@/components/ui/data-table/data-table.tsx';
import { useColumns } from '@/components/cases/cases-detail-table/use-columns.tsx';

interface CasesTableProps {
  data: Case[];
}

export const CasesDetailTable: FC<CasesTableProps> = ({ data }) => {
  const columns = useColumns();

  return <DataTable columns={columns} data={data} withSearchBar={false} />;
};
