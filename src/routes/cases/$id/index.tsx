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

export const Route = createFileRoute('/cases/$id/')({
  component: RouteComponent,
});

function RouteComponent() {
  const params = useParams({ from: '/cases/$id/' });
  const [caseData, setCaseData] = useState<Case>();
  const [caseFiles, setCaseFiles] = useState<Image[]>([]);
  const navigate = useNavigate();

  const fetchCase = useCallback(async () => {
    try {
      const response = await getOneCase(params.id);
      setCaseData(response);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch cases');
    }
  }, [params.id]);

  useEffect(() => {
    fetchCase();
  }, [fetchCase]);

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

  if (!caseData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full bg-[#F8FAFC] p-4 container mx-auto">
      <BackLink />
      <div className="flex items-center justify-between mb-4">
        <div>
          <DeleteCaseDialog
            caseId={caseData.id}
            onDeleteSuccess={() => navigate({to: '/cases'})}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-fit gap-6 flex flex-col">
          <CaseTask data={caseData} />
          <CommentSection
              data={caseData.comments ?? []}
              onCommentCreated={fetchCase}
          />
        </div>

        <div className="col-span-1 flex flex-col gap-6">
          <InformationBox data={caseData} />
          <FileCard image={caseFiles} />
        </div>
      </div>
    </div>
  );
}
