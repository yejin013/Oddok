import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./header.module.css";
import { ReactComponent as Search } from "../../../assets/icons/search.svg";
import { ReactComponent as Profile } from "../../../assets/icons/person-circle.svg";

function Header(props) {
  const history = useHistory();
  const [isDropdown, setIsDropdown] = useState(false);

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

  const clickProfileBtn = () => {
    setIsDropdown((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo}>
        ODDOK
      </a>
      <ul className={styles.pages}>
        <li>
          <button type="button" className={styles.study_room}>
            스터디룸
          </button>
        </li>
        <li>
          <button type="button" className={styles.mypage}>
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
              <span className={styles.nickname}>뿌링뿌링</span>
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
