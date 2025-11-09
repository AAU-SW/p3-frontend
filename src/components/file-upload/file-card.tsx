import { type FC } from 'react';
import type { Image } from '@/types/image.ts';
import { FileItem } from '@/components/file-upload/file-item.tsx';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card.tsx';

interface FileCardProps {
  image: Image;
}

export const FileCard: FC<FileCardProps> = ({ image }) => {
  return (
    <Card>
        <CardHeader>
            <CardTitle>
                Files
            </CardTitle>
        </CardHeader>
      <CardContent>
        <FileItem image={image} />
      </CardContent>
    </Card>
  );
};
