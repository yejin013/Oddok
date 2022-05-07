/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { useRecoilState } from "recoil";
import { bookmarkState } from "@recoil/bookmark-state";
import { addBookmark, deleteBookmark } from "@api/study-room-api";
import UserCount from "@components/commons/UserCount";
import { Lock, Unlock, BookMark, BookMarkHeart } from "@icons";
import Thumbnail from "./thumbnail";
import styles from "./studyroom_card.module.css";

function StudyRoomCard({ roomData, showBookmark }) {
  const [bookmark, setBookmark] = useRecoilState(bookmarkState);

  const selectBookmark = async (roomId) => {
    await addBookmark(roomId)
      .then(() => console.log("add bookmark"))
      .catch((error) => console.log("add bookmark error", error));
  };

  const cancelBookmark = async (event) => {
    event.preventDefault();
    await deleteBookmark()
      .then(setBookmark(null))
      .catch((error) => console.log("delete bookmark error", error));
  };

  // 북마크 버튼 누르면 새로고침 없이 바로 북마크 정보 보여줌
  const clickAddBtn = async () => {
    await selectBookmark(roomData.id);
    await showBookmark();
  };

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
                clickAddBtn();
              }}
            >
              <BookMark />
            </div>
          ) : (
            <div className={styles.bookmark_icon} onClick={cancelBookmark}>
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
