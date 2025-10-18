import {Button} from "@/components/ui/button.tsx";
import type {FC} from "react";

interface DetailHeaderProps {
    title: string;
}

export const DetailHeader: FC<DetailHeaderProps> = ({title}) => {
    return (
        <div className="flex items-center p-4 pb-0 justify-between gap-2">
            <h1 className="text-4xl font-medium">{title}</h1>
            <Button onClick={() => console.log("Create case")}>Add case</Button>
        </div>
    );
};
