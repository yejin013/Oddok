import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import StudyRoomList from "../../home/studyroom_list/studyroom_list";
import styles from "./SearchResult.module.css";

function SearchResult({ searchedTitle, searchedHashtag }) {
  const location = useLocation();

  return (
    <div className={styles.container}>
      <h2>&ldquo;{location.search}&rdquo; 검색 결과</h2>
      {
        // TODO 검색결과별 인기 해시태그 필터 추가
        // <h3>태그 필터</h3>
      }
      <StudyRoomList searchedTitle={searchedTitle} searchedHashtag={searchedHashtag} />
    </div>
  );
}

export default SearchResult;
