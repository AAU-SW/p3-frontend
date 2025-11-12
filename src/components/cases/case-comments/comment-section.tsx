import { toast } from 'sonner';
import type { FC, FormEvent } from 'react';
import type { Comment, CreateComment } from '@/types/comment.ts';
import { Textarea } from '@/components/ui/textarea.tsx';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { CommentItem } from '@/components/cases/case-comments/comment-item.tsx';
import { Button } from '@/components/ui/button.tsx';
import { addComment } from '@/api/cases.ts';
import { Route } from '@/routes/cases/$id';

interface CommentSectionProps {
  data?: Comment[];
}

export const CommentSection: FC<CommentSectionProps> = ({ data }) => {
  const caseId = Route.useParams();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);
    const comment: CreateComment = {
      comment: formData.get('comment') as string,
    };

    try {
      await addComment(caseId.id, comment);
      form.reset();
    } catch (error) {
      toast.error('Failed to post comment.');
      console.error('Faild to post comment: ', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <CommentItem data={data ?? []} />
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="w-full">
          <Textarea
            id="comment"
            name="comment"
            placeholder="Write a comment..."
          />
          <div className="flex justify-end pt-2">
            <Button type="submit" variant="outline">
              Comment
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
};
