import React, { useState, useEffect } from "react";
import { useSearchParams } from "@hooks";
import { HashtagList } from "..";
import styles from "./SearchBrowse.module.css";

function SearchBrowse() {
  const { setSearchParams } = useSearchParams();
  const [searchHistory, setSearchHistory] = useState([]); // {key: 생성시간, text: 검색어}

  // 인기 해시태그, 검색 기록 렌더링
  useEffect(() => {
    const keywords = JSON.parse(localStorage.getItem("keywords"));
    if (keywords) {
      setSearchHistory(keywords);
    }
  }, []);

  // 인기 해시태그 클릭으로 검색
  const searchHashtagHandler = (e) => {
    setSearchParams("hashtag", e.target.value, "/search/studyroom");
  };

  // 검색기록으로 타이틀 검색
  const searchKeywordHandler = (text) => {
    setSearchParams("title", text, "/search/studyroom");
  };

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
        <HashtagList onToggle={searchHashtagHandler} />
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
