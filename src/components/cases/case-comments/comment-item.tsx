import {type FC} from 'react';
import {Item, ItemContent, ItemDescription, ItemTitle,} from '@/components/ui/item.tsx';
import type {Comment} from '@/types/comment.ts';

interface CommentItemProps {
  data: Comment[];
}

export const CommentItem: FC<CommentItemProps> = ({ data }) => {
  return (
    <div className="flex w-full flex-col gap-2">
      {data.map((comment) => (
        <Item variant="outline">
          <ItemContent>
            <ItemTitle className="w-full">
              <div className="w-full flex justify-between items-center font-light text-gray-500">
                <span>{comment.createdBy}</span>
                <span>{comment.createdAt}</span>
              </div>
            </ItemTitle>
            <ItemDescription className="">{comment.comment}</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  );
};
