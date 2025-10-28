import type { FC } from 'react';
import { Badge } from '@/components/ui/badge.tsx';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import type { Asset } from '@/types/asset';
import {formatDate} from "@/utils/formatDate.ts";

interface AssetsBaseDataProps {
  data: Asset | undefined;
}

export const AssetsBaseData: FC<AssetsBaseDataProps> = ({ data }) => {
  const statusColor =
    data?.status === 'active'
      ? 'bg-green-100 text-green-800 border-green-300'
      : data?.status === 'closed'
        ? 'bg-red-100 text-red-800 border-red-300'
        : 'bg-gray-100 text-gray-800 border-gray-300';
  return (
    <Card className="w-full max-w shadow-md border border-gray-200 pt-0">
      <div className="relative">
        <img
          src=""
          className="object-cover aspect-square rounded-2xl"
          alt={data?.name}
        />
        <Badge className={`absolute top-4 right-4 ${statusColor}`}>
          {data?.status}
        </Badge>
      </div>
      <CardHeader className="gap-0">
        <CardTitle className="text-2xl flex justify-between">
          <div className="flex flex-row items-center gap-2">
            <span>Base data</span>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2">
          <div className="col-span-1 flex flex-col">
            <span className="text-xs font-semibold text-gray-500 uppercase mb-2">
              Registration number
            </span>
            <span className=" font-medium">
              {data?.registrationNumber ?? 'Unknown'}
            </span>
          </div>
          <div className="col-span-1 flex flex-col">
            <span className="text-xs font-semibold text-gray-500 uppercase mb-2">
              ID
            </span>
            <span className="mb-4 font-medium">{data?.id ?? 'Unknown'}</span>
          </div>
        </div>
        <Separator className="mt-2" />
        <div className="grid grid-cols-2 mt-2">
          <div className="col-span-1 flex flex-col">
            <span className="text-xs mt-4 font-semibold text-gray-500 uppercase mb-2">
              Created
            </span>
            <span className="mb-4 font-medium">{formatDate(data?.createdAt)}</span>

            <span className="text-xs font-semibold text-gray-500 uppercase mb-2">
              Updated by
            </span>
            <span className="mb-4 font-medium">
              {data?.updatedBy?.name ?? 'Unknown'}
            </span>
          </div>
          <div className="col-span-1 flex flex-col">
            <span className="text-xs mt-4 font-semibold text-gray-500 uppercase mb-2">
              Last updated
            </span>
            <span className="mb-4 font-medium">{formatDate(data?.updatedAt)}</span>

            <span className="text-xs font-semibold text-gray-500 uppercase mb-2">
              Last invoiced
            </span>
            <span className="mb-4 font-medium">
              {data?.lastInvoiced ?? 'Unknown'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
