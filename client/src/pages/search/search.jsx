/* eslint-disable react/jsx-boolean-value */
import React, { useState, useRef } from "react";
import { useSetRecoilState } from "recoil";
import Header from "../../components/home/header/header";
import Input from "../../components/commons/Input/input";
import HashtagButton from "../../components/commons/hashtag_button/hashtag_button";
import StudyRoomList from "../../components/home/studyroom_list/studyroom_list";
import { getBookmark } from "../../api/study-room-api";
import { bookmarkState } from "../../recoil/bookmark-state";
import styles from "./search.module.css";

const hashtags = [
  "교시제",
  "여성전용",
  "아침기상",
  "컨셉",
  "목표시간",
  "자율",
  "평일",
  "주말",
  "예치금",
  "인증",
  "해시태그는15개1",
  "해시태그는15개2",
  "해시태그는15개3",
  "해시태그는15개4",
  "해시태그는15개5",
];

function Search() {
  const titleRef = useRef();
  const [searchedTitle, setSearchedTitle] = useState(undefined);
  const [searchedHashtag, setSearchedHashtag] = useState(undefined);
  const setBookmark = useSetRecoilState(bookmarkState);

  const searchTitleHandler = (e) => {
    e.preventDefault();
    setSearchedTitle(titleRef.current.value);
    setSearchedHashtag(undefined);
  };

  const searchHashtagHandler = (e) => {
    titleRef.current.value = "";
    setSearchedHashtag(e.target.value);
    setSearchedTitle(undefined);
  };

  const showBookmark = async () => {
    await getBookmark()
      .then((response) => setBookmark(response))
      .catch((error) => console.log("get bookmark error", error));
  };

  return (
    <div>
      <Header />
      <div className={styles.section}>
        <div className={styles.search}>
          <div className={styles.title_input}>
            <form onSubmit={searchTitleHandler}>
              <Input ref={titleRef} />
            </form>
          </div>
          <h3>추천 태그</h3>
          <div className={styles.hashtag_input}>
            {hashtags.map((label) => (
              <HashtagButton label={label} onToggle={searchHashtagHandler} checked={label === searchedHashtag} />
            ))}
          </div>
        </div>
        {(searchedTitle || searchedHashtag) && <h3>&ldquo;{searchedTitle || searchedHashtag}&rdquo; 검색 결과💭</h3>}
      </div>
      <div className={styles.search_list}>
        <StudyRoomList searchedTitle={searchedTitle} searchedHashtag={searchedHashtag} showBookmark={showBookmark} />
      </div>
    </div>
  );
}

export default Search;
