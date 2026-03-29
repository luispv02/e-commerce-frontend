// Product entities
export interface BaseProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  stock: number;
  category: ProductCategory;
  images: ProductImage[];
  isActive: boolean;
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

// Types
export type Size = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
export type Gender = 'men' | 'women' | 'kid';
export type TypeClothing = 'shirts' | 't-shirts' | 'pants' | 'others';
export type ProductCategory =  'clothes' | 'technology' | 'others';


// Product Form
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
  isActive: boolean;

  files?: File[];
  sizes?: Size[];
  deletedImages?: string[];
  colors?: string[];
  gender?: string;
  type?: string;
  brand?: string;
};

// Api Response
export interface ProductsResponse {
  ok: boolean;
  data: {
    pagination: Pagination;
    products: Product[];
  }
}

export interface ProductResponse {
  ok: boolean;
  msg?: string;
  product: Product;
}

export interface Pagination {
  page: number;
  limit: number;
  totalProducts: number;
  totalPages: number;
}

export interface ProductsFilters {
  q?: string;
  category: string;
  order?: string;
  price?: string;
  page: number;
  size?: string;
  gender?: string;
  color?: string;
  brand?: string;
  type?: string;
}

export interface ProductImage {
  _id: string;
  url: string;
  public_id: string;
}

export interface ApiError {
  ok: boolean;
  msg: string;
}

export interface ProductValidationError {
  msg: string;
  ok: false;
  errors: ValidationError[];
}

interface ValidationError {
  msg: string;
  path: string;
}

// product variant
export interface ProductVariant {
  size: string | null;
  color: string | null;
}