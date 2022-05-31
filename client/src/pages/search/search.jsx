/* eslint-disable react/jsx-boolean-value */
import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Layout } from "@components/layout";
import { Input } from "@components/commons";
import { SearchBrowse, SearchResult } from "@components/search";
import styles from "./Search.module.css";

function Search() {
  const history = useHistory();
  const titleRef = useRef();
  const [searched, setSearched] = useState({ title: undefined, hashtag: undefined });

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
    setSearched({ title: titleRef.current.value, hashtag: "" });
    updateSearchHistory({ key: new Date(), text: titleRef.current.value }); // 최근 검색어 추가
  };

  // 인기 해시태그 클릭으로 검색
  const searchHashtagHandler = (e) => {
    titleRef.current.value = "";
    setSearched({ title: "", hashtag: e.target.value });
  };

  // 검색기록으로 타이틀 검색
  const searchKeywordHandler = (text) => {
    setSearched({ title: text, hashtag: "" });
  };

  useEffect(() => {
    if (searched.title || searched.hashtag) {
      const search = searched.title ? `?title=${searched.title}` : `?hashtag=${searched.hashtag}`;
      history.push({
        pathname: "/search",
        search,
      });
    }
  }, [history, searched]);

  return (
    <Layout>
      <div className={styles.title_input}>
        <form onSubmit={searchTitleHandler}>
          <Input ref={titleRef} />
        </form>
      </div>
      {!history.location.search ? (
        <SearchBrowse
          searchHashtagHandler={searchHashtagHandler}
          searchKeywordHandler={searchKeywordHandler}
          setSearched={setSearched}
        />
      ) : (
        <SearchResult />
      )}
    </Layout>
  );
}

export default Search;
