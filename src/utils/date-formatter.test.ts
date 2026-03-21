import { dateFormatter } from "./date-formatter"


describe("dateFormatter", () => {

  it("should format ISO date to spanish date format", () => {
    const result = dateFormatter('2020-10-02T23:17:10.395+00:00');

    expect(result).toBe('2 de octubre de 2020')
  });

  test("should format another date correctly", () => {
    const result = dateFormatter("2023-01-15T10:00:00.000Z");
  
    expect(result).toBe("15 de enero de 2023");
  });

});