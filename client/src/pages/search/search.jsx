/* eslint-disable react/jsx-boolean-value */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useRef, useEffect } from "react";
import { getPopluarHashtag } from "../../api/hashtag-api";
import Header from "../../components/home/header/header";
import Input from "../../components/commons/Input/input";
import HashtagButton from "../../components/commons/hashtag_button/hashtag_button";
import StudyRoomList from "../../components/home/studyroom_list/studyroom_list";
import styles from "./search.module.css";

function Search() {
  const titleRef = useRef();
  const [searchedTitle, setSearchedTitle] = useState(undefined);
  const [searchedHashtag, setSearchedHashtag] = useState(undefined);
  const [isSearched, setIsSearched] = useState(false);
  const [popularHashtags, setPopularHashtags] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]); // {key: 생성시간, text: 검색어}

  const searchTitleHandler = (e) => {
    e.preventDefault();
    setSearchedTitle(titleRef.current.value);
    setSearchHistory((prev) => [...prev, { key: new Date(), text: titleRef.current.value }]); // 최근 검색어 추가
    setSearchedHashtag(undefined);
    setIsSearched(true);
  };

  const searchHashtagHandler = (e) => {
    titleRef.current.value = "";
    setSearchedHashtag(e.target.value);
    setSearchedTitle(undefined);
    setIsSearched(true);
  };

  useEffect(() => {
    (async () => {
      const response = await getPopluarHashtag();
      setPopularHashtags(response.data.hashtags);
    })();
    const keywords = JSON.parse(localStorage.getItem("keywords"));
    if (keywords) {
      setSearchHistory(keywords);
    }
  }, []);

  // 검색기록 state가 변할때마다 localStorage도 업데이트한다.
  useEffect(() => {
    localStorage.setItem("keywords", JSON.stringify(searchHistory));
  }, [searchHistory]);

  // 검색기록 전체 삭제
  const removeAllHandler = () => {
    setSearchHistory([]);
  };

  // 검색기록 개별 삭제
  const removeItemHandler = (key) => {
    setSearchHistory((prev) => prev.filter((item) => item.key !== key));
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.search}>
          <div className={styles.title_input}>
            <form onSubmit={searchTitleHandler}>
              <Input ref={titleRef} />
            </form>
          </div>
          {(searchedTitle || searchedHashtag) && <h2>&ldquo;{searchedTitle || searchedHashtag}&rdquo; 검색 결과</h2>}
          {!isSearched && (
            <>
              <h3>인기 태그</h3>
              {popularHashtags.length > 0 && (
                <div className={styles.hashtag_input}>
                  {popularHashtags.map((label) => (
                    <HashtagButton label={label} onToggle={searchHashtagHandler} checked={label === searchedHashtag} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        {!isSearched ? (
          <div className={styles.search_history}>
            <div className={styles.head}>
              <h3>검색기록</h3>
              <button type="button" onClick={removeAllHandler}>
                전체 삭제
              </button>
            </div>
            <div className={styles.content}>
              {searchHistory.length > 0 &&
                searchHistory.map((keyword) => (
                  <li key={keyword.key}>
                    {keyword.text}
                    <button type="button" onClick={() => removeItemHandler(keyword.key)}>
                      X
                    </button>
                  </li>
                ))}
            </div>
          </div>
        ) : (
          <>
            <h3>태그 필터</h3>
            <div className={styles.hashtag_input}>
              {popularHashtags.map((label) => (
                <HashtagButton label={label} onToggle={searchHashtagHandler} checked={label === searchedHashtag} />
              ))}
            </div>
            <div className={styles.search_list}>
              <StudyRoomList searchedTitle={searchedTitle} searchedHashtag={searchedHashtag} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Search;
