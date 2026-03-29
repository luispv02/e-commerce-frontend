import { render, screen } from "@testing-library/react";
import { Products } from "./Products";
import { QueryClient, QueryClientProvider, type UseQueryResult} from "@tanstack/react-query";
import type { ApiError, ProductsResponse } from "../../../interfaces/product";
import type { AxiosError } from "axios";
import { MemoryRouter } from "react-router";
import type { Category } from "../../../interfaces/category";

jest.mock("../../../api/ecommerceApi"); 

describe("Products", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  const renderComponent = (customQuery?: Partial<UseQueryResult<ProductsResponse, AxiosError<ApiError>>>, category: Category = "all") => {

    const defaultQuery = {
      data: {
        ok: true,
        data: {
          products: [],
          pagination: { page: 1, limit: 10, totalPages: 1, totalProducts: 0 },
        },
      },
      isLoading: false,
      error: null,
    };

    const mockQuery = {
      ...defaultQuery,
      ...customQuery,
    } as unknown as UseQueryResult<ProductsResponse, AxiosError<ApiError>>;

    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Products productsQuery={mockQuery} category={category} />
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

  it("Shows loading when isLoading is true", () => {
    renderComponent({ isLoading: true });
    
    expect(screen.getByText("Cargando productos...")).toBeInTheDocument();
  });

  it("Displays message when there are no products", () => {
    renderComponent();

    expect(screen.getByText("No se encontraron productos")).toBeInTheDocument();
  });

  it("Render ProductList component when data is available", () => {
    const customQuery = {
      data: {
        ok: true,
        data: {
          products: [
            {
              id: "1",
              title: "Producto 01",
              category: "others" as const,
              price: 100,
              description: "Test product",
              stock: 10,
              isActive: true,
              images: [
                {
                  _id: "1",
                  url: "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767741109/ecommerce/products/vgr4web3w2vvmuyc9pjk.jpg",
                  public_id: "ecommerce/products/vgr4web3w2vvmuyc9pjk",
                },
              ],
            },
          ],
          pagination: { page: 1, limit: 10, totalPages: 1, totalProducts: 1 },
        },
      },
    };

    renderComponent(customQuery);
    expect(screen.getByText("Producto 01")).toBeInTheDocument();
  });

  it("Displays the correct subtitle according to the category", () => {

    const productsQueryMock = {
      data: {
        data: {
          products: [{id: 1, images: [{url: "https://res.cloudinary.com/.../playera.jpg"}], }],
          pagination: { page: 1, limit: 10, totalPages: 1, totalProducts: 1 },
        },
      }
    } as unknown as UseQueryResult<ProductsResponse, AxiosError<ApiError>>;

    renderComponent(productsQueryMock, "technology");
    expect(screen.getByText(/Productos de tecnología/i)).toBeInTheDocument();
  });
});
