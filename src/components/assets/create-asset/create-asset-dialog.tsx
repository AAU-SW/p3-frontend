import { toast } from 'sonner';
import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import type { Asset, CreateAsset } from '@/types/asset.ts';
import type { Order } from '@/types/order';
import { createAsset } from '@/api/assets.ts';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { OrderSelector } from '@/components/order-selector';

interface CreateAssetDialogProps {
  onAssetCreation?: (newAsset: Asset) => void;
}

interface InputField {
  label: string;
  required: boolean;
  id: string;
  component: FC<any>;
  props?: Record<string, any>;
}

export const CreateAssetDialog: FC<CreateAssetDialogProps> = ({
  onAssetCreation,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order>();
  const [description, setDescription] = useState('');

  const inputFields: InputField[] = [
    {
      label: 'Name',
      required: true,
      id: 'name',
      component: Input,
    },
    {
      label: 'Registration number',
      required: true,
      id: 'registrationNumber',
      component: Input,
    },
    {
      label: 'Order',
      required: false,
      id: 'order',
      component: OrderSelector,
      props: {
        selectedOrder,
        onChange: (order: Order) => setSelectedOrder(order),
      },
    },
    {
      label: 'Description',
      required: false,
      id: 'description',
      component: Textarea,
      props: {
        value: description,
        onChange: (e: any) => setDescription(e.target.value),
      },
    },
    {
      label: 'Upload image',
      required: false,
      id: 'imageUpload',
      component: Input,
      props: {
        type: 'file',
        accept: 'image/*',
      },
    },
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);
    const data: CreateAsset = {
      name: formData.get('name') as string,
      registrationNumber: formData.get('registrationNumber') as string,
      description: description,
      orderRef: selectedOrder,
      status: 'ACTIVE',
    };

    const imageFile = formData.get('imageUpload') as File;

    try {
      const newAsset = await createAsset(data, imageFile);
      form.reset();
      if (onAssetCreation) onAssetCreation(newAsset);
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to create asset');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Asset</Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Asset</DialogTitle>
            <DialogDescription>
              To create an asset you must fill out the following form.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 pt-4">
            {inputFields.map(
              ({ label, required, id, component: Component, props }) => (
                <div key={id} className="grid gap-2">
                  <Label htmlFor={id}>
                    {label}{' '}
                    {required && <span className="text-red-500">*</span>}
                  </Label>
                  <Component id={id} name={id} required={required} {...props} />
                </div>
              ),
            )}
          </div>

          <DialogFooter className="sm:justify-start md:justify-between pt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Create Asset</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
