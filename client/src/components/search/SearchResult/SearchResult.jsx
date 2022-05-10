import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import parseQueryString from "../../../utils/parseQueryString";
import StudyRoomList from "../../home/studyroom_list/studyroom_list";
import styles from "./SearchResult.module.css";

function SearchResult() {
  const location = useLocation();
  const [searchedKeyword, setSearchedKeyword] = useState();

  useEffect(() => {
    const qs = parseQueryString(location.search);
    setSearchedKeyword(qs);
  }, [location.search]);

  return (
    <div className={styles.container}>
      <h2>&ldquo;{searchedKeyword?.title || `#${searchedKeyword?.hashtag}`}&rdquo; 검색 결과</h2>
      {
        // TODO 검색결과별 인기 해시태그 필터 추가
        // <h3>태그 필터</h3>
      }
      <StudyRoomList searchedTitle={searchedKeyword?.title} searchedHashtag={searchedKeyword?.hashtag} />
    </div>
  );
}

export default SearchResult;
