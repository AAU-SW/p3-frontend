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
import { CommentItem } from '@/components/cases/cases-detail/case-comments/comment-item.tsx';
import { Button } from '@/components/ui/button.tsx';
import { createComment } from '@/api/cases.ts';
import { Route } from '@/routes/cases/$id';

interface CommentSectionProps {
  data?: Comment[];
  onCommentCreated?: () => void;
}

export const CommentSection: FC<CommentSectionProps> = ({ data, onCommentCreated }) => {
  const caseId = Route.useParams();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);
    const comment: CreateComment = {
      comment: formData.get('comment') as string,
    };

    try {
      await createComment(caseId.id, comment);
      form.reset();
      onCommentCreated?.();
    } catch (error) {
      toast.error('Failed to post comment.');
      console.error('Faild to post comment: ', error);
    }
  };

  return (
    <Card className="max-h-128">
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent className="overflow-y-auto">
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
