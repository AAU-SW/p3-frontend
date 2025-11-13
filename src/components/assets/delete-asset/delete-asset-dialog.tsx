import { useState } from 'react';
import { toast } from 'sonner';
import { deleteAssetById } from '@/api/assets.ts';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';


interface DeleteAssetDialogProps {
  assetId: string;
  onDeleteSuccess: () => void;
}

export const DeleteAssetDialog: React.FC<DeleteAssetDialogProps> = ({
  assetId,
  onDeleteSuccess,
}) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await deleteAssetById(assetId);
      onDeleteSuccess();
      setOpen(false);
    } catch {
      toast.error('Failed to delete asset');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Asset</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Delete Asset</DialogTitle>
        <form onSubmit={handleDelete}>
          <p>Are you sure you want to delete this asset?</p>
          <DialogFooter className="sm:justify-start md:justify-between pt-6">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" variant="destructive">
              Delete Asset
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
