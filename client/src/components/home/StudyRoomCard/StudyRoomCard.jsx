import React from "react";
import { useRecoilState } from "recoil";
import { bookmarkState } from "@recoil/bookmark-state";
import { addBookmark, deleteBookmark } from "@api/bookmark-api";
import { Thumbnail, UserCount } from "@components/commons";
import { Lock, Unlock, BookMark, BookMarkHeart } from "@icons";
import styles from "./StudyRoomCard.module.css";

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
            <button
              type="button"
              className={styles.bookmark_icon}
              onClick={(event) => {
                event.preventDefault();
                clickAddBtn();
              }}
            >
              <BookMark />
            </button>
          ) : (
            <button type="button" className={styles.bookmark_icon} onClick={cancelBookmark}>
              <BookMarkHeart />
            </button>
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
