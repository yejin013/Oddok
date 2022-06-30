import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPopluarHashtag } from "@api/hashtag-api";
import { StudyRoomList } from "@components/home";
import parseQueryString from "@utils/parseQueryString";
import { HashtagList } from "..";
import styles from "./SearchResult.module.css";

function SearchResult() {
  const location = useLocation();
  const [searchedKeyword, setSearchedKeyword] = useState();
  const [popularHashtags, setPopularHashtags] = useState([]);
  const [selectedHashtag, setSelectedHashtag] = useState(new Set());

  useEffect(() => {
    const qs = parseQueryString(decodeURI(location.search));
    setSearchedKeyword(qs);
    // 방 제목으로 검색시 검색 결과 내의 인기 해시태그 조회
    if (qs.title) {
      getPopluarHashtag(qs.title)
        .then((response) => setPopularHashtags(response.data.hashtags))
        .catch((e) => console.error(e));
    }
    // 해시태그로 검색시 전체 인기 해시태그 조회
    else if (qs.hashtag) {
      getPopluarHashtag()
        .then((response) => setPopularHashtags(response.data.hashtags))
        .catch((e) => console.error(e));
    }
  }, [location.search]);

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
      <h2>&ldquo;{searchedKeyword?.title || `#${searchedKeyword?.hashtag}`}&rdquo; 검색 결과</h2>
      {popularHashtags.length > 0 && (
        <div>
          <h3>태그 필터</h3>
          <HashtagList hashtagList={popularHashtags} onToggle={selectHashtagHandler} />
        </div>
      )}
      <div>
        <StudyRoomList
          searchedTitle={searchedKeyword?.title}
          searchedHashtag={searchedKeyword?.hashtag}
          tagFilter={selectedHashtag}
        />
      </div>
    </div>
  );
}

export default SearchResult;
