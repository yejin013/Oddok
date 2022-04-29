/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Thumbnail from "./thumbnail";
import UserCount from "../../commons/user_count/user_count";
import { ReactComponent as Lock } from "../../../assets/icons/lock.svg";
import { ReactComponent as Unlock } from "../../../assets/icons/unlock.svg";
import { ReactComponent as BookMark } from "../../../assets/icons/bookmark.svg";
import { ReactComponent as BookMarkHeart } from "../../../assets/icons/bookmark-heart-fill.svg";
import styles from "./studyroom_card.module.css";
import { addBookmark, deleteBookmark } from "../../../api/study-room-api";
import { bookmarkState } from "../../../recoil/bookmark-state";

function StudyRoomCard({ roomData, clickAddBtn, clickDeleteBtn }) {
  const bookmark = useRecoilValue(bookmarkState);
  /*
  const selectBookmark = (event) => {
    event.preventDefault();
    addBookmark(roomData.id)
      .then(setBookmark({ ...bookmark, isBookmark: true }))
      .catch((error) => console.log("add bookmark error", error));
  };

  const cancelBookmark = (event) => {
    event.preventDefault();
    deleteBookmark()
      .then(setBookmark({ ...bookmark, info: null, isBookmark: false }))
      .catch((error) => console.log("delete bookmark error", error));
  };
*/
  return (
    <li key={roomData.id} className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.thumbnail_box}>
          <Thumbnail />
          {!(bookmark && roomData.id === bookmark.id) ? (
            <div
              className={styles.bookmark_icon}
              onClick={(event) => {
                event.preventDefault();
                clickAddBtn(roomData.id);
              }}
            >
              <BookMark />
            </div>
          ) : (
            <div
              className={styles.bookmark_icon}
              onClick={(event) => {
                event.preventDefault();
                clickDeleteBtn();
              }}
            >
              <BookMarkHeart />
            </div>
          )}
          <div className={styles.user_count}>
            <UserCount number={roomData.currentUsers} />
            <span>/ {roomData.limitUsers}</span>
          </div>
        </div>
        <div className={styles.content_box}>
          <div className={styles.content_head}>
            <div className={styles.title}>{roomData.name}</div>
            <div className={styles.lock_icon}>{roomData.isPublic ? <Unlock /> : <Lock />}</div>
          </div>
          <div>
            {roomData.hashtags.map((hashtag) => (
              <span>#{hashtag} </span>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}

export default StudyRoomCard;
