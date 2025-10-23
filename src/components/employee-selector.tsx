import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {type FC} from "react";

const employeeNames = ["Mathias", "Kevin", "Elias", "Oliver"]; // example array

interface EmployeeSelectorProps {
    value: string | null;
    onChange: (value: string) => void;
}

export const EmployeeSelector: FC<EmployeeSelectorProps> = ({value, onChange}) => {
    return (
        <Select value={value || undefined} onValueChange={onChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an employee"/>
            </SelectTrigger>
            <SelectContent>
                {employeeNames.map((name) => (
                    <SelectItem key={name} value={name.toLowerCase()}>
                        {name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

