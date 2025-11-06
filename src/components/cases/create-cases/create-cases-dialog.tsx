import type { FC, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import type { CreateCase } from '@/types/case.ts';
import type { Asset } from '@/types/asset.ts';
import type { Customer } from '@/types/customer.ts';
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
import { CustomerSelector } from '@/components/customer-selector.tsx';

export const CreateCasesDialog: FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>();
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
      connectedCustomer: selectedCustomer,
    };

    try {
      await createCase(data);

      setSelectedEmployee(undefined);
      setSelectedCustomer(undefined);
      setOpen(false);
    } catch (error) {
      console.error('Failed to create case:', error);
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
              <Label htmlFor="description">Customer</Label>
              <CustomerSelector
                value={selectedCustomer}
                onChange={setSelectedCustomer}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Employee</Label>
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
