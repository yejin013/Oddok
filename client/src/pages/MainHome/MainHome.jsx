import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { bookmarkState } from "@recoil/bookmark-state";
import { getBookmark } from "@api/bookmark-api";
import { getTestUser } from "@api/get-test-user";
import { Layout } from "@components/layout";
import { Bookmark, StudyRoomList } from "@components/home";
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

  return (
    <Layout>
      <main className={styles.main}>
        <Bookmark showBookmark={showBookmark} />
        <section className={styles.studyroom_list}>
          <h2>STUDY ROOM</h2>
          <StudyRoomList showBookmark={showBookmark} />
        </section>
      </main>
    </Layout>
  );
}

export default MainHome;
