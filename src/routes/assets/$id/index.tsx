import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/assets/$id/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/assets/$id/"!</div>;
}
