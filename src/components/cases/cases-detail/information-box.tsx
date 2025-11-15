import { InfoIcon } from 'lucide-react';
import type { FC } from 'react';
import type { Case } from '@/types/case.ts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/utils/formatDate.ts';
import { StatusBadge } from '@/components/status-badge.tsx';

interface InformationBoxProps {
  data: Case;
}

export const InformationBox: FC<InformationBoxProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row items-center gap-2 leading-0">
          <InfoIcon />
          Basic Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <div>
              <p className="font-bold flex flex-row pb-1">Customer</p>
              <p className="pb-2">{data.connectedCustomer?.name}</p>
            </div>
            <div>
              <p className="font-bold pb-1">Created By</p>
              <p>{data.createdBy.name}</p>
            </div>
          </div>
          <div className="col-span-1">
            <div>
              <p className="font-bold pb-1">Status</p>
              <p className="pb-2">{<StatusBadge status={data.status} />}</p>
            </div>
            <div>
              <p className="font-bold pb-1">Created At</p>
              <p>{formatDate(data.createdAt)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
