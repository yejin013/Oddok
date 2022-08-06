/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { bookmarkState } from "@recoil/bookmark-state";
import { userState } from "@recoil/user-state";
import { saveBookmark, removeBookmark } from "@api/bookmark-api";
import { PasswordModal, Thumbnail, UserCount } from "@components/commons";
import { Lock, Unlock, BookMark, BookMarkHeart } from "@icons";
import styles from "./StudyRoomCard.module.css";

function StudyRoomCard({ roomData }) {
  const user = useRecoilValue(userState);
  const [bookmark, setBookmark] = useRecoilState(bookmarkState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();

  const onStudyRoomClick = () => {
    if (!user.isLogin) {
      history.push("/login");
      return;
    }
    if (roomData.isPublic) {
      history.push(`/studyroom/${roomData.id}/setting`);
    } else {
      setIsModalOpen(true);
    }
  };

  const onBookmarkAddBtnClick = (event) => {
    event.stopPropagation();
    if (!user.isLogin) {
      history.push("/login");
      return;
    }
    saveBookmark(roomData.id)
      .then((response) => setBookmark(response))
      .catch((error) => console.error(error));
  };

  const onBookmarkDeleteBtnClick = (event) => {
    event.stopPropagation();
    removeBookmark()
      .then(setBookmark(null))
      .catch((error) => console.error(error));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && <PasswordModal roomId={roomData.id} onClose={closeModal} />}
      <li className={styles.card} onClick={onStudyRoomClick}>
        <div className={styles.thumbnail_box}>
          <Thumbnail />
          {!(bookmark && roomData.id === bookmark.id) ? (
            <button type="button" className={styles.bookmark_icon} onClick={onBookmarkAddBtnClick}>
              <BookMark />
            </button>
          ) : (
            <button type="button" className={styles.bookmark_icon} onClick={onBookmarkDeleteBtnClick}>
              <BookMarkHeart />
            </button>
          )}
          <div className={styles.user_count}>
            <div className={styles.count_icon}>
              <UserCount number={roomData.currentUsers} />
            </div>
            <span>/ {roomData.limitUsers}</span>
          </div>
        </div>
        <div className={styles.content_box}>
          <div className={styles.content_head}>
            <span className={styles.title}>{roomData.name}</span>
            <div className={styles.lock_icon}>{roomData.isPublic ? <Unlock /> : <Lock />}</div>
          </div>
          <div>
            {roomData.hashtags.map((hashtag) => (
              <span key={hashtag}>#{hashtag} </span>
            ))}
          </div>
        </div>
      </li>
    </>
  );
}

export default StudyRoomCard;
