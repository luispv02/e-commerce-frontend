import type { Filter } from "../../interfaces/filters";


export const technologyFilters: Filter[] = [
  {
    title: "Tipo de producto",
    filterKey: "productType",
    options: [
      { id: "laptops", label: "Laptops" },
      { id: "smartphones", label: "Smartphones" },
      { id: "tablets", label: "Tablets" },
      { id: "headphones", label: "Auriculares" },
      { id: "smartwatches", label: "Smartwatches" },
      { id: "cameras", label: "Cámaras" },
      { id: "accessories", label: "Accesorios" },
    ],
  },
  {
    title: "Marca",
    filterKey: "brand",
    options: [
      { id: "apple", label: "Apple" },
      { id: "samsung", label: "Samsung" },
      { id: "hp", label: "HP" },
      { id: "dell", label: "Dell" },
      { id: "lenovo", label: "Lenovo" },
      { id: "sony", label: "Sony" },
      { id: "lg", label: "LG" },
      { id: "huawei", label: "Huawei" },
      { id: "xiaomi", label: "Xiaomi" },
    ],
  },
];