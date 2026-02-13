import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ApiError, ProductResponse, ProductValidationError } from '../../interfaces/product'
import type { AxiosError } from 'axios'
import { createUpdateProduct, deleteProduct } from '../actions/products.action'
import { toast } from 'react-toastify'

export const useProductMutations = () => {

  const queryClient = useQueryClient();

  const createUpdateProductMutation = useMutation<ProductResponse, AxiosError<ApiError>, { product: FormData, productId: string }>({
    mutationFn: createUpdateProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products', 'admin'], refetchType: "all" })
      queryClient.invalidateQueries({ queryKey: ['product', 'admin', data.product.id] })
    },
    onError: (error) => {
      const data = error.response?.data;

      let msgError = '';
      if(data && 'errors' in data){
        const errors: ProductValidationError[] = data.errors as ProductValidationError[];
        msgError = errors.map(err => `- ${err.msg}`).join(' ')
      }

      toast.error(msgError || data?.msg || 'Error al crear producto');
    }
  })


  const deleteProductMutation = useMutation<ProductResponse, AxiosError<ApiError>, string>({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', 'admin'], refetchType: 'all' })
      toast.success('Producto eliminado')
    },
    onError: (error) => {
      toast.error(error.response?.data.msg || 'Error al eliminar producto.')
    }
  })

  return {
    deleteProductMutation,
    createUpdateProductMutation
  }

}

