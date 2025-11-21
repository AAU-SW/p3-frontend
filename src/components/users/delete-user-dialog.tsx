import { toast } from 'sonner';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { deleteOneUser } from '@/api/user';

interface DeleteUserDialogProps {
  userId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleteSuccess: () => void;
}

export const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({
  userId,
  open,
  onOpenChange,
  onDeleteSuccess,
}) => {
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    try {
      await deleteOneUser(userId);
      toast.success('User deleted');

      // Callback til route
      onDeleteSuccess();

      // Luk dialogen
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete user');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Delete User</DialogTitle>

        <form onSubmit={handleDelete}>
          <p className="mb-4">
            Are you sure you want to delete this user?
          </p>

          <DialogFooter className="sm:justify-start md:justify-between pt-6">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              variant="destructive"
              disabled={!userId} // disable hvis ingen user er valgt
            >
              Delete User
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
