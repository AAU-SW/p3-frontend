import { ChevronDownIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { FC } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Calendar } from '@/components/ui/calendar.tsx';
import { formatDate } from '@/utils/formatDate.ts';

interface DatePickerProps {
  date?: Date | string;
  onDateChange?: (date: Date) => void;
}

export const DatePicker: FC<DatePickerProps> = ({ date, onDateChange }) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    typeof date === 'string' ? new Date(date) : date,
  );

  useEffect(() => {
    setSelectedDate(typeof date === 'string' ? new Date(date) : date);
  }, [date]);

  return (
    <div className="flex flex-col gap-3 ">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal"
          >
            {selectedDate ? formatDate(selectedDate) : 'Select date'}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            captionLayout="dropdown"
            onSelect={(newDate) => {
              if (newDate) {
                setSelectedDate(newDate);
                onDateChange?.(newDate);
                setOpen(false);
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
