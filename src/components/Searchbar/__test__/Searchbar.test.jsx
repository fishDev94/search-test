import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Searchbar from "../Searchbar";

vi.mock("../../hook/useSearchContacts", () => ({
  default: vi.fn(() => ({ data: [] })),
}));

vi.mock("../SearchResults/SearchResults", () => ({
  default: () => <div data-testid="search-results" />,
}));

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("Searchbar", () => {
  const mockProps = {
    value: "",
    handleSearch: vi.fn(),
    onSumbit: vi.fn(),
    onClear: vi.fn(),
  };

  it("matches snapshot", () => {
    const { container } = render(<Searchbar {...mockProps} />, { wrapper });
    expect(container).toMatchSnapshot();
  });

  it("updates input value", () => {
    const { container } = render(<Searchbar {...mockProps} />, { wrapper });
    const input = container.querySelector("input");

    fireEvent.input(input, { target: { value: "test" } });
    expect(mockProps.handleSearch).toHaveBeenCalledWith("test");
  });

  it("shows clear button with value", () => {
    const { getByTestId } = render(<Searchbar {...mockProps} value="test" />, {
      wrapper,
    });

    const clearButton = getByTestId("clear-button");
    expect(clearButton).toBeTruthy();
    expect(clearButton.textContent).toBe("clear");
  });

  it("enables button after 3 chars", () => {
    const { container, rerender } = render(
      <Searchbar {...mockProps} value="12" />,
      { wrapper }
    );
    const button = container.querySelector("button");
    expect(button.disabled).toBe(true);

    rerender(<Searchbar {...mockProps} value="123" />, { wrapper });
    expect(button.disabled).toBe(false);
  });
});
