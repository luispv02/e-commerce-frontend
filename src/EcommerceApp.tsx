import { RouterProvider } from "react-router";
import { appRouter } from "./router/app.router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastGlobal } from "./components/custom/ToastGlobal";

const queryClient = new QueryClient()

export const EcommerceApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastGlobal />

      <RouterProvider router={appRouter} />
    </QueryClientProvider>
  );
};