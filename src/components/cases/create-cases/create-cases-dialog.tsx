import { createCase } from '@/api/cases.ts';
import type { Case } from '@/types/case.ts';
import { useState, type FC, type FormEvent, useEffect } from 'react';
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
import type { Asset } from '@/types/asset.ts';
import { getOneAsset } from '@/api/assets.ts';

export const CreateCasesDialog: FC = () => {
  const [open, setOpen] = useState(false);
  //const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  //const [selectedEmployee, setSelectedEmployee] = useState<string>('');

  const assetId = Route.useParams();

  const [assetData, setAssetData] = useState<Asset>();

  useEffect(() => {
    const fetchOneAsset = async () => {
      try {
        const response = await getOneAsset(String(assetId.id));
        setAssetData(response);
      } catch (error) {
        console.error('Failed to fetch asset:', error);
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

    const data: Case = {
      title: formData.get('name') as string,
      status: 'ACTIVE',
      assetId: assetData,
    };

    try {
      await createCase(data);

      // setSelectedCustomer('');
      // setSelectedEmployee('');
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
              {/*<CustomerSelector
                value={selectedCustomer}
                onChange={setSelectedCustomer}
              />*/}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Employee</Label>
              {/*<EmployeeSelector
                value={selectedEmployee}
                onChange={setSelectedEmployee}
              />*/}
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
