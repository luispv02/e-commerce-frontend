
import { render, screen } from "@testing-library/react";
import { useProducts } from "../hooks/products/useProducts";
import { HomePage } from "./HomePage";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("../hooks/products/useProducts.ts");

jest.mock("../../api/ecommerceApi"); 

describe("HomePage", () => {
  let queryClient: QueryClient
  
  beforeEach(() => {
    queryClient = new QueryClient();
  });

  const renderComponent = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </QueryClientProvider>
    )
  };

  it("Shows the loading screen on initial load", () => {
    
    (useProducts as jest.Mock).mockReturnValue({
      productsQuery: {
        data: null,
        isLoading: true,
        error: null
      }
    });

    renderComponent();
    expect(screen.getByText("Cargando productos...")).toBeInTheDocument();
  });

  it("Display an error message if the API call fails", () => {

    (useProducts as jest.Mock).mockReturnValue({
      productsQuery: {
        data: null,
        isLoading: false,
        error: {
          response: {
            data: { msg: "Error de prueba" }
          }
        },
      }
    });

    renderComponent();

    expect(screen.getByText("Error de prueba")).toBeInTheDocument();
  });

  it("Displays the Categories, Filters, and Products components when the data is obtained correctly", async() => {
    (useProducts as jest.Mock).mockReturnValue({
      productsQuery: {
        data: {
          data: {
            products: [
              { id: "1", title: "Playera", category: "clothes", sizes:['s','m'], images: [{url: 'https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767741109/ecommerce/products/vgr4web3w2vvmuyc9pjk.jpg'}] },
              { id: "2", title: "Computadora", category: "technology", images: [{url: 'https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767741109/ecommerce/products/vgr4web3w2vvmuyc9pjk.jpg'}] }
            ],
            pagination: {}
          }
        },
        isLoading: false,
        error: null,
        isSuccess: true,
      }
    });

    renderComponent();

    // Verify that there is no loading or error message.
    expect(screen.queryByText(/Cargando productos.../i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Error/i)).not.toBeInTheDocument();

    // Rendering <Categories /> component
    const buttonCategoryClothing = await screen.findByRole('button', { name: /Ropa/i });
    expect(buttonCategoryClothing).toBeInTheDocument();

    const buttonCategoryTech = await screen.findByRole('button', { name: /Tecnología/i });
    expect(buttonCategoryTech).toBeInTheDocument();

    // Rendering <Filters /> component
    const filtersSection = screen.getByTestId('filters');
    expect(filtersSection).toBeInTheDocument();

    // Rendering <Products /> component
    expect(screen.getByText("Playera")).toBeInTheDocument();
    expect(screen.getByText("Computadora")).toBeInTheDocument();
  });
});
