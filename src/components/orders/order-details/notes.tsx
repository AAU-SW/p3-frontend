import type { FC } from 'react';
import type { Note } from '@/types/note.ts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface NotesProps {
  data?: Note[];
  isLoading?: boolean;
}

export const Notes: FC<NotesProps> = ({ data = [], isLoading = false }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Notes:</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 italic">Loading notes...</p>
        </CardContent>
      </Card>
    );
  }

  if (!data.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Notes:</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 italic">No notes available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes:</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full space-y-2">
          {data.map((note) => (
            <AccordionItem key={note.id} value={`note-${note.id}`}>
              <AccordionTrigger className="hover:bg-muted/50 px-3 rounded-lg">
                <div className="flex justify-between items-center w-full text-left">
                  <h3 className="font-semibold">{note.name}</h3>
                  <span className="text-sm text-gray-500">{note.date}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-3 pb-2 pt-1 text-sm text-gray-700">
                <p>{note.description}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Status: <strong>{note.status}</strong> | Hardware ID:{' '}
                  <span className="font-mono">{note.hardware_id}</span>
                </p>
                <p className="text-sm mt-3 text-gray-800">{note.notes}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};
