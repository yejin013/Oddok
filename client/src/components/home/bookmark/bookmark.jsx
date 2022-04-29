import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import UserCount from "../../commons/user_count/user_count";
import { ReactComponent as Thumbnail } from "../../../assets/icons/thumbnail.svg";
import styles from "./bookmark.module.css";
import { bookmarkState } from "../../../recoil/bookmark-state";

function Bookmark({ showBookmark }) {
  const isBookmarkUser = true;
  const bookmark = useRecoilValue(bookmarkState);
  const [participants, setParticipants] = useState([
    { id: 1, name: "현재 스터디원", time: "없음" },
    { id: 2, name: "현재 스터디원", time: "없음" },
    { id: 3, name: "현재 스터디원", time: "없음" },
    { id: 4, name: "현재 스터디원", time: "없음" },
    { id: 5, name: "현재 스터디원", time: "없음" },
  ]);

  useEffect(async () => {
    if (!bookmark) {
      return;
    }
    await showBookmark();
    setParticipants(bookmark.participant);
  }, []);

  console.log("북마크정보", bookmark);

  // TODO
  // endAt string 처리
  // participant 보여주기
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
                  <span className={styles.content}>
                    {!bookmark.endAt ? "없음" : `${bookmark.endAt.toString()}까지`}
                  </span>
                </p>
                <p className={styles.rule}>
                  <span className={styles.rule_title}>스터디규칙</span>
                  <span className={styles.rule_content}>{bookmark.rule}</span>
                </p>
              </div>
            </div>
            <ul className={styles.user_list}>
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
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookmark;
