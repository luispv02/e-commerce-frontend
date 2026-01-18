import { RouterProvider } from "react-router";
import { appRouter } from "./router/app.router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastGlobal } from "./components/ui/ToastGlobal";
import { useAuth } from "./auth/hooks/useAuth";
import { useEffect, type PropsWithChildren } from "react";
import { useAuthStore } from "./auth/store/auth.store";
import { FullScreenLoading } from "./components/ui/FullScreenLoading";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient()

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { renewMutation } = useAuth();
  const token = useAuthStore((state) => state.token)
  const authStatus = useAuthStore((state) => state.authStatus);
  const logout = useAuthStore((state) => state.logout)

  useEffect(() => {
    if(authStatus !== 'checking') return;

    if(token){
      renewMutation.mutate();
    }else{
      logout();
    }
  }, [token, renewMutation, authStatus, logout])


  if(authStatus === 'checking') return <FullScreenLoading />

  return children;
}


export const EcommerceApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <ToastGlobal />
      <CheckAuthProvider>
        <RouterProvider router={appRouter} />
      </CheckAuthProvider>
    </QueryClientProvider>
  );
};