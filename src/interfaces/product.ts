export interface BaseProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  stock: number;
  category: ProductCategory;
  images: ProductImage[];
}

export interface ClothingProduct extends BaseProduct {
  category: "clothes";
  sizes: Size[];
  gender: Gender;
  colors: string[];
  type: TypeClothing;
}

export interface TechnologyProduct extends BaseProduct {
  category: "technology"; 
  type: string;
  brand: string;
}

export interface OtherProduct extends BaseProduct {
  category: "others"; 
}

export type Product = ClothingProduct | TechnologyProduct | OtherProduct;

export type Size = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
export type Gender = 'men' | 'women' | 'kid';
export type TypeClothing = 'shirts' | 't-shirts' | 'pants';
export type ProductCategory =  'clothes' | 'technology' | 'others';


export type NewProduct = Omit<BaseProduct, 'category'> & {
  id: 'new',
  category: '';
}

export type ProductFormValues = {
  id: string;
  title: string;
  price: number;
  description: string;
  stock: number;
  category: ProductCategory | "";
  images: ProductImage[];

  files?: File[];
  sizes?: Size[];
  colors?: string[];
  gender?: string;
  type?: string;
  brand?: string;
};

interface ProductImage {
  _id: string;
  url: string;
}