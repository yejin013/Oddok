/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { bookmarkState } from "@recoil/bookmark-state";
import { userState } from "@recoil/user-state";
import { saveBookmark, removeBookmark } from "@api/bookmark-api";
import { PasswordModal, Thumbnail, UserCount } from "@components/commons";
import { Lock, Unlock, BookMark, BookMarkHeart } from "@icons";
import useModal from "@hooks/useModal";
import styles from "./StudyRoomCard.module.css";

function StudyRoomCard({ roomData }) {
  const history = useHistory();
  const user = useRecoilValue(userState);
  const [bookmark, setBookmark] = useRecoilState(bookmarkState);
  const { isModal, openModal, closeModal } = useModal();

  const onStudyRoomClick = () => {
    if (!user.isLogin) {
      history.push("/login");
      return;
    }
    if (roomData.isPublic) {
      history.push(`/studyroom/${roomData.id}/setting`);
    } else {
      openModal();
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

  return (
    <>
      {isModal && <PasswordModal roomId={roomData.id} onClose={closeModal} />}
      <li className={styles.wrapper} onClick={onStudyRoomClick}>
        <Thumbnail>
          {bookmark?.id !== roomData.id ? (
            <button type="button" className={styles.bookmark_btn} onClick={onBookmarkAddBtnClick}>
              <BookMark />
            </button>
          ) : (
            <button type="button" className={styles.bookmark_btn} onClick={onBookmarkDeleteBtnClick}>
              <BookMarkHeart />
            </button>
          )}
          <div className={styles.user_icon}>
            <UserCount number={roomData.currentUsers} />
            <span>/ {roomData.limitUsers}</span>
          </div>
        </Thumbnail>
        <div className={styles.description}>
          <div className={styles.title}>
            <span className={styles.ellipsis}>{roomData.name}</span>
            {roomData.isPublic ? <Unlock /> : <Lock />}
          </div>
          <div className={styles.ellipsis}>
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
