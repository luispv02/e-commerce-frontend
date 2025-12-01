import { useState } from "react";
import { BsCreditCard } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";
import { LuShoppingBag } from "react-icons/lu";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>

      <div className="flex-1 flex items-center justify-center px-6 lg:px-0">
        <div className="w-full max-w-md backdrop-blur-md bg-white/10 rounded-3xl shadow-xl  border border-white/30 px-6 md:px-8 py-10">

          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">E-commerce</h1>
            <p className="text-white text-sm ">Bienvenido a tu tienda en linea</p>
          </div>

          <h2 className="text-3xl font-bold text-white mb-8 drop-shadow-lg text-center">Iniciar sesión</h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@email.com"
                className="w-full px-4 py-3 rounded-lg border-2 border-white/30 focus:border-white focus:shadow-md focus:shadow-white/60 focus:outline-none transition-all bg-white/40  text-white shadow-lg"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border-2 border-white/30 focus:border-white focus:shadow-md focus:shadow-white/60 focus:outline-none transition-all bg-white/40  text-white shadow-lg"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-white text-black/80 hover:bg-gray-100 font-semibold py-3  rounded-lg transition-all flex items-center justify-center gap-2 shadow-md border border-white/30 hover:border-white/50"
            >
              INICIAR SESIÓN
              <FaArrowRight />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-white text-sm drop-shadow-md">
              ¿No tienes una cuenta?{" "}
              <Link to="/auth/register" className="text-white font-semibold hover:text-white/80 transition-colors underline underline-offset-2">
                Regístrate
              </Link>
            </p>
          </div>

        </div>
      </div>

      <div className="hidden lg:flex flex-1 items-center justify-center">

        <div className="flex flex-col items-center space-y-8">

          <div className="text-center">
            <h3 className="text-white text-2xl font-bold mb-2 drop-shadow-2xl">Tu tienda favorita</h3>
            <p className="text-white/90 text-lg drop-shadow-lg">Compra fácil, rápido y seguro</p>
          </div>

          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-5 shadow-md border border-white/30">
            <MdOutlineShoppingCart size={70} color="white" />
          </div>

          <div className="flex gap-6">
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-5 shadow-md border border-white/30">
              <LuShoppingBag size={70} color="white" />
            </div>

            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-5 shadow-md border border-white/30">
              <BsCreditCard size={70} color="white" />
            </div>

            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-5 shadow-md border border-white/30">
              <GoStarFill size={70} color="white"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};