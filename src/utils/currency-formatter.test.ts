import { currencyFormatters } from "./currency-formatter"

describe('Currency formater', () => {
  it("formats number to mexican format", () => {
    const result = currencyFormatters(1000);

    expect(result).toBe("1,000");
  });

  it("formats large numbers correctly", () => {
    const result = currencyFormatters(2500000);

    expect(result).toBe("2,500,000");
  });
})