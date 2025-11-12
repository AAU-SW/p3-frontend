import { createFileRoute } from '@tanstack/react-router';
import { CasesDetailTable } from '@/components/cases/cases-detail-table/cases-detail-table.tsx';
import { InformationBox } from '@/components/cases/cases-detail-table/information-box.tsx';
import BackLink from '@/components/backlink.tsx';
import { CommentSection } from '@/components/cases/case-comments/comment-section.tsx';

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
          <CommentSection data={[]} />
        </div>

        {/* information box */}
        <div className="w-1/3">
          <InformationBox informationData={informationData} />
        </div>
      </div>
    </div>
  );
}
