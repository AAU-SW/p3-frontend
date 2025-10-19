import {
    Sidebar,
    SidebarContent,
    SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
    SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar"
import {BriefcaseIcon, CalendarIcon, HomeIcon, TruckIcon, UserIcon} from "lucide-react";

export function AppSidebar() {

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

    ]
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon/>
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
