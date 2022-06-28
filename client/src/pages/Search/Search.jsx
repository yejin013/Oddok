import React, { useRef } from "react";
import { Route, useHistory } from "react-router-dom";
import { Layout } from "@components/layout";
import { Input } from "@components/commons";
import { SearchBrowse, SearchResult } from "@components/search";
import styles from "./Search.module.css";

function Search() {
  const history = useHistory();
  const titleRef = useRef();

  // localStorage에 저장되어있는 검색기록을 업데이트한다.
  const updateSearchHistory = (item) => {
    const keywords = JSON.parse(localStorage.getItem("keywords"));
    if (keywords) {
      localStorage.setItem("keywords", JSON.stringify([...keywords, item]));
    }
  };

  // 타이틀 입력으로 검색
  const searchTitleHandler = (e) => {
    e.preventDefault();
    updateSearchHistory({ key: new Date(), text: titleRef.current.value }); // 최근 검색어 추가
    history.push({
      pathname: "/search/studyroom",
      search: `?title=${titleRef.current.value}`,
    });
  };

  // 인기 해시태그 클릭으로 검색
  const searchHashtagHandler = (e) => {
    titleRef.current.value = "";
    history.push({
      pathname: "/search/studyroom",
      search: `?hashtag=${e.target.value}`,
    });
  };

  // 검색기록으로 타이틀 검색
  const searchKeywordHandler = (text) => {
    history.push({
      pathname: "/search/studyroom",
      search: `?title=${text}`,
    });
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.title_input}>
          <form onSubmit={searchTitleHandler}>
            <Input ref={titleRef} />
          </form>
        </div>
        <Route exact path="/search">
          <SearchBrowse searchHashtagHandler={searchHashtagHandler} searchKeywordHandler={searchKeywordHandler} />
        </Route>
        <Route path="/search/studyroom">
          <SearchResult />
        </Route>
      </div>
    </Layout>
  );
}

export default Search;
