import type { Product } from "../../../interfaces/product";
import { ProductCard } from "./ProductCard";


interface Props {
  products: Product[];
}

export const ProductList = ({ products }: Props) => {
  // console.log(products)

  return (
    <>
      {
        products.map((product, index) => (
          <ProductCard key={product.id} product={product} priority={index === 0}  />
        ))
      }
    </>

  );
};