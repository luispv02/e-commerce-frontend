import { render, screen } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { ProductDetails } from "./ProductDetails";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Product } from "../../../interfaces/product";
import { useProduct } from "../../hooks/products/useProduct";
import { currencyFormatters } from "../../../utils/currency-formatter";

// Mock use navigate
const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

// Mock ecommerceApi
jest.mock("../../../api/ecommerceApi"); 

// Mock swiper(slider)
jest.mock('swiper/react', () => ({
  Swiper: ({ children }: PropsWithChildren) => <div>{children}</div>,
  SwiperSlide: ({ children }: PropsWithChildren) => <div>{children}</div>,
}));

// Mock hook useProduct
jest.mock("../../hooks/products/useProduct");

// Mock ProductImageCarousel Component 
jest.mock("./ProductImageCarousel", () => ({
  ProductImageCarousel: () => <div data-testid="product-image-carousel" />,
}));

// Mock useAuthStore
const mockUseAuthStore = jest.fn();
jest.mock("../../../auth/store/auth.store", () => ({
  useAuthStore: (selector: (state: { role: string }) => string) => mockUseAuthStore(selector),
}));


describe("ProductDetails", () => {

  const product: Product = {
    title: "Camisa casual manga larga slim fit",
    price: 499,
    description: "Camisa slim fit casual.",
    stock: 5,
    category: "clothes",
    images: [
      {
        url: "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767741109/ecommerce/products/vgr4web3w2vvmuyc9pjk.jpg",
        publicId: "ecommerce/products/vgr4web3w2vvmuyc9pjk",
        id: "695d96b67a178b1b58c80d4a",
      },
      {
        url: "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767741109/ecommerce/products/exkx62ptd72farn9dbef.jpg",
        publicId: "ecommerce/products/exkx62ptd72farn9dbef",
        id: "695d96b67a178b1b58c80d4b",
      },
    ],
    sizes: ["m", "l", "xl", "xxl"],
    gender: "men",
    colors: ["blue", "white"],
    type: "shirts",
    isActive: true,
    id: "695d96b67a178b1b58c80d49",
  };

  let queryClient: QueryClient;
  
  beforeEach(() => {
    queryClient = new QueryClient();
    mockNavigate.mockClear();
    mockUseAuthStore.mockImplementation((selector: (state: { role: string }) => string) =>
      selector({ role: "user" })
    );
    (useProduct as jest.Mock).mockReturnValue({
      data: { ok: true, product: product },
      isLoading: false,
      error: null,
    });

  });

  const renderComponent = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ProductDetails />
        </MemoryRouter>
      </QueryClientProvider>
    )
  };

  it("Render the product title in an h1 heading", () => {
    renderComponent();

    const heading = screen.getByRole('heading', { level: 1, name: product.title });
    expect(heading).toBeInTheDocument();
  });

  it("Display the product price in the correct format", () => {
    renderComponent();

    const formattedPrice = currencyFormatters(product.price);
    expect(screen.getByText(`$ ${formattedPrice}`)).toBeInTheDocument();
  });

  it("Render ProductImageCarousel if there are images", () => {
    renderComponent();
    expect(screen.getByTestId('product-image-carousel')).toBeInTheDocument();
  });

  it("ProductImageCarousel is not rendered when there are no images", () => {
    (useProduct as jest.Mock).mockReturnValue({
      data: {
        ok: true,
        product: { ...product, images: [] },
      },
      isLoading: false,
      error: null,
    });
    
    renderComponent();
    expect(screen.queryByTestId('product-image-carousel')).not.toBeInTheDocument();
  });

  it("Hide Add to Cart button when the user is admin", () => {
    mockUseAuthStore.mockImplementation((selector: (state: { role: string }) => string) =>
      selector({ role: "admin" })
    );
  
    renderComponent();
    expect(screen.queryByTestId('add-to-cart')).not.toBeInTheDocument();
  });

  it("Shows Add to Cart button when user is not admin", () => {
    mockUseAuthStore.mockImplementation((selector) =>
      selector({ role: "user" })
    );
  
    renderComponent();
  
    expect(screen.getByTestId('add-to-cart')).toBeInTheDocument();
  });
})