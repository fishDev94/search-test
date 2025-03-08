import { render, screen } from "@testing-library/react";
import ResultList from "../ResultList";

describe("ResultList", () => {
  const mockData = [
    {
      id: 1,
      name: "User-test-1",
      body: "Comment 1",
      email: "test-mail@mail.com",
    },
    {
      id: 2,
      name: "User-test-2",
      body: "Comment 2",
      email: "test-mail@mail.com",
    },
  ];

  it("matches snapshot with data", () => {
    const { container } = render(<ResultList data={mockData} />);
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot without data", () => {
    const { container } = render(<ResultList />);
    expect(container).toMatchSnapshot();
  });

  it("renders paginator and cards when data is provided", () => {
    render(<ResultList data={mockData} />);

    const paginatorText = screen.getByText(/Page 1 of/i);
    expect(paginatorText).to.exist;

    const comment1 = screen.getByText("Comment 1");
    const comment2 = screen.getByText("Comment 2");
    expect(comment1).to.exist;
    expect(comment2).to.exist;
  });

  it("renders no cards when data is empty", () => {
    render(<ResultList data={[]} />);

    const comment1 = screen.queryByText("Comment 1");
    const comment2 = screen.queryByText("Comment 2");
    expect(comment1).to.not.exist;
    expect(comment2).to.not.exist;
  });
});
