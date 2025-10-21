import { AppSidebar } from "@/components/app-sidebar.tsx";
import { SidebarProvider } from "@/components/ui/sidebar.tsx";
import { Outlet, createRootRoute, redirect } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

export const Route = createRootRoute({
	beforeLoad: ({ location, context }) => {
		const isAuthenticated = true; // replace with your real auth logic
		if (!isAuthenticated && location.pathname !== "/login") {
			throw redirect({ to: "/login" });
		}
	},

	component: () => {
		const isAuthenticated = false; // replace with your real auth logic
		return (
			<>
				<SidebarProvider>
					{isAuthenticated && <AppSidebar />}
					<Outlet />
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
						]}
					/>
				</SidebarProvider>
			</>
		);
	},
});
