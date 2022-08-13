import React from "react";
import { Footer, Header } from "@components/home";
import { KAKAO_AUTH_URL } from "@api/auth/kakao";
import styles from "./Login.module.css";

function Login() {
  return (
    <>
      <Header />
      <section className={styles.login}>
        <div className={styles.container}>
          <div className={styles.comment_box}>
            <p className={styles.comment}>ODDOK과 함께</p>
            <p className={styles.comment}>즐거운 화상스터디를</p>
            <p className={styles.comment}>시작해보세요🚀</p>
          </div>
          <a href={KAKAO_AUTH_URL}>
            <button className={styles.button} type="button">
              카카오로 3초만에 로그인
            </button>
          </a>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Login;
