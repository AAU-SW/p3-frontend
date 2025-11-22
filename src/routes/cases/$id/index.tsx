import {
  createFileRoute,
  useNavigate,
  useParams,
} from '@tanstack/react-router';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import type { Case } from '@/types/case.ts';
import type { Image } from '@/types/image.ts';
import { InformationBox } from '@/components/cases/cases-detail/information-box.tsx';
import BackLink from '@/components/backlink.tsx';
import { CommentSection } from '@/components/cases/cases-detail/case-comments/comment-section.tsx';
import { getAllCaseFilesById, getOneCase } from '@/api/cases.ts';
import { FileCard } from '@/components/file-upload/file-card.tsx';
import { CaseTask } from '@/components/cases/cases-detail/case-task.tsx';
import { DeleteCaseDialog } from '@/components/cases/delete-case/delete-case-dialog.tsx';
import { GlobalLoader } from '@/components/GlobalLoader.tsx';

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
        console.error(error);
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

  const navigate = useNavigate();
  const onDeleteSuccess = useCallback(() => {
    navigate({ to: '/cases' });
  }, [navigate]);

  if (!caseData) {
    return <GlobalLoader />;
  }

  return (
    <div className="w-full bg-[#F8FAFC] p-4 container mx-auto">
      <BackLink />
      <div className="flex items-center justify-between mb-4">
        <div>
          <DeleteCaseDialog
            caseId={caseData.id}
            onDeleteSuccess={onDeleteSuccess}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-fit gap-6 flex flex-col">
          <CaseTask data={caseData} />
          <CommentSection data={caseData.comments ?? []} />
        </div>

        <div className="col-span-1 flex flex-col gap-6">
          <InformationBox data={caseData} />
          <FileCard image={caseFiles} />
        </div>
      </div>
    </div>
  );
}
