import { DownloadIcon, FileIcon } from 'lucide-react';

import { toast } from 'sonner';
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

interface FileItemProps {
  image: Image[];
}

export const FileItem: FC<FileItemProps> = ({ image }) => {
  const handleDownload = async (id: string, ext: string) => {
    try {
      const fileUrl = await getImageUrlById(id, ext);
      if (!fileUrl) return;

      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = `${id}.${ext}`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Download failed');
    }
  };

  if (image.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No files uploaded yet.</p>
    );
  }

  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      {image.map((img) => (
        <Item key={img.id} variant="outline">
          <ItemMedia variant="icon">
            <FileIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{img.fileTitle}</ItemTitle>
            <ItemDescription>{`${img.id}.${img.fileExtension}`}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleDownload(img.id, img.fileExtension)}
            >
              <DownloadIcon />
            </Button>
          </ItemActions>
        </Item>
      ))}
    </div>
  );
};
