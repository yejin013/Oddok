import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { useHistory } from "react-router-dom";
import { userState } from "@recoil/user-state";
import { Search, Profile } from "@icons";
import styles from "./Header.module.css";

function Header() {
  const history = useHistory();
  const user = useRecoilValue(userState);

  const onClickStudyRoom = () => {
    history.push({
      pathname: "/",
    });
  };

  const goToSearch = () => {
    history.push({
      pathname: "/search",
    });
  };

  const onClickMypage = () => {
    history.push({
      pathname: "/mypage",
    });
  };

  const goToCreateRoom = () => {
    history.push({
      pathname: "/studyroom/create",
    });
  };

  const goToLogin = () => {
    history.push({
      pathname: "/login",
    });
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <a href="/">ODDOK</a>
      </div>

      <ul className={styles.pages}>
        <li>
          <button type="button" className={styles.study_room} onClick={onClickStudyRoom}>
            스터디룸
          </button>
        </li>
        <li>
          {!user.isLogin ? (
            <button type="button" className={styles.mypage} onClick={goToLogin}>
              마이페이지
            </button>
          ) : (
            <button type="button" className={styles.mypage} onClick={onClickMypage}>
              마이페이지
            </button>
          )}
        </li>
      </ul>
      <div className={styles.buttons}>
        <button type="button" className={styles.search} onClick={goToSearch}>
          <Search />
        </button>
        <div className={styles.my_info}>
          <button type="button" className={styles.profile}>
            <Profile />
            <span className={styles.nickname}>{user.nickname}</span>
          </button>
        </div>
        {!user.isLogin ? (
          <button type="button" className={styles.study_button} onClick={goToLogin}>
            + 새 스터디 만들기
          </button>
        ) : (
          <button type="button" className={styles.study_button} onClick={goToCreateRoom}>
            + 새 스터디 만들기
          </button>
        )}
      </div>
    </header>
  );
}
export default Header;
