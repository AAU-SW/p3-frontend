import { useEffect, useState } from 'react';
import type { FC } from 'react';
import type { Asset } from '@/types/asset';
import { Badge } from '@/components/ui/badge.tsx';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
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
      <CardHeader className="gap-0">
        <CardTitle className="text-2xl flex justify-between">
          <div className="flex flex-row items-center gap-2">
            <span>Base data</span>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-gray-500 uppercase">
              Registration no.
            </span>
            <span className="font-medium">
              {data?.registrationNumber ?? 'Unknown'}
            </span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-gray-500 uppercase">
              ID
            </span>
            <span className="font-medium">{data?.id ?? 'Unknown'}</span>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Bottom Section (styled to match top) */}
        <div className="grid grid-cols-1 gap-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-gray-500 uppercase">
              Created
            </span>
            <span className="font-medium">{formatDate(data?.createdAt)}</span>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-gray-500 uppercase">
              Updated by
            </span>
            <span className="font-medium">
              {data?.updatedBy?.name ?? 'Unknown'}
            </span>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-gray-500 uppercase">
              Last updated
            </span>
            <span className="font-medium">{formatDate(data?.updatedAt)}</span>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-gray-500 uppercase">
              Last invoiced
            </span>
            <span className="font-medium">
              {data?.lastInvoiced ?? 'Unknown'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
