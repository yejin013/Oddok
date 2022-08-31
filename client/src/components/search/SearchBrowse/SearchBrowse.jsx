import React from "react";
import { useSearchParams } from "@hooks";
import { HashtagList, SearchHistory } from "..";
import styles from "./SearchBrowse.module.css";

function SearchBrowse() {
  const { setSearchParams } = useSearchParams();

  const searchHashtag = (e) => {
    setSearchParams("hashtag", e.target.value, "/search/studyroom");
  };

  const searchTitle = (text) => {
    setSearchParams("title", text, "/search/studyroom");
  };

  return (
    <div className={styles.container}>
      <div>
        <h3>인기 태그</h3>
        <HashtagList onToggle={searchHashtag} />
      </div>
      <SearchHistory searchTitle={searchTitle} />
    </div>
  );
}

export default SearchBrowse;
