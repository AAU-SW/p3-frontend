import type {FC} from "react";

interface DetailHeaderProps {
    title: string;
}

export const DetailHeader: FC<DetailHeaderProps> = ({title}) => {
    return (
        <div className="flex items-center p-4 justify-between gap-2">
            <h1 className="text-2xl font-medium">{title}</h1>
        </div>
    );
};
