import { CreateCasesDialog } from '@/components/cases/create-cases/create-cases-dialog.tsx';
import type { FC } from 'react';

interface DetailHeaderProps {
  title: string;
}

export const DetailHeader: FC<DetailHeaderProps> = ({ title }) => {
  return (
    <div className="flex items-center p-4 pb-0 justify-between gap-2">
      <h1 className="text-4xl font-medium">{title}</h1>
      <CreateCasesDialog />
    </div>
  );
};
