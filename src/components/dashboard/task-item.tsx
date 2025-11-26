import {type FC, useEffect, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {getCases} from "@/api/cases.ts";
import {toast} from "sonner";
import type {Case} from "@/types/case.ts";
import {groupByAssignee} from "@/utils/groupByAssignee.ts";
import {StatusBadge} from "@/components/status-badge.tsx";
import {formatDate} from "@/utils/formatDate.ts";
import {useNavigate} from "@tanstack/react-router";

export const TaskItem: FC = () => {
    const [casesData, setCasesData] = useState<Case[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllCases = async () => {
            try {
                const response = await getCases();
                setCasesData(response);
            } catch (error) {
                console.error(error);
                toast.error('Failed to fetch cases');
            }
        };

        fetchAllCases();
    }, []);
    const grouped = groupByAssignee(casesData);

    return (
        <div className="grid grid-cols-2 gap-4 pl-4 pr-4">
            {Object.values(grouped).map(group => (
                <Card key={group.assignee?.id} className="col-span-1">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-semibold">
                            {group.assignee?.name?.[0] ?? "?"}
                        </div>

                        <div className="flex flex-col">
                            <CardTitle>{group.assignee?.name}</CardTitle>
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                                {group.assignee?.role}
                            </span>
                        </div>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-4">
                        {group.cases.map((caseItem) => (
                            <div
                                key={caseItem.id}
                                className="flex items-center justify-between bg-muted/50 p-4 rounded-xl cursor-pointer"
                                onClick={() => navigate({ to: `/cases/${caseItem.id}` })}
                            >
                                <div className="flex items-center gap-4">
                                    <div>
                                        <div className="font-semibold">{caseItem.title}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {caseItem.assetId?.registrationNumber}
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            Assigned: {formatDate(caseItem.dueDate)}
                                        </div>
                                    </div>
                                </div>
                                    <StatusBadge status={caseItem.status}/>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}