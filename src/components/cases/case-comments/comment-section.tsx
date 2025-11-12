import type { FC } from 'react';
import { Textarea } from '@/components/ui/textarea.tsx';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { CommentItem } from '@/components/cases/case-comments/comment-item.tsx';
import type { Comment } from '@/types/comment.ts';
import {Button} from "@/components/ui/button.tsx";

interface CommentSectionProps {
  data?: Comment[];
}

export const CommentSection: FC<CommentSectionProps> = ({ data }) => {
  const data1 = [
    {
      id: 'tes2',
      comment: 'Lorem ipsum',
      createdBy: 'Mathias Storgaard',
      createdAt: '12/10/2024',
    },
    {
      id: 'test',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas justo arcu, quis tristique leo commodo consequat. Curabitur a sollicitudin ligula. Nunc tincidunt sem non metus tincidunt, eu efficitur ex aliquam. Duis malesuada ligula et magna sagittis pharetra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla at libero tortor. Vestibulum at sollicitudin lorem. Praesent mauris diam, ultricies et sollicitudin vitae, pretium sed sapien. ',
      createdBy: 'Elias Razi',
      createdAt: '12/10/2024',
    },
    {
      id: 'tes2',
      comment: 'Lorem ipsum',
      createdBy: 'Mathias Storgaard',
      createdAt: '12/10/2024',
    },
    {
      id: 'test',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas justo arcu, quis tristique leo commodo consequat. Curabitur a sollicitudin ligula. Nunc tincidunt sem non metus tincidunt, eu efficitur ex aliquam. Duis malesuada ligula et magna sagittis pharetra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla at libero tortor. Vestibulum at sollicitudin lorem. Praesent mauris diam, ultricies et sollicitudin vitae, pretium sed sapien. ',
      createdBy: 'Elias Razi',
      createdAt: '12/10/2024',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <CommentItem data={data1} />
      </CardContent>
      <CardFooter>
        <form className="w-full">
          <Textarea />
          <div className="flex justify-end pt-2">
            <Button variant="outline">Comment</Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
};
