import { useRef } from 'react';
import { UploadIcon } from 'lucide-react';
import { useParams } from '@tanstack/react-router';
import { toast } from 'sonner';
import type { FC } from 'react';
import type { Image } from '@/types/image.ts';
import { FileItem } from '@/components/file-upload/file-item.tsx';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { uploadCaseFile } from '@/api/cases.ts';

interface FileCardProps {
  image: Image;
}

export const FileCard: FC<FileCardProps> = ({ image }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const params = useParams({ from: '/cases/$id/' });
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      await uploadCaseFile(params.id, file);
    } catch (error) {
      toast.error('Upload failed');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row justify-between items-center">
          <span>Files</span>

          {/* Hidden file input */}
          <Input
            type="file"
            id="imageUpload"
            name="imageUpload"
            accept="image/*,application/pdf"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Visible upload icon button */}
          <Button
            size="icon"
            variant="outline"
            onClick={handleUploadClick}
            title="Upload file"
          >
            <UploadIcon className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <FileItem image={image} />
      </CardContent>
    </Card>
  );
};
