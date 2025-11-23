import { useState } from 'react';
import { toast } from 'sonner';
import { deleteOrderById } from '@/api/order.ts';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DeleteOrderDialogProps {
  orderId: string;
  onDeleteSuccess: () => void;
}

export const DeleteOrderDialog: React.FC<DeleteOrderDialogProps> = ({
  orderId,
  onDeleteSuccess,
}) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await deleteOrderById(orderId);
      onDeleteSuccess();
      setOpen(false);
    } catch {
      toast.error('Failed to delete order');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Order</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Delete Order</DialogTitle>
        <form onSubmit={handleDelete}>
          <p>Are you sure you want to delete this order?</p>
          <DialogFooter className="sm:justify-start md:justify-between pt-6">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" variant="destructive">
              Delete Order
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
