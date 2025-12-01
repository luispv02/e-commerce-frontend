import { MdDeleteOutline } from "react-icons/md";
import type { CartItem } from "../../interfaces/cart";

export const ShoppingCartPage = () => {

  const compras: CartItem[] = [
    {
      quantity: 1,
      product: {
        id: "p1",
        title: "Sudadera Urbana",
        price: 79,
        description: "Sudadera cómoda para uso diario",
        stock: 20,
        category: 'clothes',
        images: ["https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=70"]
      },
    },
    {
      quantity: 2,
      product: {
        id: "p2",
        title: "Laptopp",
        price: 199,
        description: "Laptop",
        stock: 15,
        category: 'technology',
        images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=70"]
      },
    }
  ]

  return (
    <div className="pb-20">
      <h2 className="text-lg text-gray-700 font-bold border-b--2 border-gray-300 mt-6">Tu carrito de compras</h2>

      <div className="md:flex md:gap-10 md:mt-6">
        {/* Productos */}
        <div className="pt-4 md:flex-2">
          {
            compras.map(compra => (
              <div key={compra.product.id} className="flex border-b-2 border-gray-300 py-4 px-4 space-x-6">
                <div className="image">
                  <img src={compra.product.images[0]} alt={compra.product.title} className="w-22 md:w-30 object-cover" />
                </div>

                <div className="info flex flex-col flex-1 justify-between">
                  <div className="">
                    <div className="font-semibold text-sm md:text-lg">{compra.product.title}</div>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="text-sm flex ">$ {compra.product.price}</div>

                    <div className="flex justify-end bg-gray-200 rounded-full py-[3px] ml-auto">
                      <button className=" w-5 h-5 flex items-center justify-center cursor-pointer text-gray-600">-</button>
                      <div className=" text-center px-2 text-sm">1</div>
                      <button className="w-5 h-5 flex items-center justify-center cursor-pointer text-gray-600">+</button>
                    </div>

                    <button className="cursor-pointer">
                      <MdDeleteOutline className="text-gray-500 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        {/* Total */}
        <div className="h-full mt-4 md:mt-0 md:border md:border-gray-200 md:p-4 md:shadow-lg flex-1 rounded-2xl">
          <div className="flex justify-between">
            <div className="text-gray-700 font-semibold text-mg">Subtotal</div>
            <div>$140.00</div>
          </div>

          <div className="mt-8 md:border-t border-gray-300 pt-4">
            <button className="bg-gray-700 w-full py-2 rounded color-white hover:bg-gray-800 transition cursor-pointer text-white">Pagar</button>
          </div>
        </div>
      </div>
    </div>
  );
};