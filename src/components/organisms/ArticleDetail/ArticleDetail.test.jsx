import { render, screen } from "@testing-library/react";
import {
  MOCK_ARTICLE_DETAIL,
  MOCK_STORY_DETAILS,
} from "../../../mocks/mock-data";
import { ArticleDetail } from "./ArticleDetail";

jest.mock("axios", () => ({
  get: (url) => {
    return Promise.resolve(MOCK_ARTICLE_DETAIL);
  },
}));

describe("Article detail view", () => {
  test("should", async () => {
    Promise.all = jest.fn().mockImplementationOnce(() => {
      return Promise.resolve([{ data: MOCK_ARTICLE_DETAIL }]);
    });
    render(<ArticleDetail articleList={MOCK_STORY_DETAILS} id="2" />);
    const loadingEle = screen.getByText(/Loading.../i);
    expect(loadingEle).toBeInTheDocument();
    expect(await screen.findByTestId("comment")).toBeInTheDocument();
  });
});
