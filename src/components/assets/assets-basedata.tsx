import { useEffect, useState } from 'react';
import type { FC } from 'react';
import type { Asset } from '@/types/asset';
import { Badge } from '@/components/ui/badge.tsx';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { formatDate } from '@/utils/formatDate';
import { getImageUrlById } from '@/api/file.ts';

interface AssetsBaseDataProps {
  data: Asset | undefined;
}

export const AssetsBaseData: FC<AssetsBaseDataProps> = ({ data }) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const fetchUrl = async () => {
      const res = await getImageUrlById(
        data?.profilePicture?.id,
        data?.profilePicture?.fileExtension,
      );
      setUrl(res);
    };
    if (data?.profilePicture) {
      fetchUrl();
    }
  }, [data]);

  const statusColor =
    data?.status === 'ACTIVE'
      ? 'bg-green-100 text-green-800 border-green-300'
      : data?.status === 'CLOSED'
        ? 'bg-red-100 text-red-800 border-red-300'
        : 'bg-gray-100 text-gray-800 border-gray-300';
  return (
    <Card className="w-full max-w shadow-md border border-gray-200 pt-0">
      <div className="relative">
        <img
          src={url}
          className="object-cover aspect-square rounded-2xl"
          alt={data?.name}
        />
        <Badge className={`absolute top-4 right-4 ${statusColor}`}>
          {data?.status}
        </Badge>
      </div>

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
          {Boolean(data?.orderRef) && (
            <div className="col-span-1 flex flex-col">
              <span className="text-xs font-semibold text-gray-500 uppercase mb-2">
                Order
              </span>
              <span className="mb-4 font-medium">
                {data?.orderRef?.orderNumber ?? ''}
              </span>
            </div>
          )}
        </div>
        <Separator className="mt-2" />
        <div className="grid grid-cols-2 mt-2">
          <div className="col-span-1 flex flex-col">
            <span className="text-xs mt-4 font-semibold text-gray-500 uppercase mb-2">
              Created
            </span>
            <span className="mb-4 font-medium">
              {formatDate(data?.createdAt)}
            </span>

            <span className="text-xs font-semibold text-gray-500 uppercase mb-2">
              Created by
            </span>
            <span className="mb-4 font-medium">
              {data?.createdBy.name ?? 'Unknown'}
            </span>
          </div>
          <div className="col-span-1 flex flex-col">
            <span className="text-xs mt-4 font-semibold text-gray-500 uppercase mb-2">
              Last updated
            </span>
            <span className="mb-4 font-medium">
              {formatDate(data?.updatedAt)}
            </span>

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
