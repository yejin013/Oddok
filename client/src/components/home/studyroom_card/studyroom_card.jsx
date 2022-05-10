/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { useRecoilState } from "recoil";
import Thumbnail from "./thumbnail";
import UserCount from "../../commons/user_count/user_count";
import { ReactComponent as Lock } from "../../../assets/icons/lock.svg";
import { ReactComponent as Unlock } from "../../../assets/icons/unlock.svg";
import { ReactComponent as BookMark } from "../../../assets/icons/bookmark.svg";
import { ReactComponent as BookMarkHeart } from "../../../assets/icons/bookmark-heart-fill.svg";
import styles from "./studyroom_card.module.css";
import { bookmarkState } from "../../../recoil/bookmark-state";
import { addBookmark, deleteBookmark } from "../../../api/study-room-api";

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
