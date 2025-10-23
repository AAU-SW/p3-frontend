import {postOneCase} from "@/api/cases.ts";
import {CustomerSelector} from "@/components/customer-selector.tsx";
import {EmployeeSelector} from "@/components/employee-selector.tsx";
import {useState, type FC, type FormEvent} from 'react';
import {Button} from '@/components/ui/button.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Label} from '@/components/ui/label.tsx';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

export const CreateCasesDialog: FC = () => {
    const [open, setOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<string>("");
    const [selectedEmployee, setSelectedEmployee] = useState<string>("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        const data = {
            name: formData.get('name') as string,
            customer: selectedCustomer,
            assignedTo: selectedEmployee,
            status: 'Active',
        };
        console.log(data)
        try {
            await postOneCase(data);
            
            setSelectedCustomer("");
            setSelectedEmployee("");
            setOpen(false);
        } catch (error) {
            console.error('Failed to create asset:', error);
        }
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Add Cases</Button>
            </DialogTrigger>

            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add Cases</DialogTitle>
                        <DialogDescription>
                            To create a case you must fill out the following form.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 pt-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" required/>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description">Customer</Label>
                            <CustomerSelector value={selectedCustomer} onChange={setSelectedCustomer}/>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description">Employee</Label>
                            <EmployeeSelector value={selectedEmployee} onChange={setSelectedEmployee}/>
                        </div>
                    </div>

                    <DialogFooter className="sm:justify-start md:justify-between pt-2">
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit">Create Asset</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
