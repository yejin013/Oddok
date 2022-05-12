/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import UserCount from "@components/commons/UserCount/UserCount";
import { bookmarkState } from "@recoil/bookmark-state";
import { Thumbnail } from "@icons";
import UserList from "../UserList/UserList";
import styles from "./Bookmark.module.css";

function Bookmark({ showBookmark }) {
  const bookmark = useRecoilValue(bookmarkState);
  const [participants, setParticipants] = useState([
    { nickname: "현재 스터디원", joinTime: "없음", isActive: false },
    { nickname: "현재 스터디원", joinTime: "없음", isActive: false },
    { nickname: "현재 스터디원", joinTime: "없음", isActive: false },
    { nickname: "현재 스터디원", joinTime: "없음", isActive: false },
    { nickname: "현재 스터디원", joinTime: "없음", isActive: false },
  ]);
  const history = useHistory();
  const isBookmarkUser = true; // UserCount style위한 변수

  useEffect(() => {
    // if(유저가 로그인했다면)
    showBookmark();
  }, []);

  // 현재 참여 중인 유저리스트
  useEffect(() => {
    if (bookmark) {
      const updatedUsers = [...participants];
      for (let i = 0; i < updatedUsers.length; i += 1) {
        if (!bookmark.participant[i]) {
          return;
        }
        const name = bookmark.participant[i].nickname;
        const time = bookmark.participant[i].joinTime.split(/[T, .]/)[1];
        const updated = { ...updatedUsers[i], nickname: name, joinTime: time, isActive: true };
        updatedUsers[i] = updated;
        setParticipants(updatedUsers);
      }
    }
  }, [bookmark]);

  // TODO
  // 비밀번호 확인
  const goToStudyRoom = () => {
    history.push({
      pathname: "/studyroom",
    });
  };

  return (
    <div className={styles.bookmark}>
      {!bookmark ? (
        <h1 style={{ color: "white", textAlign: "center" }}>🔖북마크를 추가해주세요🔖</h1>
      ) : (
        <div>
          <div className={styles.count_info}>
            <div className={styles.count_box}>
              <UserCount number={bookmark.currentUsers} isBookmarkUser={isBookmarkUser} />
              <p className={styles.count}>스터디원 {bookmark.currentUsers}명이 공부 중이에요</p>
            </div>
            <div className={styles.button_box}>
              <button className={styles.button} type="button" onClick={goToStudyRoom}>
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
                <h3 className={styles.name}>{bookmark.name}</h3>
                <p className={styles.detail_box}>
                  <span className={styles.title}>해시태그</span>
                  {bookmark.hashtags.length !== 0 ? (
                    bookmark.hashtags.map((hashtag) => <span className={styles.content}>#{hashtag} </span>)
                  ) : (
                    <span className={styles.content}>없음</span>
                  )}
                </p>
                <p className={styles.detail_box}>
                  <span className={styles.title}>인원</span>
                  <span className={styles.content}>
                    {bookmark.currentUsers}명 / {bookmark.limitUsers}명
                  </span>
                </p>
                <p className={styles.detail_box}>
                  <span className={styles.title}>기간</span>
                  <span className={styles.content}>{!bookmark.endAt ? "없음" : `${bookmark.endAt}까지`}</span>
                </p>
                <p className={styles.rule}>
                  <span className={styles.rule_title}>스터디규칙</span>
                  <span className={styles.rule_content}>{bookmark.rule || "없음"}</span>
                </p>
              </div>
            </div>
            <ul className={styles.user_list}>
              {participants.map((participant) => (
                <UserList participant={participant} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookmark;
