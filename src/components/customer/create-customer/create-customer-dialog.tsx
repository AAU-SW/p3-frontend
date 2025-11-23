import { useState } from 'react';
import { toast } from 'sonner';
import type { FC, FormEvent } from 'react';
import type { CreateCustomer } from '@/types/customer';
import type { Customer } from '@/types/customer';
import { createCustomer } from '@/api/customer.ts';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
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

interface CreateCustomerDialog {
  onCustomerCreation?: (newCustomer: Customer) => void;
}

export const CreateCustomerDialog: FC<CreateCustomerDialog> = ({
  onCustomerCreation,
}) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);
    const data: CreateCustomer = {
      name: formData.get('name') as string,
    };

    // Get the image file if it exists
    const imageFile = formData.get('imageUpload') as File;

    try {
      const newCustomer = await createCustomer(data, imageFile);
      form.reset();
      if (onCustomerCreation) onCustomerCreation(newCustomer);
      toast.success('Customer created successfully');
      setOpen(false);
    } catch (error) {
      toast.error('Failed to create Customer');
      console.error('Failed to create Customer:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Customer</Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Customer</DialogTitle>
            <DialogDescription>
              To create an Customer you must fill out the following form.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 pt-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required />
            </div>
            {/*  <div className="grid gap-3">
              <Label htmlFor="imageUpload">Upload Logo</Label>
              <Input
                type="file"
                id="imageUpload"
                name="imageUpload"
                accept="image/*"
              />
            </div> */}
          </div>

          <DialogFooter className="sm:justify-start md:justify-between pt-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Create Customer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
