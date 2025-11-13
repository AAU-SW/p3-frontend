import {createFileRoute, useParams} from '@tanstack/react-router';
import {useEffect, useState} from 'react';
import {toast} from 'sonner';
import type {Case} from '@/types/case.ts';
import type {Image} from '@/types/image.ts';
import {InformationBox} from '@/components/cases/cases-detail-table/information-box.tsx';
import BackLink from '@/components/backlink.tsx';
import {CommentSection} from '@/components/cases/case-comments/comment-section.tsx';
import {getAllCaseFilesById, getOneCase} from '@/api/cases.ts';
import {FileCard} from '@/components/file-upload/file-card.tsx';
import {CaseTask} from "@/components/cases/cases-detail-table/case-task.tsx";

export const Route = createFileRoute('/cases/$id/')({
  component: RouteComponent,
});

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
  casesLoading;
  // This is done above or else buidl error
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
  console.log(caseData)
  return (
    <div className="w-full bg-[#F8FAFC] p-4 container mx-auto">
      <BackLink />
      <h1 className="text-4xl mb-4"> Tracking device installation </h1>
      <div className="flex justify-between gap-6">
        <div className="w-2/3 h-fit gap-6 flex flex-col">
            <CaseTask data={caseData} />
            <CommentSection data={caseData?.comments ?? []} />
        </div>

        <div className="w-1/3 flex flex-col gap-6">
          <InformationBox data={caseData} />
          <FileCard image={caseFiles} />
        </div>
      </div>
    </div>
  );
}
