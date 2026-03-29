import { ProductCard } from "./ProductCard";
import { render, screen } from "@testing-library/react";
import type { Product } from "../../../interfaces/product";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { currencyFormatters } from "../../../utils/currency-formatter";
import userEvent from "@testing-library/user-event";


const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

const mockUseAuthStore = jest.fn();
jest.mock("../../../auth/store/auth.store", () => ({
  useAuthStore: (selector: (state: { role: string }) => string) => mockUseAuthStore(selector),
}));

jest.mock("../../../api/ecommerceApi"); 

describe('ProductCart', () => {

  const product: Product = {
    title: "Camisa casual manga larga slim fit",
    price: 1499,
    description: "Camisa slim fit casual.",
    stock: 5,
    category: "clothes",
    images: [
      {
        url: "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767741109/ecommerce/products/vgr4web3w2vvmuyc9pjk.jpg",
        public_id: "ecommerce/products/vgr4web3w2vvmuyc9pjk",
        _id: "695d96b67a178b1b58c80d4a",
      }, 
      {
        url: "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767741109/ecommerce/products/exkx62ptd72farn9dbef.jpg",
        public_id: "ecommerce/products/exkx62ptd72farn9dbef",
        _id: "695d96b67a178b1b58c80d4b",
      },
    ],
    sizes: ["m", "l", "xl", "xxl"],
    gender: "men",
    colors: ["blue", "white"],
    type: "shirts",
    isActive: true,
    id: "695d96b67a178b1b58c80d49",
  };

  // const product: Product = {
  //   title: "Samsung Galaxy S23",
  //   price: 15999,
  //   description: "Teléfono Android con pantalla AMOLED y excelente cámara.",
  //   stock: 7,
  //   category: "technology",
  //   images: [
  //     {
  //       url: "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767742611/ecommerce/products/uqvq2ufhpfq2im6lh9ht.jpg",
  //       public_id: "ecommerce/products/uqvq2ufhpfq2im6lh9ht",
  //       _id: "695d9c957a178b1b58c80d81",
  //     },
  //     {
  //       url: "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767742612/ecommerce/products/zz335dmwmxvfjniqm4xb.jpg",
  //       public_id: "ecommerce/products/zz335dmwmxvfjniqm4xb",
  //       _id: "695d9c957a178b1b58c80d82",
  //     },
  //     {
  //       url: "https://res.cloudinary.com/dtz2cdzjp/image/upload/v1767742611/ecommerce/products/a15ybnt0o0di0i400sxm.jpg",
  //       public_id: "ecommerce/products/a15ybnt0o0di0i400sxm",
  //       _id: "695d9c957a178b1b58c80d83",
  //     },
  //   ],
  //   brand: "samsung",
  //   type: "smartphones",
  //   isActive: true,
  //   id: "695d9c957a178b1b58c80d80",
  // };


  let queryClient: QueryClient;
  
  beforeEach(() => {
    queryClient = new QueryClient();
    mockNavigate.mockClear();
    mockUseAuthStore.mockImplementation((selector: (state: { role: string }) => string) =>
      selector({ role: "user" })
    );
  });

  const renderComponent = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ProductCard product={product} />
        </MemoryRouter>
      </QueryClientProvider>
    );
  };


  it("Render the product title in an h2 heading", () => {
    renderComponent();

    const heading = screen.getByRole('heading', { level: 2, name: product.title });
    expect(heading).toBeInTheDocument();
  });

  it("Display the product price in the correct format", () => {
    renderComponent();

    const formattedPrice = currencyFormatters(product.price);
    expect(screen.getByText(`$ ${formattedPrice}`)).toBeInTheDocument();
  });

  it("Display the product image with the alt tag and optimized URL", () => {
    renderComponent();

    const productImg = screen.getByRole('img', { name: product.title });
    expect(productImg).toBeInTheDocument();
    expect(productImg).toHaveAttribute('src', expect.stringContaining('/upload/f_auto,q_auto,w_400/'));
  });

  it("Navigate to the product details view by clicking on the card", async () => {
    renderComponent();
  
    const productCard = screen.getByRole('article');
    await userEvent.click(productCard);
  
    expect(mockNavigate).toHaveBeenCalledWith(`/product/${product.id}`);
  });

  it("Hide Add to Cart button when the user is admin", () => {
    mockUseAuthStore.mockImplementation((selector: (state: { role: string }) => string) =>
      selector({ role: "admin" })
    );
  
    renderComponent();
  
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it("Shows Add to Cart button when user is not admin", () => {
    mockUseAuthStore.mockImplementation((selector) =>
      selector({ role: "user" })
    );
  
    renderComponent();
  
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
})