import type { FC } from 'react';
import { Button } from '@/components/ui/button.tsx';

interface DetailHeaderProps {
  title: string;
}

export const DetailHeader: FC<DetailHeaderProps> = ({ title }) => {
  return (
    <div className="flex items-center p-4 pb-0 justify-between gap-2">
      <h1 className="text-4xl font-medium">{title}</h1>
      <Button onClick={() => null /* TODO: Implement "Add case" handler*/}>
        Add case
      </Button>
    </div>
  );
};
