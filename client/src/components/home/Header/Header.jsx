import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { useHistory } from "react-router-dom";
import { userState } from "@recoil/user-state";
import { logout } from "@api/auth-api";
import { Search, Profile } from "@icons";
import styles from "./Header.module.css";

function Header() {
  const history = useHistory();
  const user = useRecoilValue(userState);
  const [isDropdown, setIsDropdown] = useState(false);

  const ClickStudyRoom = () => {
    history.push({
      pathname: "/",
    });
  };

  const ClickMypage = () => {
    history.push({
      pathname: "/mypage",
    });
  };

  const goToSearch = () => {
    history.push({
      pathname: "/search",
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

  const clickProfileBtn = () => {
    setIsDropdown((prev) => !prev);
  };

  const clickLogoutBtn = () => {
    logout()
      .then((response) => {
        console.log("로그아웃", response); // 확인용
        localStorage.setItem("isLogin", false);
        history.push({
          pathname: "/",
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <a href="/">ODDOK</a>
      </div>

      <ul className={styles.pages}>
        <li>
          <button type="button" className={styles.study_room} onClick={ClickStudyRoom}>
            스터디룸
          </button>
        </li>
        <li>
          {!user.isLogin ? (
            <button type="button" className={styles.mypage} onClick={goToLogin}>
              마이페이지
            </button>
          ) : (
            <button type="button" className={styles.mypage} onClick={ClickMypage}>
              마이페이지
            </button>
          )}
        </li>
      </ul>
      <div className={styles.buttons}>
        <button type="button" className={styles.search} onClick={goToSearch}>
          <Search />
        </button>
        <ul className={styles.my_info}>
          <li>
            <button type="button" className={styles.profile} onClick={clickProfileBtn}>
              <Profile />
              <span className={styles.nickname}>{user.nickname}</span>
            </button>
          </li>
          {user.isLogin && isDropdown && (
            <ul className={styles.info_buttons}>
              <li>
                <button type="button" className={styles.button} onClick={clickLogoutBtn}>
                  로그아웃
                </button>
              </li>
            </ul>
          )}
        </ul>
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
