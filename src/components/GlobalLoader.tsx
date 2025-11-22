import { Spinner } from "@/components/ui/spinner"
export const GlobalLoader = () => {
    return (
        <div className="grid place-items-center w-full h-full">
            <Spinner className="size-16" />
        </div>
    );
};