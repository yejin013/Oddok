/* eslint-disable react/jsx-boolean-value */
import React, { useState, useRef, useEffect } from "react";
import { getPopluarHashtag } from "../../api/hashtag-api";
import Header from "../../components/home/header/header";
import Input from "../../components/commons/Input/input";
import HashtagButton from "../../components/commons/hashtag_button/hashtag_button";
import StudyRoomList from "../../components/home/studyroom_list/studyroom_list";
import styles from "./search.module.css";

const HISTORY = ["공시생", "공시", "공무원", "5급"];

function Search() {
  const titleRef = useRef();
  const [searchedTitle, setSearchedTitle] = useState(undefined);
  const [searchedHashtag, setSearchedHashtag] = useState(undefined);
  const [isSearched, setIsSearched] = useState(false);
  const [popularHashtags, setPopularHashtags] = useState([]);

  const searchTitleHandler = (e) => {
    e.preventDefault();
    setSearchedTitle(titleRef.current.value);
    setSearchedHashtag(undefined);
    setIsSearched(true);
  };

  const searchHashtagHandler = (e) => {
    titleRef.current.value = "";
    setSearchedHashtag(e.target.value);
    setSearchedTitle(undefined);
    setIsSearched(true);
  };

  useEffect(async () => {
    const response = await getPopluarHashtag();
    setPopularHashtags(response.data.hashtags);
    console.log(response.data.hashtags);
  }, []);

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
              <div>전체 삭제</div>
            </div>
            <div className={styles.content}>
              {HISTORY.map((history) => (
                <li>
                  {history}
                  <div>X</div>
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
