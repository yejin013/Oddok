import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./header.module.css";
import { ReactComponent as Search } from "../../../assets/icons/search.svg";
import { ReactComponent as Profile } from "../../../assets/icons/person-circle.svg";

function Header(props) {
  const history = useHistory();

  const goToSearch = () => {
    history.push({
      pathname: "/search",
    });
  };

  const goToCreateRoom = () => {
    history.push({
      pathname: "/create",
    });
  };

  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo}>
        ODDOK
      </a>
      <section className={styles.page_buttons}>
        <button type="button" className={styles.room_button}>
          스터디룸
        </button>
        <button type="button" className={styles.mypage_button}>
          마이페이지
        </button>
      </section>
      <section className={styles.icons}>
        <button type="button" className={styles.search} onClick={goToSearch}>
          <Search />
        </button>
        <button type="button" className={styles.my_info}>
          <Profile />
          <span className={styles.nickname}>뿌링뿌링</span>
        </button>
        <button type="button" className={styles.study_button} onClick={goToCreateRoom}>
          + 새 스터디 만들기
        </button>
      </section>
    </header>
  );
}
export default Header;
