import { Link } from "react-router";
import { FaArrowRight, FaLock } from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";

export const NotAuthenticated = () => {
  return (
    <div className="w-full ">
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center space-y-8">

          <div className="flex justify-center">
            <div className="rounded-3xl p-6 shadow-lg border border-gray-100">
              <FaLock size={50} />
            </div>
          </div>

          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold drop-shadow-lg">
              No autenticado
            </h1>
            <p className="text-lg text-center">
              Inicia sesión o crea una cuenta para acceder a esta sección.
            </p>
          </div>

          <div className="md:flex justify-center gap-4 space-y-4 md:space-y-0">
            <Link
              to="/auth/login"
              className="flex items-center justify-center border border-gray-400 shadow-xl px-4 py-4 gap-2 rounded-lg font-semibold hover:bg-black hover:text-white transition"
            >
              Iniciar Sesión
              <FaArrowRight size={18}/>
            </Link>
            
            <Link
              to="/auth/register"
              className="flex items-center justify-center border border-gray-400 shadow-xl px-4 py-4 gap-2 rounded-lg font-semibold hover:bg-black hover:text-white transition"
            >
              Crear Cuenta
              <HiUserAdd size={25}/>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
