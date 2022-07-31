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

function StudyRoomCard({ roomData, showBookmark }) {
  const user = useRecoilValue(userState);
  const [bookmark, setBookmark] = useRecoilState(bookmarkState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();

  const addBookmark = async (roomId) => {
    await saveBookmark(roomId)
      .then()
      .catch((error) => console.log("add bookmark error", error));
  };

  const deleteBookmark = async (event) => {
    event.stopPropagation();
    await removeBookmark()
      .then(setBookmark(null))
      .catch((error) => console.log("delete bookmark error", error));
  };

  // 북마크 버튼 누르면 새로고침 없이 바로 북마크 정보 보여줌
  const onBookmarkAddBtnClick = async (event) => {
    event.stopPropagation();
    if (!user.isLogin) {
      history.push("/login");
      return;
    }
    await addBookmark(roomData.id);
    await showBookmark();
  };

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
            <button type="button" className={styles.bookmark_icon} onClick={deleteBookmark}>
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
