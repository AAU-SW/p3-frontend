import {
  Outlet,
  createRootRouteWithContext,
  redirect,
  useLocation,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import type { AuthStore } from '@/stores/auth';
import { useAuth } from '@/stores/auth';
import { SidebarProvider } from '@/components/ui/sidebar.tsx';
import { Toaster } from '@/components/ui/sonner';
import { AppSidebar } from '@/components/app-sidebar.tsx';
import Header from '@/components/header';

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
    const location = useLocation();
    const isRoute = /^\/$/.test(location.pathname);

    return (
      <>
        <Toaster />
        <SidebarProvider>
          <div className="flex w-full h-screen">
            {/* Left sidebar */}
            {auth.user && <AppSidebar />}

            {/* Right side: header + content */}
            <div className="flex flex-col flex-1 bg-gray-50">
              {auth.user && isRoute && <Header />}

              {/* Main content */}
              <main className="flex-1 overflow-auto">
                <Outlet />
              </main>
            </div>
          </div>

          {import.meta.env.DEV && (
            <TanStackDevtools
              config={{ position: 'bottom-right' }}
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
