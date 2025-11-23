import { ChevronDownIcon } from 'lucide-react';
import React from 'react';
import type { FC } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Calendar } from '@/components/ui/calendar.tsx';

interface DatePickerProps {
  date?: Date;
  onDateChange?: (date: Date) => void;
}

export const DatePicker: FC<DatePickerProps> = ({ date, onDateChange }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-3 ">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : 'Select date'}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(selectedDate) => {
              if (selectedDate) {
                onDateChange?.(selectedDate);
                setOpen(false);
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
