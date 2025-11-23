import { toast } from 'sonner';
import { useState } from 'react';
import type { ChangeEvent, FC, FormEvent } from 'react';
import type { Case } from '@/types/case.ts';
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
} from '@/components/ui/dialog';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { updateCase } from '@/api/cases.ts';
import { EmployeeSelector } from '@/components/employee-selector.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';

interface UpdateCaseDialogProps {
  caseData: Case;
  onUpdatedCase?: () => void;
}

export const UpdateCaseDialog: FC<UpdateCaseDialogProps> = ({
  caseData,
  onUpdatedCase,
}) => {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: caseData.title || '',
    assignedTo: caseData.assignedTo,
    description: caseData.description || '',
    status: caseData.status,
    location: caseData.location,
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
      await updateCase(caseData.id, formData);
      setOpen(false);
      onUpdatedCase?.();
    } catch (error) {
      console.error(error);
      toast.error('Faild to update case: ');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Update case</Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Case</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 pt-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
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
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="user">Employee</Label>
              <EmployeeSelector
                value={formData.assignedTo}
                onChange={(user) =>
                  setFormData((prev) => ({ ...prev, assignedTo: user }))
                }
              />
            </div>
          </div>

          <DialogFooter className="sm:justify-start md:justify-between pt-6">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Update case</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
