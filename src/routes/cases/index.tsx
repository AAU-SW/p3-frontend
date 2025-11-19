import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import type { Case } from '@/types/case';
import { getCases } from '@/api/cases';
import { CasesTable } from '@/components/cases/cases-table/cases-table';
import { Button } from '@/components/ui/button';
import { UpdateCaseDialog } from '@/components/cases/update-cases/update-cases-dialog';

export const Route = createFileRoute('/cases/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [data, setData] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        setIsLoading(true);
        const response = await getCases();
        setData(response);
      } catch (error) {
        console.error('Failed to fetch asset:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCases();
  }, []);

  return (
    <>
      <div className="w-full p-4 container mx-auto">
        <div className="flex flex-row justify-between items-center mb-4">
          <h1 className="text-4xl">Cases</h1>
          <Button variant="outline">Add Case</Button>
        </div>
        <CasesTable
          data={data}
          isLoading={isLoading}
          onEdit={(caseItem) => {
            setSelectedCase(caseItem);
            setOpen(true);
          }}
        />
      </div>
      <UpdateCaseDialog
        open={open}
        onOpenChange={setOpen}
        caseData={selectedCase}
      />
    </>
  );
}
