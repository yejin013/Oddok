/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { bookmarkState } from "@recoil/bookmark-state";
import { PasswordModal, UserCount } from "@components/commons";
import { Thumbnail } from "@icons";
import useModal from "@hooks/useModal";
import styles from "./Bookmark.module.css";

const initialParticipant = [
  { id: 1, nickname: null, joinTime: null, isActive: false },
  { id: 2, nickname: null, joinTime: null, isActive: false },
  { id: 3, nickname: null, joinTime: null, isActive: false },
  { id: 4, nickname: null, joinTime: null, isActive: false },
  { id: 5, nickname: null, joinTime: null, isActive: false },
];

function Bookmark() {
  const bookmark = useRecoilValue(bookmarkState);
  const history = useHistory();
  const [participants, setParticipants] = useState(initialParticipant);
  const { isModal, openModal, closeModal } = useModal();

  // 북마크한 스터디룸의 현재 참여자 리스트
  useEffect(() => {
    if (bookmark.participant.length === 0) {
      setParticipants([...initialParticipant]);
      return;
    }
    const updatedParticipants = [...participants];
    for (let i = 0; i < participants.length; i += 1) {
      if (!bookmark.participant[i]) {
        updatedParticipants[i] = { ...participants[i], nickname: null, joinTime: null, isActive: false };
      } else {
        const nickname = bookmark.participant[i].nickname;
        const joinTime = bookmark.participant[i].joinTime.split(/[T, .]/)[1];
        updatedParticipants[i] = { ...participants[i], nickname, joinTime, isActive: true };
      }
    }
    setParticipants(updatedParticipants);
  }, [bookmark]);

  const onStartBtnClick = () => {
    if (bookmark.isPublic) {
      history.push(`/studyroom/${bookmark.id}/setting`);
    } else {
      openModal();
    }
  };

  return (
    <>
      {isModal && <PasswordModal roomId={bookmark.id} onClose={closeModal} />}
      <section className={styles.bookmark}>
        <div className={styles.count_info}>
          <div className={styles.count_icon}>
            <UserCount number={bookmark.currentUsers} />
          </div>
          <div className={styles.count_box}>
            <span className={styles.text}>스터디원 {bookmark.currentUsers}명이 공부 중이에요</span>
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
            <h3 className={styles.name}>{bookmark.name}</h3>
            <p className={styles.detail}>
              <span className={styles.title}>해시태그</span>
              {bookmark.hashtags.length !== 0 ? (
                bookmark.hashtags.map((hashtag) => (
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
                {bookmark.currentUsers}명 / {bookmark.limitUsers}명
              </span>
            </p>
            <p className={styles.detail}>
              <span className={styles.title}>기간</span>
              <span className={styles.content}>{bookmark.endAt ? `${bookmark.endAt}까지` : "없음"}</span>
            </p>
            <p className={styles.rule}>
              <span className={styles.rule_title}>스터디규칙</span>
              <span className={styles.rule_content}>{bookmark.rule || "없음"}</span>
            </p>
          </div>
          <ul className={styles.participants}>
            {participants.map((participant) => (
              <li key={participant.id} className={`${styles.list} ${participant.isActive && styles.active}`}>
                <div className={styles.nickname}>
                  <span>{participant.id}.&nbsp;</span>
                  <span>{participant.nickname || "현재 스터디원"}</span>
                </div>
                <span className={styles.time}>
                  {participant.isActive ? `${participant.joinTime} ~ 지금까지` : "없음"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default Bookmark;
