import { describe, it, expect } from "vitest";
import { mapComponent } from "../mapComponents";

const MockComponent = ({ children }) => <div>{children}</div>;

describe("mapComponent", () => {
  it("creates elements for each array item", () => {
    const items = [1, 2, 3];
    const result = mapComponent(items, MockComponent, "item");
    expect(result.length).toBe(3);
  });

  it("passes correct item prop", () => {
    const items = ["test"];
    const [element] = mapComponent(items, MockComponent, "item");
    expect(element.props.item).toBe("test");
  });

  it("passes additional props", () => {
    const items = ["test"];
    const [element] = mapComponent(items, MockComponent, "item", {
      className: "test-class",
    });
    expect(element.props.className).toBe("test-class");
  });

  it("returns empty array for empty input", () => {
    const result = mapComponent([], MockComponent, "item");
    expect(result).toEqual([]);
  });

  it("handles complex objects", () => {
    const items = [{ id: 1, name: "test" }];
    const [element] = mapComponent(items, MockComponent, "item");
    expect(element.props.item).toEqual(items[0]);
  });
});
