import React, { useState } from "react";
import { StudyRoomFeed } from "@components/home";
import { useSearchParams } from "@hooks";
import { HashtagList } from "..";
import styles from "./SearchResult.module.css";

function SearchResult() {
  const { searchParams } = useSearchParams();
  const [selectedHashtag, setSelectedHashtag] = useState(new Set());

  const selectTagFilters = (e) => {
    if (e.target.checked) setSelectedHashtag((prev) => new Set(prev).add(e.target.value));
    else
      setSelectedHashtag((prev) => {
        const next = new Set(prev);
        next.delete(e.target.value);
        return next;
      });
  };

  return (
    <div className={styles.container}>
      <h2>&ldquo;{searchParams.get("title") ?? `#${searchParams.get("hashtag")}`}&rdquo; 검색 결과</h2>
      <div>
        <h3>태그 필터</h3>
        <HashtagList onToggle={selectTagFilters} />
      </div>
      <StudyRoomFeed tagFilter={selectedHashtag} />
    </div>
  );
}

export default SearchResult;
