import { Link } from "react-router-dom";
import "./ArticleCard.css";

const ArticleCard = ({ id, title, by, type }) => {
  return (
    <article className="story-card" data-testid="hn-article">
      {/* <p>{type}</p> */}
      <Link to={`/article/${id}`}>
        <h4>{title}</h4>
      </Link>
      <p className="story-card__posted-by">
        Posted By: <i>{by}</i>
      </p>
    </article>
  );
};

export default ArticleCard;
