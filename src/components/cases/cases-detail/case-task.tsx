import { CircleUser, ClockIcon } from 'lucide-react';
import type { FC } from 'react';
import type { Case } from '@/types/case';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { formatDate } from '@/utils/formatDate.ts';
import { Separator } from '@/components/ui/separator.tsx';

interface CaseTaskProps {
  data: Case;
}

export const CaseTask: FC<CaseTaskProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl leading-4">{data.title}</CardTitle>
      </CardHeader>
      <CardContent className="leading-0">
        <p className="text-gray-600 mb-4">{data.description}</p>
        <Separator />
      </CardContent>
      <CardFooter className="space-x-4 items-center">
        <span className="flex items-center gap-2 text-gray-600">
          <ClockIcon />
          {formatDate(data.createdAt)}
        </span>
        <span className="flex items-center gap-2 text-gray-600">
          <CircleUser />
          {data.assignedTo?.name}
        </span>
      </CardFooter>
    </Card>
  );
};
