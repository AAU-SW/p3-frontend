import { createFileRoute, useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import type { Image } from '@/types/image.ts';
import { CasesDetailTable } from '@/components/cases/cases-detail-table/cases-detail-table.tsx';
import { InformationBox } from '@/components/cases/cases-detail-table/information-box.tsx';
import BackLink from '@/components/backlink.tsx';
import { getAllCaseFilesById } from '@/api/cases.ts';
import { FileCard } from '@/components/file-upload/file-card.tsx';

export const Route = createFileRoute('/cases/$id/')({
  component: RouteComponent,
});

const informationData = {
  name: 'Pillar A/S',
  adress: 'Knuds kirkevej, 3700 Rønne',
  caseID: '12345678',
  Customer: 'Pillar Construction',
  information: 'Install tracker on truck',
};

function RouteComponent() {
  const params = useParams({ from: '/cases/$id/' });
  const [caseFiles, setCaseFiles] = useState<Image[]>([]);
  useEffect(() => {
    const fetchAllCaseFiles = async () => {
      try {
        const response = await getAllCaseFilesById(params.id);
        setCaseFiles(response);
      } catch (error) {
        toast.error('Failed to fetch files');
        console.error('Failed to fetch case files:', error);
      }
    };

    fetchAllCaseFiles();
  }, []);

  return (
    <div className="w-full bg-[#F8FAFC] p-5">
      <BackLink />
      <h1 className="text-4xl mb-4"> Tracking device installation </h1>
      <div className="flex justify-between gap-4">
        {/* case table */}
        <div className="w-2/3">
          <div className="bg-[#01204B] text-white p-4 rounded-t-lg mb-2">
            <h2 className="text-2xl">Task</h2>
          </div>
          <CasesDetailTable data={[]} />
        </div>

        {/* information box */}
        <div className="w-1/3">
          <InformationBox informationData={informationData} />
          <FileCard image={caseFiles} />
        </div>
      </div>
    </div>
  );
}
