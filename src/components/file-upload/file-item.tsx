import { DownloadIcon, FileIcon } from 'lucide-react';

import type { FC } from 'react';
import type { Image } from '@/types/image.ts';
import { Button } from '@/components/ui/button.tsx';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item.tsx';
import { getImageUrlById } from '@/api/file.ts';
import { toast } from 'sonner';

interface FileItemProps {
  image: Image;
}

export const FileItem: FC<FileItemProps> = ({ image }) => {
  const handleDownload = async () => {
    try {
      const fileUrl = await getImageUrlById(image.id, image.fileExtension);
      if (!fileUrl) return;

      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = `${image.id}.${image.fileExtension}`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Download failed');
    }
  };

  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <FileIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{image.id + image.fileExtension}</ItemTitle>
          <ItemDescription>{image.title}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline" onClick={handleDownload}>
            <DownloadIcon />
          </Button>
        </ItemActions>
      </Item>
    </div>
  );
};
