import { useRef, useState } from 'react';
import { toast } from 'sonner';
import type { FC } from 'react';
import type { CreateUser, User } from '@/types/user';
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
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createUser } from '@/api/user';

interface CreateUserDialogProps {
  onUserCreation?: (newUser: User) => void;
}

export const CreateUserDialog: FC<CreateUserDialogProps> = ({
  onUserCreation,
}) => {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    status: 'USER' as 'USER' | 'ADMIN',
  });

  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // avoid naming clash
    const fd = new FormData(e.currentTarget);

    const data: CreateUser = {
      name: fd.get('username') as string,
      email: fd.get('email') as string,
      password: fd.get('password') as string,
      role: fd.get('status') as 'ADMIN' | 'USER',
    };

    try {
      const newUser = await createUser(data);
      formRef.current?.reset();

      if (onUserCreation) onUserCreation(newUser);

      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to create user');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create User</Button>
      </DialogTrigger>

      <DialogContent>
        <form ref={formRef} onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
            <DialogDescription>
              Please fill out the form below to add a new user.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 pt-4">
            <div className="grid gap-3">
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                name="username"
                required
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>

              <Input
                type="password"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
              />

              <div className="text-xs text-muted-foreground">
                Password must contain:
                <ul className="list-disc pl-4 mt-1">
                  <li>At least one number</li>
                  <li>One lowercase letter</li>
                  <li>One uppercase letter</li>
                  <li>At least 8 characters</li>
                  <li>At least one special character</li>
                </ul>
              </div>
            </div>

            <Label htmlFor="status">Status</Label>
            <Select
              name="status"
              value={formData.status}
              onValueChange={(value) =>
                setFormData({ ...formData, status: value as 'ADMIN' | 'USER' })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                  <SelectItem value="USER">USER</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <DialogFooter className="sm:justify-start md:justify-between pt-6">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>

              <Button className="mt-4" type="submit">
                Create User
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
