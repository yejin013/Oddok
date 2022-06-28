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

  useEffect(() => {
    const qs = parseQueryString(decodeURI(location.search));
    setSearchedKeyword(qs);
    if (qs.title) {
      getPopluarHashtag(qs.title).then((response) => {
        setPopularHashtags(response.data.hashtags);
      });
    }
  }, [location.search]);

  return (
    <div className={styles.container}>
      <h2>&ldquo;{searchedKeyword?.title || `#${searchedKeyword?.hashtag}`}&rdquo; 검색 결과</h2>
      {popularHashtags.length > 0 && (
        <div>
          <h3>태그 필터</h3>
          <HashtagList hashtagList={popularHashtags} />
        </div>
      )}
      <div>
        <StudyRoomList searchedTitle={searchedKeyword?.title} searchedHashtag={searchedKeyword?.hashtag} />
      </div>
    </div>
  );
}

export default SearchResult;
