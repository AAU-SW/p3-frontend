import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import type { Case } from '@/types/case';
import { getCases } from '@/api/cases';
import { CasesTable } from '@/components/cases/cases-table/cases-table';
import { CreateCasesDialog } from '@/components/cases/create-cases/create-cases-dialog';

export const Route = createFileRoute('/cases/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [data, setData] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
    const fetchCases = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getCases();
        setData(response);
      } catch (error) {
        console.error('Failed to fetch cases:', error);
        setError('Failed to load cases:');
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
    fetchCases();
  }, []);

  const handleCaseCreated = () => {
    fetchCases();
    
  };

  return (
    <>
      <div className="w-full p-4 container mx-auto">
        <div className="flex flex-row justify-between items-center mb-4">
          <h1 className="text-4xl">Cases</h1>
          <CreateCasesDialog onCreated={handleCaseCreated} />
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <CasesTable data={data} isLoading={isLoading} />
      </div>
    </>
  );
}
