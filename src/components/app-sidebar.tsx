import { useRouterState } from '@tanstack/react-router';
import {
  FolderOpen,
  CalendarIcon,
  ChartNoAxesColumn,
  UsersIcon,
  PanelLeftClose,
  PanelRightClose,
  TruckIcon,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import {
  Sidebar,
  SidebarHeader,
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
import { Link } from '@tanstack/react-router'
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
      icon: TruckIcon,
    },
    {
      title: 'Emplyees',
      url: '/users',
      icon: UsersIcon,
    },
    {
      title: 'Calendar',
      url: '/calendar',
      icon: CalendarIcon,
    },
  ];
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarHeader>
          <div className={cn("flex items-center justify-left py-4", open && "border-b-2 ")}>
            <img 
              src="/logo.png"
              alt="logo"
              className=" border-black p-1 rounded-full bg-[#D4D4D4] "
            />
            {open && (
              <span className="ml-2 font-sans font-bold text-md">SPORINGSGRUPPEN</span>
            )}         
          </div>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Menu </SidebarGroupLabel>
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
            {open &&
            <SidebarMenuButton>
              <Link
                to="/"
                className={`flex items-center gap-2 transition-colors ${
                  currentPath === '/settings'
                    ? 'bg-muted text-primary font-medium rounded-md p-2'
                    : 'text-muted-foreground hover:text-foreground p-2 rounded-md'
                }`}
              >
                <Settings className="w-4 h-4" />
                 <span>Settings</span>
              </Link>
            </SidebarMenuButton>
            }
                   
          <div className='ml-auto'>
            <Button variant="ghost" onClick={toggleSidebar}>
              {open ? <PanelLeftClose /> : <PanelRightClose />}
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
