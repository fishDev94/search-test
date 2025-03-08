import React, { type ReactElement, memo } from "react";
import { v4 as uuidv4 } from "uuid";

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
