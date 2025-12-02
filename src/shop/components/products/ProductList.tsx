import type { Product } from "../../../interfaces/product";
import { ProductCard } from "./ProductCard";


interface Props {
  products: Product[];
}

export const ProductList = ({ products }: Props) => {
  return (
    <>
      {
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      }
    </>

  );
};