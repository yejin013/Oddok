/* eslint-disable react/jsx-boolean-value */
import React, { useState, useRef } from "react";
import Header from "../../components/home/header/header";
import Input from "../../components/commons/Input/input";
import HashtagButton from "../../components/commons/hashtag_button/hashtag_button";
import CardGrid from "../../components/home/card_grid/card_grid";
import { getStudyRoomList } from "../../api/study-room-api";

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
  const [loadedRooms, setLoadedRooms] = useState([]);
  const titleRef = useRef();
  const [searched, setSearched] = useState("");

  const fetchSearchedRooms = async (name, hashtag) => {
    const rooms = await getStudyRoomList(undefined, undefined, undefined, undefined, name, hashtag);
    setLoadedRooms(rooms);
  };

  const searchTitleHandler = (e) => {
    e.preventDefault();
    setSearched(titleRef.current.value);
    fetchSearchedRooms(titleRef.current.value);
  };

  const searchHashtagHandler = (e) => {
    titleRef.current.value = "";
    setSearched(e.target.value);
    fetchSearchedRooms(undefined, e.target.value);
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
              <HashtagButton label={label} onToggle={searchHashtagHandler} checked={label === searched} />
            ))}
          </div>
        </div>
        <div className={styles.search_list}>
          {searched && (
            <div>
              <h3>&ldquo;{searched}&rdquo; 검색 결과💭</h3>
              {loadedRooms.length > 0 ? <CardGrid rooms={loadedRooms} /> : "그런 방 없습니다👻"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
