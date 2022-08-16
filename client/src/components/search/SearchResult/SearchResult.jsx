import React, { useState } from "react";
import { StudyRoomFeed } from "@components/home";
import { useSearchParams } from "@hooks";
import { HashtagList } from "..";
import styles from "./SearchResult.module.css";

function SearchResult() {
  const { searchParams } = useSearchParams();
  const [selectedHashtag, setSelectedHashtag] = useState(new Set());

  const selectHashtagHandler = (e) => {
    const set = new Set(selectedHashtag);
    if (!e.target.checked) {
      set.delete(e.target.value);
    } else {
      set.add(e.target.value);
    }
    setSelectedHashtag(set);
  };

  return (
    <div className={styles.container}>
      <h2>&ldquo;{searchParams.get("title") || `#${searchParams.get("hashtag")}`}&rdquo; 검색 결과</h2>
      <div>
        <h3>태그 필터</h3>
        <HashtagList onToggle={selectHashtagHandler} />
      </div>
      <div>
        <StudyRoomFeed tagFilter={selectedHashtag} />
      </div>
    </div>
  );
}

export default SearchResult;
