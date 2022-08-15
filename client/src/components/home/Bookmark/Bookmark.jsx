/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { PasswordModal, UserCount } from "@components/commons";
import { Thumbnail } from "@icons";
import useModal from "@hooks/useModal";
import styles from "./Bookmark.module.css";

const initialUsers = [
  { id: 1, nickname: null, joinTime: null, isActive: false },
  { id: 2, nickname: null, joinTime: null, isActive: false },
  { id: 3, nickname: null, joinTime: null, isActive: false },
  { id: 4, nickname: null, joinTime: null, isActive: false },
  { id: 5, nickname: null, joinTime: null, isActive: false },
];

function Bookmark({ bookmark }) {
  const { currentUsers, endAt, hashtags, id, isPublic, limitUsers, name, participant, rule } = bookmark;
  const history = useHistory();
  const [users, setUsers] = useState(initialUsers);
  const { isModal, openModal, closeModal } = useModal();

  // 북마크한 스터디룸의 현재 참여자 리스트
  useEffect(() => {
    if (participant.length === 0) {
      setUsers([...initialUsers]);
      return;
    }
    const updatedUsers = [...users];
    for (let i = 0; i < users.length; i += 1) {
      if (!participant[i]) {
        updatedUsers[i] = { ...users[i], nickname: null, joinTime: null, isActive: false };
      } else {
        const nickname = participant[i].nickname;
        const joinTime = participant[i].joinTime.split(/[T, .]/)[1];
        updatedUsers[i] = { ...users[i], nickname, joinTime, isActive: true };
      }
    }
    setUsers(updatedUsers);
  }, []);

  const onStartBtnClick = () => {
    if (isPublic) {
      history.push(`/studyroom/${id}/setting`);
    } else {
      openModal();
    }
  };

  return (
    <>
      {isModal && <PasswordModal roomId={id} onClose={closeModal} />}
      <section className={styles.bookmark}>
        <div className={styles.count_info}>
          <div className={styles.count_icon}>
            <UserCount number={currentUsers} />
          </div>
          <div className={styles.count_box}>
            <span className={styles.text}>스터디원 {currentUsers}명이 공부 중이에요</span>
            <button className={styles.button} type="button" onClick={onStartBtnClick}>
              바로 스터디 시작하기
            </button>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.thumbnail}>
            <Thumbnail />
          </div>
          <div className={styles.detail_box}>
            <h3 className={styles.name}>{name}</h3>
            <p className={styles.detail}>
              <span className={styles.title}>해시태그</span>
              {hashtags.length !== 0 ? (
                hashtags.map((hashtag) => (
                  <span key={hashtag} className={styles.content}>
                    #{hashtag}&nbsp;
                  </span>
                ))
              ) : (
                <span className={styles.content}>없음</span>
              )}
            </p>
            <p className={styles.detail}>
              <span className={styles.title}>인원</span>
              <span className={styles.content}>
                {currentUsers}명 / {limitUsers}명
              </span>
            </p>
            <p className={styles.detail}>
              <span className={styles.title}>기간</span>
              <span className={styles.content}>{endAt ? `${endAt}까지` : "없음"}</span>
            </p>
            <p className={styles.rule}>
              <span className={styles.rule_title}>스터디규칙</span>
              <span className={styles.rule_content}>{rule ?? "없음"}</span>
            </p>
          </div>
          <ul className={styles.users}>
            {users.map((user) => (
              <li key={user.id} className={`${styles.list} ${user.isActive && styles.active}`}>
                <div className={styles.nickname}>
                  <span>{user.id}.&nbsp;</span>
                  <span>{user.nickname ?? "현재 스터디원"}</span>
                </div>
                <span className={styles.time}>{user.isActive ? `${user.joinTime} ~ 지금까지` : "없음"}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default Bookmark;
