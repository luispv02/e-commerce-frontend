import ecommerceApi from "../../api/ecommerceApi";
import { getProductById, getProducts } from "./get-products.action";

jest.mock("../../api/ecommerceApi", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

const mockGet = ecommerceApi.get as jest.MockedFunction<typeof ecommerceApi.get>;

beforeEach(() => {
  jest.clearAllMocks();
});

// Test getProducts
describe("getProducts", () => {
  it("Filters the falsy values ​​of the filters", async () => {
    const filters = {
      q: "Camisas",
      price: "",
      category: "",
      page: 1,
      order: undefined,
    };

    mockGet.mockResolvedValue({ data: [] });

    await getProducts(filters);
    expect(ecommerceApi.get).toHaveBeenCalledWith("/products", {
      params: { q: "Camisas", page: 1 },
    });
  });

  it("Return the response data correctly", async () => {
    const mockResponse = { data: { products: [ { id: "123", title: "Playera casual", price: 150 } ]} };

    mockGet.mockResolvedValue(mockResponse);

    const result = await getProducts({ category: "all", price: "100-150", page: 1 });

    expect(result).toEqual(mockResponse.data);
  });

  it("Throws an error if the API fails", async() => {
    mockGet.mockRejectedValue(new Error("Network Error"));
    await expect(getProducts({category: "all", page: 1})).rejects.toThrow("Network Error");
  })
});


// Test getProductById
describe('getProductById', () => {
  it("Call the API with the correct productId", async() => {
    const productId = "123";
    mockGet.mockResolvedValue({ data: { id: productId, title: "Laptop" } });

    await getProductById(productId);
    expect(mockGet).toHaveBeenCalledWith(`/products/${productId}`);
  });

  it("Returns the data in the response", async() => {
    const productId = "123";
    const mockResponse = { data: { id: productId, title: "Laptop" } };

    mockGet.mockResolvedValue(mockResponse);

    const result = await getProductById(productId);
    expect(result).toEqual(mockResponse.data);
  });

  it("Throws an error if the API fails", async () => {
    mockGet.mockRejectedValue(new Error("Network Error"));
    await expect(getProductById("123")).rejects.toThrow("Network Error");
  });
})
