import React, { useRef } from "react";
import { Route } from "react-router-dom";
import { Layout } from "@components/layout";
import { Input } from "@components/commons";
import { SearchBrowse, SearchResult } from "@components/search";
import { useSearchParams } from "@hooks";
import styles from "./Search.module.css";

function Search() {
  const titleRef = useRef();
  const { setSearchParams } = useSearchParams();

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
    setSearchParams("title", titleRef.current.value, "/search/studyroom");
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
          <SearchBrowse />
        </Route>
        <Route path="/search/studyroom">
          <SearchResult />
        </Route>
      </div>
    </Layout>
  );
}

export default Search;
