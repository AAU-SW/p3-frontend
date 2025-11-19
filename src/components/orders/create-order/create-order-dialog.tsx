import { toast } from 'sonner';
import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import type { CreateOrder } from '@/types/order.ts';
import type { Customer } from '@/types/customer';
import { createOrder } from '@/api/order.ts';
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

export const CreateOrderDialog: FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);
    const data: CreateOrder = {
      name: formData.get('name') as string,
      product: formData.get('product') as string,
      notes: formData.get('notes') as string,
      status: 'PENDING',
      orderNumber: formData.get('orderNumber') as string,
      connectedCustomers: selectedCustomer,
    };

    try {
      await createOrder(data);
      form.reset();
      setOpen(false);
      toast.success('Order created successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to create order.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Order</Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Order</DialogTitle>
            <DialogDescription>
              Fill out the form to create a new order.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 pt-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Titel</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="product">Product</Label>
              <Input id="product" name="product" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" name="notes" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="orderNumber">OrderNumber</Label>
              <Input type="number" id="orderNumber" name="orderNumber" />
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
            <Button type="submit">Create Order</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
