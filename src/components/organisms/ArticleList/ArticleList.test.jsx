import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { MOCK_STORY_DETAILS } from "../../../mocks/mock-data";
import { ArticleList } from "./ArticleList";

describe("Article List View", () => {
  test("should display articles", () => {
    render(
      <Router>
        <ArticleList stories={MOCK_STORY_DETAILS} />
      </Router>
    );
    const article = screen.getAllByTestId("hn-article");
    expect(article).toHaveLength(2);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
  });
});
