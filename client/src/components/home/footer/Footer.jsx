import React from "react";
import styles from "./footer.module.css";

function Footer(props) {
  return (
    <footer className={styles.footer}>
      <div className={styles.info}>
        <div className={styles.title}>
          <span className={styles.logo}>ODDOK</span>
          <span className={styles.name}>실시간 화상 스터디 서비스</span>
        </div>
        <div className={styles.detail}>
          <div className={styles.contact}>
            <p className={styles.contents}>Contact</p>
            <p className={styles.content}>yejin013@naver.com</p>
          </div>
          <div className={styles.team}>
            <p className={styles.contents}>Team</p>
            <p className={styles.content}>DOBBY @숭실대학교 소프트웨어학부</p>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <span>Copyright Dobby 2022, All Rights Reserved.</span>
      </div>
    </footer>
  );
}
export default Footer;
