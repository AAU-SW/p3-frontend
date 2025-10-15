import {AssetsBaseData} from "@/components/assets/assets-basedata.tsx";
import {DetailHeader} from "@/components/assets/detail-header.tsx";
import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/assets/$id/')({
    component: RouteComponent,
})

function RouteComponent() {
    const data = {
        imei: "838891",
        id: "1",
        name: "VW ID.3",
        createdAt: "1/10/2024",
        updatedAt: "6/10/2025",
        updatedBy: "Ryan Jespersen",
        lastInvoiced: "15/10/2025",
        status: "Active",
    }

    return (
        <div className="flex flex-col">
            <DetailHeader title={data.name}/>
            <div className="grid grid-cols-3 p-4 gap-2">
     
                <div className="grid col-span-1">
                    <AssetsBaseData data={data}/>
                </div>
            </div>
        </div>
    );
}
