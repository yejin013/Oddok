import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { bookmarkState } from "@recoil/bookmark-state";
import { userState } from "@recoil/user-state";
import { getBookmark } from "@api/bookmark-api";
import { getTestUser } from "@api/get-test-user";
import { getNickname } from "@api/user-api";
import { Layout } from "@components/layout";
import { Bookmark, StudyRoomList } from "@components/home";
import styles from "./MainHome.module.css";

function MainHome() {
  const setBookmark = useSetRecoilState(bookmarkState);
  const [user, setUserState] = useRecoilState(userState);

  /*
  // get testUser
  useEffect(() => {
    getTestUser()
      .then((users) => console.log("get user", users))
      .catch((error) => console.error("get user error", error));
  }, []);
*/
  useEffect(async () => {
    if (!user.isLogin) {
      return;
    }
    await getNickname()
      .then((response) => setUserState((prev) => ({ ...prev, nickname: response })))
      .catch((error) => console.error("get nickname error", error));
  }, []);

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
          <StudyRoomList showBookmark={showBookmark} />
        </section>
      </main>
    </Layout>
  );
}

export default MainHome;
