import React, { useState, useEffect } from "react";
import { getPopluarHashtag } from "@api/hashtag-api";
import { HashtagList } from "..";
import styles from "./SearchBrowse.module.css";

function SearchBrowse({ searchHashtagHandler, searchKeywordHandler }) {
  const [popularHashtags, setPopularHashtags] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]); // {key: 생성시간, text: 검색어}

  // 인기 해시태그, 검색 기록 렌더링
  useEffect(() => {
    getPopluarHashtag().then((response) => setPopularHashtags(response.data.hashtags));
    const keywords = JSON.parse(localStorage.getItem("keywords"));
    if (keywords) {
      setSearchHistory(keywords);
    }
  }, []);

  // 검색기록 전체 삭제
  const removeAllHandler = () => {
    setSearchHistory([]);
  };

  // 검색기록 개별 삭제
  const removeItemHandler = (key) => {
    setSearchHistory((prev) => prev.filter((item) => item.key !== key));
  };

  // 검색기록 삭제가 일어날 경우 localStorage의 값도 동기화한다.
  useEffect(() => {
    localStorage.setItem("keywords", JSON.stringify(searchHistory));
  }, [searchHistory]);

  return (
    <div className={styles.container}>
      <div className={styles.tag_list}>
        <h3>인기 태그</h3>
        {popularHashtags.length > 0 && <HashtagList hashtagList={popularHashtags} onToggle={searchHashtagHandler} />}
      </div>
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
                <span onClick={() => searchKeywordHandler(keyword.text)}>{keyword.text}</span>
                <button type="button" onClick={() => removeItemHandler(keyword.key)}>
                  X
                </button>
              </li>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SearchBrowse;
