/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import UserCount from "../../commons/user_count/user_count";
import { ReactComponent as Thumbnail } from "../../../assets/icons/thumbnail.svg";
import styles from "./bookmark.module.css";
import { bookmarkState } from "../../../recoil/bookmark-state";
import UserList from "../UserList/UserList";

function Bookmark({ showBookmark }) {
  const isBookmarkUser = true;
  const bookmark = useRecoilValue(bookmarkState);
  const [participants, setParticipants] = useState([
    { nickname: "현재 스터디원", joinTime: "없음", isActive: false },
    { nickname: "현재 스터디원", joinTime: "없음", isActive: false },
    { nickname: "현재 스터디원", joinTime: "없음", isActive: false },
    { nickname: "현재 스터디원", joinTime: "없음", isActive: false },
    { nickname: "현재 스터디원", joinTime: "없음", isActive: false },
  ]);
  const history = useHistory();

  useEffect(() => {
    if (!bookmark) {
      return;
    }
    showBookmark();
  }, []);

  useEffect(() => {
    if (bookmark) {
      const newUsers = [...participants];

      for (let i = 0; i < newUsers.length; i += 1) {
        if (!bookmark.participant[i]) {
          return;
        }
        const name = bookmark.participant[i].nickname;
        const time = bookmark.participant[i].joinTime.split(/[T, .]/)[1];
        const updated = { ...newUsers[i], nickname: name, joinTime: time, isActive: true };
        newUsers[i] = updated;
        setParticipants(newUsers);
      }
    }
  }, [bookmark]);

  const goToStudyRoom = () => {
    history.push({
      pathname: "/studyroom/",
    });
  };

  // TODO
  // 비밀번호 확인
  // 버튼 눌렀을 때 이동

  return (
    <div className={styles.bookmark}>
      {!bookmark ? (
        <h1 style={{ color: "white", textAlign: "center" }}>🔖북마크를 추가해주세요🔖</h1>
      ) : (
        <div>
          <div className={styles.count_info}>
            <div className={styles.count_box}>
              <UserCount number={bookmark.currentUsers} isBookmark={isBookmarkUser} />
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
                  {bookmark.hashtags.map((hashtag) => (
                    <span className={styles.content}>#{hashtag} </span>
                  ))}
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

/*
{bookmark.participant.length === 0
                ? participants.map((participant) => (
                    <li className={styles.list}>
                      <div className={styles.user}>
                        <span>{participant.id} </span>
                        <span>{participant.name}</span>
                      </div>
                      <span className={styles.time}>{participant.time}</span>
                    </li>
                  ))
                : bookmark.participant.map((user) => (
                    <li className={styles.list}>
                      <div className={styles.user}>
                        <span>{user.nickname}</span>
                      </div>
                      <span className={styles.time}>{`${user.joinTime.split(/[T, .]/)[1]} ~ 지금까지`}</span>
                    </li>
                  ))}
*/
