import {CircleUserIcon, ClockIcon} from 'lucide-react';
import type {FC} from 'react';
import {useState} from 'react';
import {toast} from 'sonner';
import type {Case} from '@/types/case';
import type {User} from '@/types/user.ts';
import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from '@/components/ui/card.tsx';
import {Separator} from '@/components/ui/separator.tsx';
import {DatePicker} from '@/components/date-picker.tsx';
import {updateCase} from '@/api/cases.ts';
import {EmployeeSelector} from '@/components/employee-selector.tsx';

interface CaseTaskProps {
  data: Case;
}

export const CaseTask: FC<CaseTaskProps> = ({ data }) => {
  const [formData, setFormData] = useState({
    dueDate: data.dueDate,
    title: data.title || '',
    assignedTo: data.assignedTo,
    description: data.description || '',
    status: data.status,
    location: data.location,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl leading-4">{data.title}</CardTitle>
      </CardHeader>
      <CardContent className="leading-0">
        <p className="text-gray-600 mb-4">{data.description}</p>
        <Separator />
      </CardContent>
      <CardFooter className="space-x-4 items-center">
        <span className="flex items-center gap-2 text-gray-600">
          <ClockIcon size="24" />
          <DatePicker
            date={data.dueDate}
            onDateChange={async (selectedDate) => {
              setFormData((prev) => ({
                ...prev,
                dueDate: selectedDate,
              }));

              try {
                await updateCase(data.id, {
                  ...formData,
                  dueDate: selectedDate,
                });
                toast.success('Case updated');
              } catch (err) {
                toast.error('Failed to update');
              }
            }}
          />
        </span>
        <span className="flex items-center gap-2 text-gray-600">
          <CircleUserIcon size="32" />
          <EmployeeSelector
            value={formData.assignedTo}
            onChange={async (employee: User) => {
              setFormData((prev) => ({
                ...prev,
                assignedTo: employee,
              }));

              try {
                await updateCase(data.id, {
                  ...formData,
                  assignedTo: employee,
                });
                toast.success('Case updated');
              } catch (err) {
                toast.error('Failed to update');
              }
            }}
          />
        </span>
      </CardFooter>
    </Card>
  );
};
