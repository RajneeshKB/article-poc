import { useEffect, useState } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import { GET_ITEM_BY_ID, SHOW_HN_STORIES } from "../../../contants/urls";
import ArticleDetail from "../../organisms/ArticleDetail/ArticleDetail";
import ArticleList from "../../organisms/ArticleList/ArticleList";
import { articleContext } from "../../../contexts/article-list-context";

import "./App.css";

const App = () => {
  const [topStories, setTopStories] = useState([]);
  const [storyList, setStoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTopStories();
  }, []);
  useEffect(() => {
    if (topStories?.length) {
      const promiseList = [];
      topStories.forEach((story) => {
        promiseList.push(getStoryDetails(story));
      });
      updateStoryList(promiseList);
    }
  }, [topStories]);

  const updateStoryList = async (promiseList) => {
    try {
      const result = await Promise.all(promiseList);
      const newStoryList = [];
      result?.forEach((story) => {
        if (story?.data?.title) {
          const { id, title, url, type, by, kids, descendants } = story.data;
          newStoryList.push({
            id: id,
            title: title || "",
            url: url || "",
            type: type || "",
            by: by || "",
            kids: descendants ? [...kids] : [],
          });
        }
      });
      setStoryList(newStoryList);
    } catch (e) {
      console.log("error", e);
    } finally {
      setIsLoading(false);
    }
  };
  const getStoryDetails = async (itemId) => {
    const URL = GET_ITEM_BY_ID.replace("{item-id}", itemId);
    return await axios.get(URL, {
      baseURL: "https://hacker-news.firebaseio.com/v0",
    });
  };
  const getTopStories = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(SHOW_HN_STORIES, {
        baseURL: "https://hacker-news.firebaseio.com/v0",
      });
      setTopStories(result?.data || []);
    } catch (e) {
      console.log("error", e);
      setIsLoading(false);
    }
  };
  return (
    <Router>
      <div className="app">
        <header className="app__header">
          <h2>Hacker News</h2>
        </header>
        <main className="app__main">
          {isLoading ? (
            <div className="loading">Loading...</div>
          ) : (
            <Switch>
              <articleContext.Provider value={storyList}>
                <Route path="/" exact component={ArticleList} />
                <Route path="/article/:id" component={ArticleDetail} />
              </articleContext.Provider>
            </Switch>
          )}
        </main>

        <footer className="app__footer">
          <p>Hackernews.com</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
