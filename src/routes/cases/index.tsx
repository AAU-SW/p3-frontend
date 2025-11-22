import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import type { Case } from '@/types/case';
import { getCases } from '@/api/cases';
import { CasesTable } from '@/components/cases/cases-table/cases-table';

export const Route = createFileRoute('/cases/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [data, setData] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
        </div>
        <CasesTable data={data} isLoading={isLoading} showAsset={true} />
      </div>
    </>
  );
}
