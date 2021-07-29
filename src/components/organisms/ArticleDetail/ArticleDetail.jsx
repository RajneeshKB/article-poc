import { useEffect, useState } from "react";

import axios from "axios";

import { GET_ITEM_BY_ID } from "../../../contants/urls";
import ArticleCommentCard from "../../molecules/ArticleCommentCard/ArticleCommentCard";
import { articleContext } from "../../../contexts/article-list-context";

export const ArticleDetail = ({ articleList, id }) => {
  const [comments, setComments] = useState([]);
  const [selArticle, setSelArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id && articleList?.length) {
      const selectedArticle = articleList.filter(
        (article) => article.id === +id
      );

      setSelArticle(selectedArticle?.length ? selectedArticle[0] : null);
    }
  }, [id, articleList]);

  useEffect(() => {
    getArticleDetails();
    //eslint-disable-next-line
  }, [selArticle]);

  const getArticleDetails = async () => {
    console.log("sela1", selArticle);
    if (selArticle) {
      setIsLoading(true);
      const promiseList = [];
      selArticle?.kids?.forEach((kid) => {
        promiseList.push(getComment(kid));
      });
      try {
        const result = await Promise.all(promiseList);
        console.log("result sis", result);
        if (result?.length) {
          const updatedComments = result.map((val) => {
            return { id: val.data?.id, text: val.data?.text, by: val.data?.by };
          });
          setComments(updatedComments);
        }
      } catch (e) {
        console.log("error", e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getComment = async (id) => {
    const url = GET_ITEM_BY_ID.replace("{item-id}", id);
    return await axios.get(url, {
      baseURL: "https://hacker-news.firebaseio.com/v0",
    });
  };

  return (
    <ArticleCommentCard
      selArticle={selArticle}
      isLoading={isLoading}
      comments={comments}
    />
  );
};

const ArticleDetailContainer = ({
  match: {
    params: { id },
  },
}) => {
  return (
    <articleContext.Consumer>
      {(value) => <ArticleDetail articleList={value} id={id} />}
    </articleContext.Consumer>
  );
};

export default ArticleDetailContainer;
