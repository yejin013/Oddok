/* eslint-disable react/jsx-boolean-value */
import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../components/home/header/header";
import Input from "../../components/commons/Input/input";
import SearchBrowse from "../../components/search/SearchBrowse/SearchBrowse";
import SearchResult from "../../components/search/SearchResult/SearchResult";
import styles from "./search.module.css";

function Search({ location }) {
  const history = useHistory();
  const titleRef = useRef();
  const [searchedTitle, setSearchedTitle] = useState(undefined);
  const [searchedHashtag, setSearchedHashtag] = useState(undefined);

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
    setSearchedTitle(titleRef.current.value);
    updateSearchHistory({ key: new Date(), text: titleRef.current.value }); // 최근 검색어 추가
    setSearchedHashtag(undefined);
  };

  // 인기 해시태그 클릭으로 검색
  const searchHashtagHandler = (e) => {
    titleRef.current.value = "";
    setSearchedHashtag(e.target.value);
    setSearchedTitle(undefined);
  };

  // 검색기록으로 타이틀 검색
  const searchKeywordHandler = (text) => {
    setSearchedTitle(text);
    setSearchedHashtag(undefined);
  };

  useEffect(() => {
    if (searchedTitle) {
      history.push({
        pathname: "/search",
        search: `?title=${searchedTitle}`,
      });
    }
    if (searchedHashtag) {
      history.push({
        pathname: "/search",
        search: `?hashtag=${searchedHashtag}`,
      });
    }
  }, [searchedTitle, searchedHashtag]);

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.title_input}>
          <form onSubmit={searchTitleHandler}>
            <Input ref={titleRef} />
          </form>
        </div>
        {!location.search ? (
          <SearchBrowse searchKeywordHandler={searchKeywordHandler} searchHashtagHandler={searchHashtagHandler} />
        ) : (
          <SearchResult searchedTitle={searchedTitle} searchedHashtag={searchedHashtag} />
        )}
      </div>
    </div>
  );
}

export default Search;
