import { toast } from "react-toastify";
import type { Product } from "../../../interfaces/product";
import { useProductMutations } from "../../hooks/useProductMutations";
import { Loading } from "../../../components/ui/Loading";

interface Props {
  product: Product
}

export const ToggleActiveProduct = ({ product }: Props) => {
  const { createUpdateProductMutation } = useProductMutations();

  const handleToggleActive = (product: Product) => {

    const newActiveState = !product.isActive;
    const formData = new FormData();
    formData.append('isActive', JSON.stringify(newActiveState))

    createUpdateProductMutation.mutate({ product: formData, productId: product.id }, {
      onSuccess: () => {
        toast.success('Producto Actualizado');
      }
    })
  }

  return (
    <div className="flex justify-center items-center">
      {
        createUpdateProductMutation.isPending
        ? <Loading message="" width="w-4" height="h-4"/>
        : <button 
            type="button"
            disabled={createUpdateProductMutation.isPending}
            className={`relative h-5 w-10 flex items-center rounded-full transition-all duration-300 
              ${product.isActive ? 'bg-green-500' : 'bg-gray-300' } 
              ${createUpdateProductMutation.isPending ? 'opacity-50' : 'cursor-pointer'}`} 
            onClick={() => handleToggleActive(product)}>
            <span className={`w-3 h-3 block rounded-full transition-all duration-300 bg-white ${product.isActive ? 'translate-x-6' : 'translate-x-1'}`}></span>
          </button>
      }
    </div>
  )
}
