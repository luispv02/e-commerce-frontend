import { FaRegSave } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router";
import { ClothingFields } from "./ClothingFields";
import { TechFields } from "./TechFields";
import { UploadProductImage } from "./UploadProductImage";
import type { Filter } from "../../../interfaces/filters";
import { clothesFilters } from "../../../data/filters/clothes-filters";
import { technologyFilters } from "../../../data/filters/technology-filters";
import type { ProductCategory, Product, NewProduct, ProductFormValues, } from "../../../interfaces/product";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Loading } from "../../../components/ui/Loading";
import { FiTrash2 } from "react-icons/fi";
import { Modal } from "../../../components/ui/Modal";
import { useProductMutations } from "../../hooks/useProductMutations";
interface Props {
  title: string;
  subTitle: string;
  product: Product | NewProduct;
  onSubmit: (product: ProductFormValues) => void;
  isPending: boolean;
}

export const ProductForm = ({ title, subTitle, product, onSubmit, isPending }: Props) => {

  const navigate = useNavigate();
  const { deleteProductMutation } = useProductMutations()
  const { register, handleSubmit, formState: { errors }, watch, setValue, clearErrors, getValues } = useForm<ProductFormValues>({
    defaultValues: product,
    shouldUnregister: true,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedCategory = watch("category");
  const categoryFilters: Record<ProductCategory, Filter[]> = {
    clothes: clothesFilters,
    technology: technologyFilters,
    others: [],
  };
  const filtersSelectedCategory = categoryFilters[selectedCategory as ProductCategory] || [];

  useEffect(() => {
    if (!selectedCategory || product.id !== 'new') return

    if (selectedCategory === 'clothes') {
      setValue("sizes", []);
      setValue("gender", '');
      setValue("colors", []);
      setValue("type", '');
    }
    if (selectedCategory === 'technology') {
      setValue("brand", '');
      setValue("type", '');
    }
    clearErrors()
  }, [selectedCategory, setValue, clearErrors, product.id])

  const handleDelete = () => {
    if(!product?.id) return;

    deleteProductMutation.mutate(product.id, {
      onSuccess: () => {
        setIsModalOpen(false);
        navigate(-1)
      }
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {
          isPending 
          ? <div className="flex justify-end"><Loading message="" width="w-6" height="h-6"/></div>
          : <div className="flex justify-end items-center">
              <div className="flex gap-3">

                {
                  product.id !== 'new' && 
                  <button type="button" className="w-8 h-8 md:w-full px-2 border border-red-300 bg-red-500 text-white cursor-pointer shadow flex justify-center items-center rounded hover:bg-red-700 transition gap-2" onClick={() => setIsModalOpen(true)}>
                    <FiTrash2 className="text-xl" />
                    <span className="hidden md:block">Eliminar</span>
                  </button>
                }

                <button type="button" onClick={() => navigate(-1)} className="w-8 h-8 md:w-full px-2 border border-gray-300 bg-white shadow cursor-pointer flex justify-center items-center rounded hover:bg-gray-100 transition gap-2">
                  <IoMdClose className="text-xl" />
                  <span className="hidden md:block">Cancelar</span>
                </button>

                <button type="submit" className="w-8 h-8 md:w-full px-2 border border-gray-800 bg-gray-900 text-white cursor-pointer shadow flex justify-center items-center rounded hover:bg-gray-700 transition gap-2">
                  <FaRegSave className="text-xl" />
                  <span className="hidden md:block">Guardar</span>
                </button>
              </div>
            </div>
        }

        <div className="mt-4">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600">{subTitle}</p>
        </div>

        <div className={`mt-6 bg-white border border-gray-200 rounded-lg shadow-sm p-4 md:p-6 ${ isPending ? 'opacity-60 pointer-events-none' : ''}`}>
          <div className="space-y-6">

            <div className="title">
              <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
                Título del producto
              </label>
              <input
                type="text"
                {...register('title', { required: true })}
                className={`w-full px-3 py-2 border text-sm border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300 ${errors.title ? 'border-red-500' : ''}`}
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
                    {...register('price', { required: true, min: 1 })}
                    className={`w-full pl-7 pr-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300 ${errors.price ? 'border-red-400' : ''}`}
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
                  {...register('stock', { required: true, min: 0 })}
                  min="0"
                  className={`w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300 ${errors.stock ? 'border-red-400' : ''}`}
                  placeholder="Stock del producto"
                />
              </div>
            </div>

            <div className="description">
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                {...register('description', { required: true })}
                rows={5}
                className={`w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300 resize-none ${errors.description ? 'border-red-400' : ''}`}
                placeholder="Descripción del producto"
              />
              
            </div>

            <div className="category">
              <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
                Categoría
              </label>

              <select
                {...register('category', { required: true })}
                className={`w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300 ${errors.category ? 'border-red-400' : ''} disabled:bg-gray-100 disabled:text-gray-500 `}
                disabled={product.id !== 'new'}
              >
                <option value="" disabled>Selecciona una categoria</option>
                <option value="clothes">Ropa</option>
                <option value="technology">Tecnología</option>
                <option value="others">Otros</option>
              </select>
            </div>

            {selectedCategory === "clothes" && <ClothingFields category={filtersSelectedCategory} register={register} setValue={setValue} watch={watch} errors={errors} />}

            {selectedCategory === "technology" && <TechFields category={filtersSelectedCategory} register={register} errors={errors} />}

            {selectedCategory && <UploadProductImage register={register} setValue={setValue} watch={watch} errors={errors} getValues={getValues} />}
          </div>
        </div>
      </form>
      
      <Modal title="¿Quieres eliminar este producto?" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="">
          <p className="text-center text-sm">{product.title}</p>
          <p className="text-xs text-center">{product.id}</p>

          {
            deleteProductMutation.isPending 
            ? <Loading message="Eliminando producto..." width="w-6" height="h-6" spinMargin="my-4"/>
            : <div className="flex justify-center gap-3 mt-8">
                <button className="bg-red-500 text-white  border-red-600 border text-sm py-1 px-2 rounded cursor-pointer hover:bg-red-600 hover:text-white transition" onClick={handleDelete}>Eliminar</button>
                <button className="border text-sm py-1 px-2 rounded cursor-pointer hover:bg-black hover:text-white transition" onClick={() => setIsModalOpen(false)}>Cancelar</button>
              </div>
          }
        </div>
      </Modal>
    </>
  );
};