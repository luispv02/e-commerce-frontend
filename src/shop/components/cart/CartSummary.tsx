import { useState } from "react";
import { currencyFormatters } from "../../../utils/currency-formatter"
import type { CartItem, CheckoutFormValues } from "../../interface/cart"
import { Modal } from "../../../components/ui/Modal";
import { Loading } from "../../../components/ui/Loading";
import { usePurchaseCart } from "../../hooks/orders/usePurchaseCart";
import { useForm } from "react-hook-form";


interface Props {
  items: CartItem[];
}

export const CartSummary = ({ items }: Props) => {

  const [isModalCheckoutOpen, setIsModalCheckoutOpen] = useState(false)
  const { mutate, isPending } = usePurchaseCart()

  const { register, handleSubmit, formState: { errors }} = useForm<CheckoutFormValues>()


  const totalPrice = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const someProductsAreUnavailable = items.some(item => item.product.isActive === false);

  return (
    <>
      <aside className="h-full mt-4 md:mt-0 md:border md:border-gray-200 md:p-4 md:shadow-lg flex-1 rounded-2xl sticky top-24">
        <div className="flex justify-between">
          <h3 className="text-gray-700 font-semibold">Total:</h3>
          <p>$ {currencyFormatters(totalPrice)}</p>
        </div>

        <div className="mt-8 md:border-t border-gray-300 pt-4">
          <button className={`bg-gray-700 w-full py-2 rounded hover:bg-gray-800 transition text-white ${someProductsAreUnavailable ? 'opacity-50' : ' cursor-pointer'}`} onClick={() => setIsModalCheckoutOpen(true)} disabled={someProductsAreUnavailable}>
            Realizar Compra
          </button>
          { someProductsAreUnavailable && <p className="text-red-500 text-xs  mt-4 mb-2"> Tienes productos no disponibles. Eliminálos para continuar. </p> }
        </div>
      </aside>


      <Modal title="Datos de envío" isOpen={isModalCheckoutOpen} onClose={() => setIsModalCheckoutOpen(false)}>
        <form onSubmit={handleSubmit(() => mutate())} className="w-xs md:w-md space-y-2 px-4">
          <div className="w-full">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
            <input type="text" id="fullName" {...register("fullName", { required: true, minLength: {value: 5, message: 'Nombre demasido corto'} })} placeholder="Juan Pérez" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:ring-gray-700 focus:border-gray-700" required />
            { errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p> }
          </div>

          <div className="w-full">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección</label>
            <input type="text" id="address" {...register("address", { required: "La dirección es obligatoria", minLength: { value: 4, message: "Direccion no válida" } })} placeholder="Calle, número, colonia" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:ring-gray-700 focus:border-gray-700" required />
            { errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p> }
          </div>

          <div className="w-full">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ciudad</label>
            <input type="text" id="city" {...register("city", { required: "La ciudad es obligatoria"})} placeholder="Ingresa tu nombre completo" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:ring-gray-700 focus:border-gray-700" required />
            { errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p> }
          </div>

          <div className="w-full">
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Codigo Postal</label>
            <input type="number" id="postalCode" {...register("postalCode", { required: "El código postal es obligatorio", pattern: { value: /^[0-9]{5}$/, message: "Debe tener 5 números" } })} placeholder="00000" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:ring-gray-700 focus:border-gray-700" required />
            { errors.postalCode && <p className="text-red-500 text-xs">{errors.postalCode.message}</p> }
          </div>

          <div className="w-full">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono de contacto</label>
            <input type="tel" id="phone" {...register("phone", { required: "Numero no válido", pattern: { value: /^[0-9]{10}$/, message: "Debe tener 10 números" } })} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:ring-gray-700 focus:border-gray-700" placeholder="1234567890" onChange={(e) => { e.target.value = e.target.value.replace(/\D/g, "")}} required />
            { errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p> }
          </div>

          <div className="w-full">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Indicaciones adicionales (opcional)
            </label>

            <textarea id="notes" className="resize-none mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:ring-gray-700 focus:border-gray-700" rows={3} placeholder="Ej. Dejar en recepción, horario preferido, etc." />
          </div>

          <button type="submit" className={`w-full px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gray-700 hover:bg-gray-800 transition cursor-pointer ${ isPending || someProductsAreUnavailable ? "opacity-50 cursor-not-allowed" : "" }`} disabled={isPending || someProductsAreUnavailable}>
            {
            isPending 
              ? <Loading width="w-6" height="h-6" message="" textColor="text-white" borderStyle="border-t-white" spinMargin="my-0" /> 
              : "Pagar"}
          </button>

        </form>
      </Modal>
    </>
  )
}