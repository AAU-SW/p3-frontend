import { useRouterState } from '@tanstack/react-router';
import {
  CalendarRange,
  ChartBar,
  ChartNoAxesColumn,
  FolderOpen,
  PanelLeftClose,
  PanelRightClose,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
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
} from '@/components/ui/sidebar';

export function AppSidebar() {
  const { open, toggleSidebar } = useSidebar();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const items = [
    {
      title: 'Overview',
      url: '/',
      icon: ChartNoAxesColumn,
    },
    {
      title: 'Cases',
      url: '/cases',
      icon: FolderOpen,
    },
    {
      title: 'Assets',
      url: '/assets',
      icon: ChartBar,
    },
    {
      title: 'Employees',
      url: '/employees',
      icon: Users,
    },
    {
      title: 'Calendar',
      url: '/calendar',
      icon: CalendarRange,
    },
  ];
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="h-24">
            {open ? (
              <img src="/Logo_Small.svg" alt="Sidebar picture here" />
            ) : (
              <img
                src="/Collapsed_Logo_Sidebar.svg"
                alt="Collapsed Logo for sidebar"
                className="!w-8 !h-8 max-w-none max-h-none relative left-[-8px]"
              />
            )}
          </SidebarGroupLabel>
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
                            ? 'bg-muted text-primary font-medium rounded-md'
                            : 'text-muted-foreground hover:text-foreground'
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
