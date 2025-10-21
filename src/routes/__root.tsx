import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { AppSidebar } from "@/components/app-sidebar.tsx";
import { SidebarProvider } from "@/components/ui/sidebar.tsx";

export const Route = createRootRoute({
	component: () => (
		<>
			<SidebarProvider>
				<AppSidebar />
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
	),
});
