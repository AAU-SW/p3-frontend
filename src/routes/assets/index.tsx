import { createFileRoute } from "@tanstack/react-router";
import { AssetsTable } from "@/components/assets/assets-table/assets-table.tsx";

export const Route = createFileRoute("/assets/")({
	component: RouteComponent,
});

function RouteComponent() {
	    const data = [
        {
            name: "Udskiftning af vinterdæk",
            status: "Active",
            registrationNumber: "123456",
            id: "A1B2C3",
            description: "Udskiftning af vinterdæk på bil",
        },
		{
            name: "Udskiftning af sommerdæk",
            status: "Inactive",
            registrationNumber: "654321",
            id: "D4C3B2",
            description: "Udskiftning af sommerdæk på bil",
        },
    ]
	return (
		<div className="w-full p-4 container mx-auto">
			<h1 className="text-4xl"> Assets </h1>
			<AssetsTable data={data} />
		</div>
	);
}

// læg komponent til her
// <AssetsTable data={} />

