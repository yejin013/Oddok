import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { useHistory } from "react-router-dom";
import { userState } from "@recoil/user-state";
import { Search, Profile } from "@icons";
import styles from "./Header.module.css";

function Header() {
  const history = useHistory();
  const [isDropdown, setIsDropdown] = useState(false);
  const user = useRecoilValue(userState);

  const goToSearch = () => {
    history.push({
      pathname: "/search",
    });
  };

  const goToMypage = () => {
    history.push({
      pathname: "/mypage",
    });
  };

  const goToCreateRoom = () => {
    history.push({
      pathname: "/studyroom/create",
    });
  };

  const clickProfileBtn = () => {
    setIsDropdown((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <a href="/">ODDOK</a>
      </div>

      <ul className={styles.pages}>
        <li>
          <button type="button" className={styles.study_room}>
            스터디룸
          </button>
        </li>
        <li>
          <button type="button" className={styles.mypage} onClick={goToMypage}>
            마이페이지
          </button>
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
          {isDropdown && (
            <ul className={styles.info_buttons}>
              <li>
                <button type="button" className={styles.button}>
                  정보 수정
                </button>
              </li>
              <li>
                <button type="button" className={styles.button}>
                  로그아웃
                </button>
              </li>
            </ul>
          )}
        </ul>
        <button type="button" className={styles.study_button} onClick={goToCreateRoom}>
          + 새 스터디 만들기
        </button>
      </div>
    </header>
  );
}
export default Header;
