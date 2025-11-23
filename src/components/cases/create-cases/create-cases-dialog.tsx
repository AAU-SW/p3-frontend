import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import type { FC, FormEvent } from 'react';
import type { CreateCase } from '@/types/case.ts';
import type { Asset } from '@/types/asset.ts';
import type { User } from '@/types/user.ts';
import { createCase } from '@/api/cases.ts';
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
import { Route } from '@/routes/assets/$id';
import { getOneAsset } from '@/api/assets.ts';
import { EmployeeSelector } from '@/components/employee-selector.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';

interface CreateCasesDialogProps {
  onCreated: () => void;
}
export const CreateCasesDialog = ({ onCreated }: CreateCasesDialogProps) => {
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<User>();

  const assetId = Route.useParams();

  const [assetData, setAssetData] = useState<Asset>();

  useEffect(() => {
    const fetchOneAsset = async () => {
      try {
        const response = await getOneAsset(String(assetId.id));
        setAssetData(response);
      } catch {
        toast.error('Failed to fetch asset');
      }
    };

    fetchOneAsset();
  }, [assetId]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!assetData) {
      console.error('Asset data not loaded yet');
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data: CreateCase = {
      title: formData.get('name') as string,
      status: 'ACTIVE',
      assetId: assetData,
      assignedTo: selectedEmployee,
      description: formData.get('description') as string,
      location: formData.get('location') as string,
    };

    try {
      await createCase(data);

      setSelectedEmployee(undefined);
      setOpen(false);
      
      toast.success('Case created successfully');
      onCreated();
    } catch (error) {
      console.error(error);

    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Cases</Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Cases</DialogTitle>
            <DialogDescription>
              To create a case you must fill out the following form.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 pt-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Task description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Write a description of the task..."
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="Write a location for the task..."
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="employee">Employee</Label>
              <EmployeeSelector
                value={selectedEmployee}
                onChange={setSelectedEmployee}
              />
            </div>
          </div>

          <DialogFooter className="sm:justify-start md:justify-between pt-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Create Case</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
