import { toast } from 'sonner';
import type { FC, FormEvent } from 'react';
import type { Case, CaseStatus, CreateCase } from '@/types/case';
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
} from '@/components/ui/dialog';
import { createCase } from '@/api/cases';

interface UpdateCaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseData: Case | null;
}

export const UpdateCaseDialog: FC<UpdateCaseDialogProps> = ({
  open,
  onOpenChange,
  caseData,
}) => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);
    const data: CreateCase = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      status: formData.get('status') as CaseStatus,
      location: formData.get('location') as string,
    };

    try {
      await createCase(data);
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to edit case');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Case</DialogTitle>
            <DialogDescription>Edit the selected case below.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 pt-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={caseData?.title ?? ''}
                required
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={caseData?.description ?? ''}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                className="p-2 border rounded"
                defaultValue={caseData?.status ?? 'ACTIVE'}
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="CLOSED">CLOSED</option>
                <option value="INVOICE">INVOICE</option>
              </select>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                defaultValue={caseData?.location ?? ''}
              />
            </div>
          </div>

          <DialogFooter className="sm:justify-start md:justify-between pt-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
