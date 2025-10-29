import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { type FC } from 'react';

const customerNames = ['Sporingsgruppen', 'Nordkysten', 'AAU', 'Holbøll']; // example array

interface CustomerSelectorProps {
  value: string | null;
  onChange: (value: string) => void;
}

export const CustomerSelector: FC<CustomerSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <Select value={value || undefined} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select an employee" />
      </SelectTrigger>
      <SelectContent>
        {customerNames.map((name) => (
          <SelectItem key={name} value={name.toLowerCase()}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
