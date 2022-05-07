import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { bookmarkState } from "@recoil/bookmark-state";
import { getBookmark, addBookmark, deleteBookmark } from "@api/study-room-api";
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

  /*
  const selectBookmark = async (roomId) => {
    await addBookmark(roomId)
      .then(() => console.log("add bookmark"))
      .catch((error) => console.log("add bookmark error", error));
  };

  const cancelBookmark = async () => {
    await deleteBookmark()
      .then(setBookmark(null))
      .catch((error) => console.log("delete bookmark error", error));
  };

  // 북마크 버튼 누르면 새로고침 없이 바로 북마크 정보 보여줌
  const clickAddBtn = async (roomId) => {
    await selectBookmark(roomId);
    await showBookmark();
  };
  */

  return (
    <div className={styles.home}>
      <Header />
      <Bookmark showBookmark={showBookmark} />
      <StudyRoomList showBookmark={showBookmark} />
      <Footer />
    </div>
  );
}

export default MainHome;

// clickAddBtn={clickAddBtn} clickDeleteBtn={cancelBookmark}
