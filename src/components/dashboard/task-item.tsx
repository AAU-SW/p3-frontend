import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';
import type { FC } from 'react';
import type { Case } from '@/types/case.ts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { getCases } from '@/api/cases.ts';
import { groupByAssignee } from '@/utils/groupByAssignee.ts';
import { StatusBadge } from '@/components/status-badge.tsx';
import { formatDate } from '@/utils/formatDate.ts';
import { DatePicker } from '@/components/date-picker';
import { Button } from '@/components/ui/button.tsx';
import { GlobalLoader } from '@/components/GlobalLoader.tsx'; 

export const TaskDashboard: FC = () => {
  const [casesData, setCasesData] = useState<Case[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllCases = async () => {
      try {
        const response = await getCases();
        setCasesData(response);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch cases');
      }
    };

    fetchAllCases();
  }, []);

  const filteredCases = selectedDate
    ? casesData.filter((c) => {
        if (!c.dueDate) return false;
        const caseDate = new Date(c.dueDate);

        return (
          caseDate.getFullYear() === selectedDate.getFullYear() &&
          caseDate.getMonth() === selectedDate.getMonth() &&
          caseDate.getDate() === selectedDate.getDate()
        );
      })
    : casesData;

  const grouped = groupByAssignee(filteredCases);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-end w-full">
        {selectedDate && (
          <Button variant="outline" onClick={() => setSelectedDate(undefined)}>
            Reset date
          </Button>
        )}
        <DatePicker
          date={selectedDate}
          onDateChange={(d) => setSelectedDate(d)}
          icon={true}
        />
      </div>
      {Object.keys(grouped).length === 0 && <GlobalLoader />}

      <div className="grid grid-cols-2 gap-4">
        {Object.values(grouped).map((group) => (
          <Card
            key={group.assignee?.id}
            className="col-span-1 max-h-80 overflow-y-auto"
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-semibold">
                {group.assignee?.name[0] ?? '?'}
              </div>

              <div className="flex flex-col">
                <CardTitle>{group.assignee?.name}</CardTitle>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  {group.assignee?.role}
                </span>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              {group.cases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className="flex items-center justify-between bg-muted/50 p-4 rounded-xl cursor-pointer"
                  onClick={() => navigate({ to: `/cases/${caseItem.id}` })}
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="font-semibold">{caseItem.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {caseItem.assetId?.registrationNumber}
                      </div>
                      <div className="text-xs text-gray-400">
                        Due: {formatDate(caseItem.dueDate)}
                      </div>
                    </div>
                  </div>

                  <StatusBadge status={caseItem.status} />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
