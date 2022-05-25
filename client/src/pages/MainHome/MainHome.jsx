import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { bookmarkState } from "@recoil/bookmark-state";
import { getBookmark } from "@api/bookmark-api";
import { getTestUser } from "@api/getTestUser";
import { getTotalParticipant } from "@api/participant-api";
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

  useEffect(() => {
    // if (로그인을 안했다면)
    getTotalParticipant()
      .then((response) => console.log(response))
      .catch((error) => console.log(error.response));
  }, []);

  const showBookmark = async () => {
    await getBookmark()
      .then((response) => setBookmark("전체참여자수", response))
      .catch((error) => console.log("get bookmark error", error));
  };

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
