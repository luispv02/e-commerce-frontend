import { useState } from "react";
import { FaRegSave } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link, useParams } from "react-router";
import { ClothingFields } from "./ClothingFields";
import { TechFields } from "./TechFields";
import { UploadProductImage } from "./UploadProductImage";
import type { Filter } from "../../../interfaces/filters";
import { clothesFilters } from "../../../data/filters/clothes-filters";
import { technologyFilters } from "../../../data/filters/technology-filters";
import type { ProductCategory } from "../../../interfaces/product";

export const ProductForm = () => {
  const { id } = useParams();


  const [categoria, setCategoria] = useState<ProductCategory | "">("");

  const title = id === 'new' ? 'Nuevo Producto' : 'Editar Producto';
  const subTitle = id === 'new' ? 'Agrega un nuevo producto' : 'Edita el producto';

  const category: Record<ProductCategory, Filter[]> = {
    clothes: clothesFilters,
    technology: technologyFilters,
    others: [],
  };

  const selectedCategory = category[categoria as ProductCategory] || [];


  return (
    <form>
      <div className="flex justify-end items-center">

        <div className="flex gap-3">
          <Link to='/admin/products'>
            <button type="button" className="w-8 h-8 md:w-full px-2 border border-gray-300 bg-white shadow cursor-pointer flex justify-center items-center rounded hover:bg-gray-100 transition gap-2">
              <IoMdClose className="text-xl" />
              <span className="hidden md:block">Cancelar</span>
            </button>
          </Link>

          <button type="button" className="w-8 h-8 md:w-full px-2 border border-gray-800 bg-gray-900 text-white cursor-pointer shadow flex justify-center items-center rounded hover:bg-gray-700 transition gap-2">
            <FaRegSave className="text-xl" />
            <span className="hidden md:block">Guardar</span>
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600">{subTitle}</p>
      </div>

      <div className="mt-6 bg-white border border-gray-200 rounded-lg shadow-sm p-4 md:p-6">
        <div className="space-y-6">

          <div className="title">
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
              Título del producto
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              required
              className="w-full px-3 py-2 border text-sm border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300"
              placeholder="Título del producto"
            />
          </div>

          <div className="price-stock grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="price">
              <label htmlFor="precio" className="block text-sm font-medium text-gray-700 mb-1">
                Precio
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  required
                  className="w-full pl-7 pr-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300"
                  placeholder="Precio del producto"
                />
              </div>
            </div>

            <div className="stock">
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                Stock
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                required
                min="0"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300"
                placeholder="Stock del producto"
              />
            </div>
          </div>

          <div className="description">
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              required
              rows={5}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300 resize-none"
              placeholder="Descripción del producto"
            />
          </div>

          <div className="category">
            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
              Categoría
            </label>
            <select
              id="categoria"
              name="categoria"
              required
              value={categoria}
              onChange={(e) => setCategoria(e.target.value as ProductCategory | "")}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300"
            >
              <option value="">Selecciona una categoría</option>
              <option value="clothes">Ropa</option>
              <option value="technology">Tecnología</option>
              <option value="others">Otros</option>
            </select>
          </div>


          {/* Campos condicionales para Ropa */}
          {categoria === "clothes" && <ClothingFields category={selectedCategory} /> }

          {/* Campos condicionales para Tecnología */}
          {categoria === "technology" && <TechFields category={selectedCategory} /> }

          { categoria !== '' && <UploadProductImage /> }
        </div>
      </div>
    </form >
  );
};