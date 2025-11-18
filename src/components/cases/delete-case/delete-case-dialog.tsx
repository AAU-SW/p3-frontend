import { useState } from 'react';
import { toast } from 'sonner';
import { deleteOneCase } from '@/api/cases.ts';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DeleteCaseDialogProps {
  caseId: string;
  onDeleteSuccess: () => void;
}

export const DeleteCaseDialog: React.FC<DeleteCaseDialogProps> = ({
  caseId,
  onDeleteSuccess,
}) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await deleteOneCase(caseId);
      onDeleteSuccess();
      setOpen(false);
    } catch {
      toast.error('Failed to delete case');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Case</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Delete Case</DialogTitle>
        <form onSubmit={handleDelete}>
          <p>Are you sure you want to delete this case?</p>
          <DialogFooter className="sm:justify-start md:justify-between pt-6">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" variant="destructive">
              Delete Case
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};