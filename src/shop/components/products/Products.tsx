
import { ProductList } from "./ProductList";
import type { Product } from "../../../interfaces/product";

const products: Product[] = [
  {
    id: "1",
    title: "Playera muy moderna",
    price: 100,
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=70", "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=70"],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vulputate ipsum ut augue pulvinar tincidunt.",
    stock: 1,
    category: "clothes",
    sizes: ["m", "l"],
    gender: "men",
    colors: ["white"],
    type: "t-shirts"
  },
  {
    id: "2",
    title: "Teclado y raton",
    price: 200,
    images: ["https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=70"],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vulputate ipsum ut augue pulvinar tincidunt.",
    stock: 2,
    category: "technology",
    type: '',
    brand: '',
  },
  {
    id: "3",
    title: "jeans muy comodo",
    price: 300,
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=70"],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vulputate ipsum ut augue pulvinar tincidunt.",
    stock: 2,
    category: "clothes",
    sizes: ["m", "l"],
    gender: "men",
    colors: ["white"],
    type: "t-shirts"
  },
  {
    id: "4",
    title: "Camisa roja y verde",
    price: 400,
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=70"],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vulputate ipsum ut augue pulvinar tincidunt.",
    stock: 3,
    category: "clothes",
    sizes: ["m", "l"],
    gender: "men",
    colors: ["white"],
    type: "t-shirts"
  },
  {
    id: "5",
    title: "Monitor LG 50pulgadas fullhd 4k 1080",
    price: 500,
    images: ["https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=70"],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vulputate ipsum ut augue pulvinar tincidunt.",
    stock: 4,
    category: "technology",
    type: '',
    brand: '',
  },
  {
    id: "6",
    title: "Jeans bonito",
    price: 600,
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=70"],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vulputate ipsum ut augue pulvinar tincidunt.",
    stock: 5,
    category: "clothes",
    sizes: ["m", "l"],
    gender: "men",
    colors: ["white"],
    type: "t-shirts"
  },
];

export const Products = () => {

  return (
    <section className="px-4">
      <header className="mb-6 flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="text-3xl font-semibold text-slate-900">
            Productos
          </h2>
        </div>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ProductList products={products} />
      </div>
    </section>
  );
};