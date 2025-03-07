import { paginate, getTotalPages } from "../pagination";

describe("paginate", () => {
  it("should return the correct paginated array for page 1", () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const result = paginate(array, 1, 3);
    expect(result).toEqual([1, 2, 3]);
  });

  it("should return the correct paginated array for page 2", () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const result = paginate(array, 2, 3);
    expect(result).toEqual([4, 5, 6]);
  });

  it("should return an empty array if the page is out of bounds", () => {
    const array = [1, 2, 3, 4, 5];
    const result = paginate(array, 3, 3);
    expect(result).toEqual([]);
  });

  it("should handle empty arrays", () => {
    const array = [];
    const result = paginate(array, 1, 3);
    expect(result).toEqual([]);
  });

  it("should use the default itemsPerPage if not provided", () => {
    const array = Array.from({ length: 50 }, (_, i) => i + 1);
    const result = paginate(array, 1);
    expect(result).toEqual(Array.from({ length: 20 }, (_, i) => i + 1));
  });
});

describe("getTotalPages", () => {
  it("should return the correct number of pages", () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const result = getTotalPages(array, 3);
    expect(result).toBe(4);
  });

  it("should return 1 page if the array is empty", () => {
    const array = [];
    const result = getTotalPages(array, 3);
    expect(result).toBe(0);
  });

  it("should use the default itemsPerPage if not provided", () => {
    const array = Array.from({ length: 50 }, (_, i) => i + 1);
    const result = getTotalPages(array);
    expect(result).toBe(3);
  });

  it("should handle cases where itemsPerPage is greater than the array length", () => {
    const array = [1, 2, 3, 4, 5];
    const result = getTotalPages(array, 10);
    expect(result).toBe(1);
  });
});