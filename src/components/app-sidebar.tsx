import { Link, useRouterState } from '@tanstack/react-router';
import {
  CalendarRange,
  ChartBar,
  ChartNoAxesColumn,
  FolderOpen,
  PanelLeftClose,
  PanelRightClose,
  Users,
  Wallet,
} from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

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
      title: 'Orders',
      url: '/orders',
      icon: Wallet,
    },
    {
      title: 'Employees',
      url: '/users',
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
        <SidebarHeader>
          <div
            className={cn(
              'flex items-center justify-left px-2 py-4',
              open && 'border-b-2 ',
            )}
          >
            {open ? (
              <img src="/Logo_Small.svg" alt="Sidebar picture here" />
            ) : (
              <img
                src="/Collapsed_Logo_Sidebar.svg"
                alt="Collapsed Logo for sidebar"
                className="!w-8 !h-8 max-w-none max-h-none relative left-[-8px]"
              />
            )}
          </div>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive =
                  currentPath === item.url ||
                  currentPath.startsWith(`${item.url}/`);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link
                        to={item.url}
                        className={`flex items-center gap-2 transition-colors ${
                          isActive
                            ? 'bg-muted text-primary font-medium rounded-md'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="pb-2 pl-0 pr-[3px]">
        <div className="flex ">
          {open && (
            <SidebarMenuButton>
              <Link
                to="/"
                className={`flex items-center gap-2 transition-colors ${
                  currentPath === '/settings'
                    ? 'bg-muted text-primary font-medium rounded-md p-2'
                    : 'text-muted-foreground hover:text-foreground p-2 rounded-md'
                }`}
              ></Link>
            </SidebarMenuButton>
          )}

          <div className="ml-auto">
            <Button variant="ghost" onClick={toggleSidebar}>
              {open ? <PanelLeftClose /> : <PanelRightClose />}
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
