import type { Filter } from "../../interfaces/filters";

export const clothesFilters: Filter[] = [
  {
    title: "Talla",
    filterKey: "size",
    options: [
      { id: "xs", label: "XS" },
      { id: "s", label: "S" },
      { id: "m", label: "M" },
      { id: "l", label: "L" },
      { id: "xl", label: "XL" },
      { id: "xxl", label: "XXL" },
    ],
  },
  {
    title: "Género",
    filterKey: "gender",
    options: [
      { id: "man", label: "Hombres" },
      { id: "women", label: "Mujeres" },
      { id: "kid", label: "Niños" },
    ],
  },
  {
    title: "Color",
    filterKey: "color",
    options: [
      { id: "white", label: "Blanco", hex: "#FFFFFF" },
      { id: "black", label: "Negro", hex: "#000000" },
      { id: "gray", label: "Gris", hex: "#808080" },
      { id: "red", label: "Rojo", hex: "#FF0000" },
      { id: "blue", label: "Azul", hex: "#0000FF" },
      { id: "green", label: "Verde", hex: "#008000" },
      { id: "yellow", label: "Amarillo", hex: "#FFFF00" },
      { id: "orange", label: "Naranja", hex: "#FFA500" },
      { id: "pink", label: "Rosa", hex: "#FFC0CB" },
    ],
  },
  {
    title: "Tipo",
    filterKey: "type",
    options: [
      { id: "shirts", label: "Camisas" },
      { id: "t-shirts", label: "Playeras" },
      { id: "pants", label: "Pantalones" }
    ],
  },
];