import { getColorLabel } from "./get-color-label"



describe("getColorLabel", () => {

  it("returns undefined if no colorId", () => {
    const result = getColorLabel("");

    expect(result).toBeUndefined();
  });

  it("returns color label if color exists", () => {
    const result = getColorLabel("red");

    expect(result).toBe('Rojo');
  });

});