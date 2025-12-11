import type { Filter } from "../../interfaces/filters";


export const technologyFilters: Filter[] = [
  {
    title: "Tipo de producto",
    filterKey: "type",
    options: [
      { id: "laptops", label: "Laptops" },
      { id: "smartphones", label: "Smartphones" },
      { id: "headphones", label: "Auriculares" },
      { id: "smartwatches", label: "Smartwatches" },
      { id: "cameras", label: "Cámaras" },
      { id: "others", label: "Otros" },
    ],
  },
  {
    title: "Marca",
    filterKey: "brand",
    options: [
      { id: "apple", label: "Apple" },
      { id: "samsung", label: "Samsung" },
      { id: "xiaomi", label: "Xiaomi" },
      { id: "huawei", label: "Huawei" },
      { id: "lenovo", label: "Lenovo" },
      { id: "sony", label: "Sony" },
      { id: "others", label: "Otros" },
    ],
  },
];