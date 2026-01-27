import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { BsCreditCard } from "react-icons/bs";
import { FaArrowRight, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";
import { LuShoppingBag } from "react-icons/lu";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router";
import type { UserFormValues } from "../../interface/auth";
import { useAuth } from "../../hooks/useAuth";
import { Loading } from "../../../components/ui/Loading";
import { useShopStore } from "../../../shop/store/shop.store";

export const LoginPage = () => {

  const { loginMutation } = useAuth();
  const { register, handleSubmit,  formState: { errors } } = useForm<UserFormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const selectedProduct = useShopStore((state) => state.selectedProduct)
  const setSelectedProduct = useShopStore((state) => state.setSelectedProduct)
  const addItem = useShopStore((state) => state.addItem)

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const onSubmit: SubmitHandler<UserFormValues> = async(data) => {
    try {
      await loginMutation.mutateAsync(data);
      if(selectedProduct){
        addItem(selectedProduct);
        setSelectedProduct(null)
      }
      navigate(from, { replace: true });
    } catch {
      // Error handled from onError
    }
  };

  return (
    <>
      <div className="flex-1 flex items-center justify-center px-6 lg:px-0">
        <div
          className="w-full ma
        x-w-md backdrop-blur-md bg-white/10 rounded-3xl shadow-xl  border border-white/30 px-6 md:px-8 py-10"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
              E-commerce
            </h1>
            <p className="text-white text-sm ">
              Bienvenido a tu tienda en linea
            </p>
          </div>

          <h2 className="text-3xl font-bold text-white mb-8 drop-shadow-lg text-center">
            Iniciar sesión
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-1"
              >
                Email
              </label>

              <input
                type="email"
                {...register("email", {
                  required: "El email es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                    message: "Email no valido",
                  },
                })}
                placeholder="tuemail@email.com"
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-all bg-white/40  text-white ${
                  errors.email
                    ? "border-red-500"
                    : "border-white/30 focus:border-white"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mb-1"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                      message:
                        "Mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 símbolo",
                    },
                  })}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-all bg-white/40  text-white ${
                    errors.password
                      ? "border-red-500"
                      : "border-white/30 focus:border-white "
                  }`}
                />

                <button
                  type="button"
                  className="cursor-pointer text-white text-lg absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {
              loginMutation.isPending
              ? <Loading />
              : <button
                  type="submit"
                  className="w-full cursor-pointer bg-white text-black/80 hover:bg-gray-100 font-semibold py-3  rounded-lg transition-all flex items-center justify-center gap-2 shadow-md border border-white/30 hover:border-white/50"
                >
                  INICIAR SESIÓN
                  <FaArrowRight />
                </button>
                }
          </form>

          <div className="mt-8 text-center">
            <p className="text-white text-sm drop-shadow-md">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/auth/register"
                state={location.state}
                className="text-white font-semibold hover:text-white/80 transition-colors underline underline-offset-2"
              >
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center space-y-8">
          <div className="text-center">
            <h3 className="text-white text-2xl font-bold mb-2 drop-shadow-2xl">
              Tu tienda favorita
            </h3>
            <p className="text-white/90 text-lg drop-shadow-lg">
              Compra fácil, rápido y seguro
            </p>
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
              <GoStarFill size={70} color="white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
