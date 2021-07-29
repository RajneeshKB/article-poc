import { articleContext } from "../../../contexts/article-list-context";
import Article from "../../molecules/ArticleCard/ArticleCard";

import "./ArticleList.css";

export const ArticleList = ({ stories }) => {
  const renderList = () => {
    return stories.map((props) => {
      return <Article {...props} key={`article_${props.id}`} />;
    });
  };
  return <section className="card-container">{renderList()}</section>;
};

const ArticleListContainer = () => {
  return (
    <articleContext.Consumer>
      {(value) => <ArticleList stories={value} />}
    </articleContext.Consumer>
  );
};

export default ArticleListContainer;
