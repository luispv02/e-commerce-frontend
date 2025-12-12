
import { Bounce, ToastContainer } from 'react-toastify';

export const ToastGlobal = () => {
  return (
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
  );
};
