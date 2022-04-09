import React from "react";
import styles from "./footer.module.css";

function Footer(props) {
  return (
    <footer className={styles.footer}>
      <section className={styles.info}>
        <div className={styles.title}>
          <span className={styles.logo}>ODDOK</span>
          <span className={styles.name}>실시간 화상 스터디 서비스</span>
        </div>
        <div className={styles.detail}>
          <div className={styles.contact}>
            <span className={styles.contents}>Contact</span>
            <span className={styles.content}>yejin013@naver.com</span>
          </div>
          <div className={styles.team}>
            <span className={styles.contents}>Team</span>
            <span className={styles.content}>DOBBY @숭실대학교 소프트웨어학부</span>
          </div>
        </div>
      </section>
      <section className={styles.copyright}>
        <span>Copyright Dobby 2022, All Rights Reserved.</span>
      </section>
    </footer>
  );
}
export default Footer;
