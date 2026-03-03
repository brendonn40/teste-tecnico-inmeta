import './index.css'
import { toast, Toaster } from 'sonner'
import { AuthProvider, useAuth } from './components/providers/auth'
import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './components/providers/theme'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import NotFound from './components/error-pages/not-found'
import AuthorizedLayout from './components/layouts/authorized-layout'
import Home from './pages/home'
import MyCards from './pages/my-cards'
import Trades from './pages/trades'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: 'always',
    },
    mutations: {
      onError(err: any) {
        try {
          if (typeof err.response.message === 'string') {
            toast.error(err.response.message);
          } else {
            if (err.status === 502) {
              toast.error(
                'Oops! Algo deu errado do nosso lado. Por favor, aguarde um momento e tente novamente.'
              );
            }
            if (err.status === 504) {
              toast.error(
                'Oops, nosso servidor não respondeu a tempo.Tente novamente!'
              );
            }
          }
        } catch {
          toast.error(
            'Oops! Algo deu errado do nosso lado. Por favor, aguarde um momento e tente novamente.'
          );
        }
      },
    },
  },
});

function AuthLayout() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div className="flex h-screen w-full  flex-col  justify-center">
      <Outlet />
    </div>
  );
}

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path="/" element={<AuthorizedLayout />}>
        <Route index element={<Home />} />
      </Route>,
      <Route path="/my-cards" element={<AuthorizedLayout />}>
        <Route index element={<MyCards />} />
      </Route>,
      <Route path="/trades" element={<AuthorizedLayout />}>
        <Route index element={<Trades />} />
      </Route>,
      <Route path="/login" element={<AuthLayout />}>
        <Route index element={<SignIn />} />
      </Route>,
      <Route path="/sign-up" element={<AuthLayout />}>
        <Route index element={<SignUp />} />
      </Route>,
      <Route path="*" element={<NotFound />} />,
    ])
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <Toaster position="top-center" />
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
