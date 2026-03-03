'use client';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { cn } from '@/lib/utils';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../providers/auth';
import { useSidebar } from '@/features/utilities/hooks/use-sidebar';

export default function AuthorizedLayout() {
  const { user } = useAuth();
  const { getOpenState } = useSidebar();
  if (!user) {
    return <Navigate to="/login" />;
  }


  return (
    <>
      <Sidebar />
      <main
        className={cn(
          'min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300',
          getOpenState() === false ? 'lg:ml-[90px]' : 'lg:ml-72'
        )}
      >
        <div>
          <Navbar />
          <div className="container pt-8 pb-8 px-4 sm:px-8">
            <Outlet />
          </div>
        </div>
      </main>
      <footer
        className={cn(
          'transition-[margin-left] ease-in-out duration-300',
          getOpenState() === false ? 'lg:ml-[90px]' : 'lg:ml-72'
        )}
      >
        <Footer />
      </footer>
    </>
  );
}
