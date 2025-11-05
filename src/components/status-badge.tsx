import type { Asset } from '@/types/asset';
import type { Case } from '@/types/case';
import type { FC } from 'react';

type StatusBadgeProps = {
  status: Asset['status'] | Case['status'];
};

export const StatusBadge: FC<StatusBadgeProps> = ({ status }) => {
  const statusColor =
    status === 'ACTIVE'
      ? 'bg-green-100 text-green-800 border-green-300'
      : 'bg-red-100 text-red-800 border-red-300';
  return (
    <span
      className={`px-2 py-1 rounded-md text-sm font-medium border ${statusColor}`}
    >
      {status}
    </span>
  );
};
