import { render, screen } from "@testing-library/react";
import type { Product } from "../../../interfaces/product";
import { AddToCartButton } from "./AddToCartButton";
import userEvent from "@testing-library/user-event";


describe("AddToCartButton", () => {

  const product: Product = {
    title: "Camisa casual manga larga slim fit",
    price: 1499,
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

  let mockFunction = jest.fn();

  beforeEach(() => {
    mockFunction = jest.fn();
  });


  it("Render button to add to cart", () => {
    render(
      <AddToCartButton product={product} onAddProduct={mockFunction} disabled={false} />
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it("Displays the text 'Agregar al Carrito' when stock is available.", () => {
    render(
      <AddToCartButton product={product} onAddProduct={mockFunction} disabled={false} />
    );

    expect(screen.getByRole('button')).toHaveTextContent('Agregar al Carrito');
  });

  it("Displays the text 'Producto sin stock' when there is no stock available.", () => {
    render(
      <AddToCartButton product={{...product, stock: 0}} onAddProduct={mockFunction} disabled={false} />
    );

    expect(screen.getByRole('button')).toHaveTextContent('Producto sin stock');
  });

  it("Disable the button when disabled is true", () => {
    render(
      <AddToCartButton product={product} onAddProduct={mockFunction} disabled={true} />
    );

    expect(screen.getByRole('button')).toBeDisabled()
  });

  it("Disable the button when loading is true", () => {
    render(
      <AddToCartButton product={product} onAddProduct={mockFunction} disabled={false} loading={true} />
    );

    expect(screen.getByRole('button')).toBeDisabled()
  });

  it("Show spinner when loading is true", () => {
    render(
      <AddToCartButton product={product} onAddProduct={mockFunction} disabled={false} loading={true} />
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it("Call the onAddProduct function when adding a product to the cart", async() => {
    render(
      <AddToCartButton product={product} onAddProduct={mockFunction} disabled={false} />
    );

    await userEvent.click(screen.getByRole('button'));
    expect(mockFunction).toHaveBeenCalledTimes(1);
  })
})