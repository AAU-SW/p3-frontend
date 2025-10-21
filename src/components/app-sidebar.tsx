import { Button } from "@/components/ui/button.tsx";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { useRouterState } from "@tanstack/react-router";
import {
	BriefcaseIcon,
	CalendarIcon,
	HomeIcon,
	PanelLeftClose,
	PanelRightClose,
	TruckIcon,
	UserIcon,
} from "lucide-react";

export function AppSidebar() {
	const { open, toggleSidebar } = useSidebar();
	const routerState = useRouterState();
	const currentPath = routerState.location.pathname;

	const items = [
		{
			title: "Home",
			url: "/",
			icon: HomeIcon,
		},
		{
			title: "Calendar",
			url: "/calendar",
			icon: CalendarIcon,
		},
		{
			title: "Assets",
			url: "/assets",
			icon: TruckIcon,
		},
		{
			title: "Cases",
			url: "/cases",
			icon: BriefcaseIcon,
		},
		{
			title: "Users",
			url: "/users",
			icon: UserIcon,
		},
	];
	return (
		<Sidebar collapsible="icon">
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => {
								const isActive =
									currentPath === item.url ||
									currentPath.startsWith(`${item.url}/`);

								return (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild isActive={isActive}>
											<a
												href={item.url}
												className={`flex items-center gap-2 transition-colors ${
													isActive
														? "bg-muted text-primary font-medium rounded-md"
														: "text-muted-foreground hover:text-foreground"
												}`}
											>
												<item.icon className="w-4 h-4" />
												<span>{item.title}</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="pb-2 pl-0 pr-[3px]">
				<div className="flex justify-end">
					<Button variant="ghost" onClick={toggleSidebar}>
						{open ? <PanelLeftClose /> : <PanelRightClose />}
					</Button>
				</div>
			</SidebarFooter>
		</Sidebar>
	);
}
