import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import type { Case } from '@/types/case.ts';
import { CasesDetailTable } from '@/components/cases/cases-detail-table/cases-detail-table.tsx';
import { InformationBox } from '@/components/cases/cases-detail-table/information-box.tsx';
import BackLink from '@/components/backlink.tsx';
import { CommentSection } from '@/components/cases/case-comments/comment-section.tsx';
import { getOneCase } from '@/api/cases.ts';

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
  const caseId = Route.useParams();
  const [casesLoading, setCasesLoading] = useState(false);
  const [caseData, setCaseData] = useState<Case>();
  useEffect(() => {
    const fetchCase = async () => {
      try {
        setCasesLoading(true);
        const response = await getOneCase(caseId.id);
        setCaseData(response);
      } catch (error) {
        setCasesLoading(false);
        toast.error('Failed to fetch cases');
      } finally {
        setCasesLoading(false);
      }
    };

    fetchCase();
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
          <CommentSection data={caseData?.comments ?? []} />
        </div>

        {/* information box */}
        <div className="w-1/3">
          <InformationBox informationData={informationData} />
        </div>
      </div>
    </div>
  );
}
