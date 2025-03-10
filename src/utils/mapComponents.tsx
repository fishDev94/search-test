import React, { type ReactElement, memo } from "react";
import { v4 as uuidv4 } from "uuid";

/**
 * Maps an array of items to React components, dynamically applying props and optionally passing children.
 *
 * @template T - The type of items in the array.
 * @param {T[]} array - The array of items to map.
 * @param {React.ElementType} Component - The React component to render for each item in the array.
 * @param {string} propName - The name of the prop to pass to the component for each item.
 * @param {Record<string, unknown>} [props] - Additional props to pass to the component.
 * @param {React.ReactNode} [children] - Optional children to pass to the component.
 * @returns {React.ReactElement[]} - An array of React elements.
 *
 * @throws Will log an error to the console if:
 * - The `array` is invalid or not an array.
 * - The `Component` is invalid or not a function.
 * - The `propName` is invalid or not a string.
 *
 * @example
 * const items = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
 * const ItemComponent = ({ item }) => <div>{item.name}</div>;
 * const mappedComponents = mapComponent(items, ItemComponent, 'item');
 */
export function mapComponent<T>(
  array: T[],
  Component: React.ElementType,
  propName: string,
  props?: Record<string, unknown>,
  children?: React.ReactNode
): ReactElement[] {
  if (!array || !Array.isArray(array)) {
    console.error("Invalid array provided to mapComponent");
    return [];
  }

  if (!Component || typeof Component !== "function") {
    console.error("Invalid Component provided to mapComponent");
    return [];
  }

  if (!propName || typeof propName !== "string") {
    console.error("Invalid propName provided to mapComponent");
    return [];
  }

  const MemoizedComponent = memo(Component);

  return array.map((item) => {
    const dynamicProps = { ...props, [propName]: item };
    return (
      <MemoizedComponent key={uuidv4()} {...dynamicProps}>
        {children}
      </MemoizedComponent>
    );
  });
}
