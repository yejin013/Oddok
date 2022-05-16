import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { bookmarkState } from "@recoil/bookmark-state";
import { getBookmark } from "@api/study-room-api";
import { getTestUser } from "@api/getTestUser";
import { Bookmark, Footer, Header, StudyRoomList } from "@components/home";
import styles from "./main_home.module.css";

function MainHome(props) {
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
