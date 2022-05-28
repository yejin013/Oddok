import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { bookmarkState } from "@recoil/bookmark-state";
import { getBookmark } from "@api/bookmark-api";
import { getTestUser } from "@api/getTestUser";
import { Bookmark, Footer, Header, StudyRoomList, TotalParticipant } from "@components/home";
import styles from "./MainHome.module.css";

function MainHome() {
  const setBookmark = useSetRecoilState(bookmarkState);

  useEffect(() => {
    // get testUser
    getTestUser()
      .then((users) => console.log("get user", users))
      .catch((error) => console.log("get user error", error));
  }, []);

  const showBookmark = async () => {
    await getBookmark()
      .then((response) => setBookmark(response))
      .catch((error) => console.log("get bookmark error", error));
  };

  // 로그인 안했을 때
  // 전체 참여자수 컴포넌트 추가

  return (
    <div className={styles.home}>
      <Header />
      <Bookmark showBookmark={showBookmark} />
      <section className={styles.studyroom_list}>
        <h2>STUDY ROOM</h2>
        <StudyRoomList showBookmark={showBookmark} />
      </section>
      <Footer />
    </div>
  );
}

export default MainHome;
