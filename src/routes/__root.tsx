import {
  Outlet,
  createRootRouteWithContext,
  redirect,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import type { AuthStore } from '@/stores/auth';
import { SidebarProvider } from '@/components/ui/sidebar.tsx';
import { Toaster } from "@/components/ui/sonner"
import { AppSidebar } from '@/components/app-sidebar.tsx';
import { useAuth } from '@/stores/auth';
import { Header } from '@/components/header';


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
        {auth.user && (
          <>
            <Header auth={auth.user} />
          </>
        )}
        <Toaster/> 
        <SidebarProvider>
          <div className="flex w-full h-screen">
            {/* Left sidebar (only when logged in) */}
            {auth.user && (
              <>
                <AppSidebar />
              </>
            )}

            {/* Main content area */}
            <div className="flex flex-col flex-1 bg-gray-50">
              <main className="flex-1 p-6 overflow-y-auto">
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
