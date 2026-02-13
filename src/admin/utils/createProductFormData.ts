import type { ProductFormValues } from "../../interfaces/product";

export const createProductFormData = (product: ProductFormValues): FormData => {

  const { title, price, stock, description, category, type, files, sizes, gender, colors, brand, deletedImages } = product;

  const formData = new FormData();
  formData.append('title', title);;
  formData.append('price', price.toString());
  formData.append('stock', stock.toString());
  formData.append('description', description);
  formData.append('category', category)


  if(type) formData.append('type', type)
  files?.forEach((file) => { formData.append('files', file) })
  if(deletedImages) formData.append("deletedImages", JSON.stringify(deletedImages));

  if(category === 'clothes'){
    sizes?.forEach((size) => { formData.append('sizes[]', size) });
    colors?.forEach((color) => { formData.append('colors[]', color) });
    if(gender) formData.append('gender', gender);
  }
  if(category === 'technology'){
    if(brand) formData.append('brand', brand)
  }
  
  return formData;
}