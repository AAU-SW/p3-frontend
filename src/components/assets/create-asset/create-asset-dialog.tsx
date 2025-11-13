import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import type { CreateAsset } from '@/types/asset.ts';
import { createAsset } from '@/api/assets.ts';
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
import { toast } from 'sonner';

export const CreateAssetDialog: FC = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);
    const data: CreateAsset = {
      name: formData.get('name') as string,
      registrationNumber: formData.get('registrationNumber') as string,
      description: formData.get('description') as string,
      status: 'ACTIVE', // default on creation
    };

    // Get the image file if it exists
    const imageFile = formData.get('imageUpload') as File;

    try {
      await createAsset(data, imageFile);
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error(error)
      toast.error('Failed to create asset:');
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
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="registrationNumber">Registration number</Label>
              <Input
                id="registrationNumber"
                name="registrationNumber"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="imageUpload">Upload image</Label>
              <Input
                type="file"
                id="imageUpload"
                name="imageUpload"
                accept="image/*"
              />
            </div>
          </div>

          <DialogFooter className="sm:justify-start md:justify-between pt-2">
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
