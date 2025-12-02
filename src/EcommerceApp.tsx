import { RouterProvider } from "react-router";
import { appRouter } from "./router/app.router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
 import { Bounce, ToastContainer } from 'react-toastify';

const queryClient = new QueryClient()

export const EcommerceApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        toastClassName="flex justify-center text-sm"
      />

      <RouterProvider router={appRouter} />
    </QueryClientProvider>
  );
};