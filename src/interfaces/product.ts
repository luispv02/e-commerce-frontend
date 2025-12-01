

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  stock: number;
  category: ProductCategory;
  images: string[];
}

export interface ClothingProduct extends Product {
  category: "clothes";
  sizes: Size[];
  gender: Gender;
  color: string;
  clothingType: TypeClothing[];
}

export interface TechnologyProduct extends Product {
  category: "technology"; 
  techType: string[];
  brand: string[];
}


export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
export type Gender = 'men' | 'women' | 'kid';
export type TypeClothing = 'shirts' | 't-shirts' | 'pants';
export type ProductCategory = 'clothes' | 'technology' | 'others';

