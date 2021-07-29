import ArticleComment from "../ArticleComment/ArticleComment";

import "./ArticleCommentCard.css";

const ArticleCommentCard = ({ selArticle, isLoading, comments }) => {
  const renderComments = () => {
    return comments.map((comment) => {
      return <ArticleComment comment={comment} key={comment.id} />;
    });
  };
  return (
    <div className="article-detail-container">
      <div className="article-detail-container__article-head">
        <h4>{selArticle?.title}</h4>
        <i>{selArticle?.by}</i>
      </div>
      <p>
        <u>Comments</u>
      </p>
      <ul className="article-detail-container__comment-container">
        {isLoading ? (
          <div className="align-center">Loading...</div>
        ) : comments?.length ? (
          renderComments()
        ) : (
          <div className="align-center">No comment yet</div>
        )}
      </ul>
    </div>
  );
};

export default ArticleCommentCard;
