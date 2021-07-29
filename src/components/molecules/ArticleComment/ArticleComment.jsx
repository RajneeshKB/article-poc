import ReactMarkdown from "react-markdown";

const ArticleComment = ({ comment: { text, by } }) => {
  return (
    <div
      style={{ marginBottom: "15px", overflowWrap: "anywhere" }}
      data-testid="comment"
    >
      <li style={{ textAlign: "left" }}>
        <ReactMarkdown children={text}></ReactMarkdown>
      </li>
      <i style={{ color: "#ff00ff" }}>{by}</i>
    </div>
  );
};

export default ArticleComment;
