import React, { useEffect, useState } from "react";
import UserCount from "../../commons/user_count/user_count";
import { ReactComponent as Thumbnail } from "../../../assets/icons/thumbnail.svg";
import styles from "./bookmark.module.css";
import { getBookmark } from "../../../api/study-room-api";

function Bookmark(props) {
  const isBookmark = true;
  const [bookmark, setBookmark] = useState(null);

  useEffect(() => {
    getBookmark()
      .then((response) => setBookmark(response.data))
      .catch((error) => console.log("get bookmark error", error));
  }, []);

  return (
    <div className={styles.bookmark}>
      <div className={styles.count_info}>
        <div className={styles.count_box}>
          <UserCount number={3} isBookmark={isBookmark} />
          <p className={styles.count}>스터디원 3명이 공부 중이에요</p>
        </div>
        <div className={styles.button_box}>
          <button className={styles.button} type="button">
            바로 스터디 시작하기
          </button>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.detail}>
          <div className={styles.thumbnail}>
            <Thumbnail />
          </div>
          <div className={styles.room_info}>
            <h3 className={styles.name}>공시생 2호실</h3>
            <p className={styles.detail_box}>
              <span className={styles.title}>해시태그</span>
              <span className={styles.content}>#교시제 #컨셉</span>
            </p>
            <p className={styles.detail_box}>
              <span className={styles.title}>인원</span>
              <span className={styles.content}>3명 / 8명</span>
            </p>
            <p className={styles.detail_box}>
              <span className={styles.title}>기간</span>
              <span className={styles.content}>2022. 12. 31 까지</span>
            </p>
            <p className={styles.rule}>
              <span className={styles.rule_title}>스터디규칙</span>
              <span className={styles.rule_content}>안녕하세요</span>
            </p>
          </div>
        </div>
        <ul className={styles.user_list}>
          <li className={styles.list}>
            <span className={styles.user}>1. 도너츠</span>
            <span className={styles.time}>01:42 ~ 지금까지</span>
          </li>
          <li className={styles.list}>
            <span className={styles.user}>1. 도너츠</span>
            <span className={styles.time}>01:42 ~ 지금까지</span>
          </li>
          <li className={styles.list}>
            <span className={styles.user}>1. 도너츠</span>
            <span className={styles.time}>01:42 ~ 지금까지</span>
          </li>
          <li className={styles.list}>
            <span className={styles.user}>1. 나는야 지오니</span>
            <span className={styles.time}>01:42 ~ 지금까지</span>
          </li>
          <li className={styles.list}>
            <span className={styles.user}>1. 도너츠</span>
            <span className={styles.time}>01:42 ~ 지금까지</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Bookmark;
