import {
  createRootRouteWithContext,
  Outlet,
  redirect,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import type { AuthStore } from '@/stores/auth';
import { useAuth } from '@/stores/auth';
import { SidebarProvider } from '@/components/ui/sidebar.tsx';
import { Toaster } from '@/components/ui/sonner';
import { AppSidebar } from '@/components/app-sidebar.tsx';

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
          <div className="flex w-full h-screen">
            {/* Left sidebar (only when logged in) */}
            {auth.user && (
              <>
                <AppSidebar />
              </>
            )}

            {/* Main content area */}
            <div className="bg-gray-50 w-full">
              <main>
                <Outlet />
              </main>
            </div>
          </div>

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
