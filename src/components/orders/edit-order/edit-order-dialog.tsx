import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import type { FC, FormEvent } from 'react';
import type { Customer } from '@/types/customer';
import type { Order } from '@/types/order.ts';
import { updateOrder } from '@/api/order.ts';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CustomerSelector } from '@/components/customer-selector';

interface EditOrderDialogProps {
  orderId: string;
  initialData?: Order;
  onSave?: (saved: Order) => void;
}

export const EditOrderDialog: FC<EditOrderDialogProps> = ({
  orderId,
  initialData,
  onSave,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<
    Customer | undefined
  >(initialData?.connectedCustomer);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setSelectedCustomer(initialData?.connectedCustomer);
  }, [initialData?.connectedCustomer]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!orderId) {
      toast.error('Missing order id');
      return;
    }

    try {
      setSaving(true);
      const saved = await updateOrder(orderId, data);

      form.reset();
      setOpen(false);
      toast.success('Order edited');

      if (onSave) onSave(saved);
    } catch (err) {
      console.error(err);
      toast.error('Failed to edit order');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Order</Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Order</DialogTitle>
            <DialogDescription>
              Edit the order and click save.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 pt-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Title</Label>
              <Input
                id="name"
                name="name"
                defaultValue={initialData?.name}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="product">Product</Label>
              <Input
                id="product"
                name="product"
                defaultValue={initialData?.product}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                defaultValue={initialData?.notes ?? ''}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="orderNumber">OrderNumber</Label>
              <Input
                type="number"
                id="orderNumber"
                name="orderNumber"
                defaultValue={initialData?.orderNumber}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="attachment">Customer</Label>
              <CustomerSelector
                value={selectedCustomer}
                onChange={setSelectedCustomer}
              />
            </div>
          </div>

          <DialogFooter className="sm:justify-start md:justify-between pt-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
