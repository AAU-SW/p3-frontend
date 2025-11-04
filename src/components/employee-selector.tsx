import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import type { FC } from 'react';
import type { User } from '@/types/user.ts';
import { getUsers } from '@/api/user.ts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';

interface EmployeeSelectorProps {
  onChange: (user: User) => void;
  value?: User;
}

export const EmployeeSelector: FC<EmployeeSelectorProps> = ({
  value,
  onChange,
}) => {
  const [usersData, setUsersData] = useState<Array<User>>([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await getUsers();
        setUsersData(response);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch users');
      }
    };

    fetchAllUsers();
  }, []);

  const handleSelectChange = (selectedId: string) => {
    const selectedUser = usersData.find((user) => user.id === selectedId);
    if (selectedUser) {
      onChange(selectedUser);
    }
  };

  return (
    <Select value={value?.id || undefined} onValueChange={handleSelectChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select an employee">
          {value ? value.name : 'Select an employee'}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {usersData.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            {user.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
