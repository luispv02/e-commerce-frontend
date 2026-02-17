import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ApiError, ProductResponse, ProductsResponse, ProductValidationError } from '../../interfaces/product'
import type { AxiosError } from 'axios'
import { createUpdateProduct, deleteProduct } from '../actions/products.action'
import { toast } from 'react-toastify'

export const useProductMutations = () => {

  const queryClient = useQueryClient();

  const updateProductsCache = (delta: number) => {

    queryClient.setQueriesData<ProductsResponse>(
      { queryKey: ['products', 'admin'] },
      (oldData) => {
        if (!oldData) return oldData;
        const pagination = oldData.data.pagination;

        const newTotalProducts = pagination.totalProducts + delta;
        const newTotalPages = Math.ceil(newTotalProducts / pagination.limit);

        return {
          ...oldData,
          data: {
            ...oldData.data,
            pagination: {
              ...pagination,
              totalProducts: newTotalProducts,
              totalPages: newTotalPages,
            },
          }
        }
      }
    )
  };

  const createUpdateProductMutation = useMutation<ProductResponse, AxiosError<ApiError>, { product: FormData, productId: string }>({
    mutationFn: createUpdateProduct,
    onSuccess: (data, { productId }) => {

      const isNewProduct = productId === '';
      if(isNewProduct) updateProductsCache(+1);

      queryClient.invalidateQueries({ queryKey: ['products', 'admin'] })
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
      updateProductsCache(-1)
      queryClient.invalidateQueries({ queryKey: ['products', 'admin'] })
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

