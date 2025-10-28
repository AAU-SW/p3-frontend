import {
  Outlet,
  createRootRouteWithContext,
  redirect,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { SidebarProvider } from '@/components/ui/sidebar.tsx';
import { Toaster } from '@/components/ui/sonner';
import { AppSidebar } from '@/components/app-sidebar.tsx';
import { useAuth, type AuthStore } from '@/stores/auth';

interface MyRouterContext {
  auth: AuthStore;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async ({ context, location }) => {
    const me = await context.auth.getCurrentUser();
    if (location.pathname === '/login') {
      if (me) throw redirect({ to: '/' });
    } else {
      if (!me) throw redirect({ to: '/login' });
    }
  },
  component: () => {
    const auth = useAuth();

    return (
      <>
        <Toaster />
        <SidebarProvider>
          {auth.user && <AppSidebar />}
          <Outlet />
          {import.meta.env.DEV && (
            <TanStackDevtools
              config={{
                position: 'bottom-right',
              }}
              plugins={[
                {
                  name: 'Tanstack Router',
                  render: <TanStackRouterDevtoolsPanel />,
                },
              ]}
            />
          )}
        </SidebarProvider>
      </>
    );
  },
});
