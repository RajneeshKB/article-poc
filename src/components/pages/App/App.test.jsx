import { render, screen } from "@testing-library/react";
import App from "./App";
import { MOCK_STORY_DETAILS, MOCK_STORY_IDS } from "../../../mocks/mock-data";
jest.mock("axios", () => ({
  get: (url) => {
    switch (url) {
      case "/showstories.json":
        return Promise.resolve({ data: MOCK_STORY_IDS });
      case "/item/1.json":
        return Promise.resolve({ data: MOCK_STORY_DETAILS[0] });
      default:
        break;
    }
  },
}));

describe("App", () => {
  test("renders header element", async () => {
    render(<App />);
    const headingElement = screen.getByText(/Hacker News/i);
    await screen.findByText(/Loading.../);
    expect(headingElement).toBeInTheDocument();
  });

  test("renders footer element", async () => {
    render(<App />);
    const footerElement = screen.getByText(/Hackernews.com/i);
    await screen.findByText(/Loading.../);
    expect(footerElement).toBeInTheDocument();
  });

  test("renders loading while fetching articles", async () => {
    render(<App />);
    const loaderElement = screen.getByText(/Loading.../i);
    expect(loaderElement).toBeInTheDocument();
    expect(await screen.findByText(/Loading.../i)).not.toBeInTheDocument();
  });

  test("renders articles after fetching from server", async () => {
    Promise.all = jest
      .fn()
      .mockImplementationOnce(() =>
        Promise.resolve([
          { data: MOCK_STORY_DETAILS[0] },
          { data: MOCK_STORY_DETAILS[1] },
        ])
      );
    render(<App />);
    const article = await screen.findAllByTestId("hn-article");
    expect(article).toHaveLength(2);
  });
});
