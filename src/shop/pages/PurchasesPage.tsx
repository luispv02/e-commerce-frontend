
import type { Purchase } from "../../interfaces/purchases";

export const PurchasesPage = () => {

  const misCompras: Purchase[] = [
    {
      id: "PUR-001",
      date: "2025-01-10",
      total: 208,
      items: [
        {

          quantity: 1,
          pricePaid: 79,
          product: {
            id: "P-100",
            title: "Sudadera Urbana",
            price: 79,
            description: "Sudadera cómoda de algodón",
            stock: 10,
            category: "clothes",
            images: ["https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=70"],
            // sizes: ["S", "M", "L"],
            // gender: "men",
            // color: "gray",
            // clothingType: ["shirts"]
          },
        },
        {
          quantity: 1,
          pricePaid: 129,
          product: {
            id: "P-200",
            title: "Reloj Minimalista",
            price: 129,
            description: "Reloj elegante diseño minimalista",
            stock: 5,
            category: "technology",
            images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=70"],
            // techType: ["wearable"],
            // brand: ["Nordic"]
          },

        }
      ]
    },
    {
      id: "PUR-002",
      date: "2025-02-03",
      total: 358,
      items: [
        {
          quantity: 1,
          pricePaid: 299,
          product: {
            id: "P-300",
            title: "Laptop Pro 15”",
            price: 999,
            description: "Laptop de alto rendimiento",
            stock: 3,
            category: "technology",
            images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=70"]
          },
        },
        {
          quantity: 2,
          pricePaid: 29,
          product: {
            id: "P-101",
            title: "Playera Casual",
            price: 29,
            description: "Playera ligera y cómoda",
            stock: 15,
            category: "clothes",
            images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=70"]
          },
        }
      ]
    }
  ]


  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-lg text-gray-700 font-bold border-b--2 border-gray-300 mt-6">Mis Compras</h2>

      <div className="mt-6">

        <div>
          {
            misCompras.map(c => (
              <div key={c.id} className="border border-gray-300 rounded bg-gray-100 mb-4">
                <div className="p-2 md:px-6 flex justify-between">
                  <div className="font-semibold">Compra {c.id}</div>
                  <div>Fecha: {c.date}</div>
                </div>

                {
                  c.items.map(compra => (
                    <div key={compra.product.id} className="flex border-t border-gray-400 px-2 md:px-6 py-3 gap-3">
                      <div className="image">
                        <img src={compra.product.images[0]} alt={compra.product.title} className="w-22 md:w-30 object-cover" />
                      </div>

                      <div className="info flex flex-col flex-1 justify-between items-start">
                        <div className="text-right md:text-left">
                          <div className="font-semibold text-sm md:text-lg">{compra.product.title}</div>

                        </div>

                        <div className="">
                          <div className="text-[10px] text-gray-500">Cantidad: {compra.quantity}</div>
                          <div className="text-sm flex">Precio: ${compra.product.price}</div>
                        </div>
                      </div>
                    </div>
                  ))
                }
                <div className="p-2 md:px-6 flex justify-end border-t border-gray-300">
                  <div className="font-semibold">Total ${c.total}</div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};