import React from "react";
import { useSetRecoilState } from "recoil";
import { bookmarkState } from "@recoil/bookmark-state";
import { getBookmark } from "@api/bookmark-api";
import { Layout } from "@components/layout";
import { Bookmark, StudyRoomFeed } from "@components/home";
import styles from "./MainHome.module.css";

function MainHome() {
  const setBookmark = useSetRecoilState(bookmarkState);

  const showBookmark = async () => {
    await getBookmark()
      .then((response) => setBookmark(response))
      .catch((error) => console.error("get bookmark error", error));
  };

  return (
    <Layout>
      <main className={styles.main}>
        <Bookmark showBookmark={showBookmark} />
        <section className={styles.studyroom_list}>
          <h2>STUDY ROOM</h2>
          <StudyRoomFeed showBookmark={showBookmark} />
        </section>
      </main>
    </Layout>
  );
}

export default MainHome;
