import { toast } from 'sonner';
import { useState } from 'react';
import type { ChangeEvent, FC, FormEvent } from 'react';
import type { Asset } from '@/types/asset.ts';
import { updateAsset } from '@/api/assets.ts';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { DatePicker } from '@/components/date-picker.tsx';

interface DetailHeaderProps {
  assetData: Asset;
}

export const UpdateAssetDialog: FC<DetailHeaderProps> = ({ assetData }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: assetData.name || '',
    registrationNumber: assetData.registrationNumber || '',
    description: assetData.description || '',
    status: assetData.status,
    lastInvoiced: date || assetData.lastInvoiced,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateAsset(assetData.id, formData);
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error('Faild to update asset: ');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Update Asset</Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Asset</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 pt-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="registrationNumber">Registration number</Label>
              <Input
                id="registrationNumber"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                name="status"
                value={formData.status}
                onValueChange={(value: string) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: value as 'ACTIVE' | 'CLOSED',
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={formData.status} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                    <SelectItem value="CLOSED">CLOSED</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="date">Last Invoiced</Label>
              <DatePicker
                date={date}
                onDateChange={(selectedDate) => {
                  setDate(selectedDate);
                  setFormData((prev) => ({
                    ...prev,
                    lastInvoiced: selectedDate,
                  }));
                }}
              />
            </div>
          </div>

          <DialogFooter className="sm:justify-start md:justify-between pt-6">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Update Asset</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
