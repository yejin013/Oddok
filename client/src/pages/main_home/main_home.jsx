import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import Bookmark from "../../components/home/bookmark/bookmark";
import Footer from "../../components/home/footer/footer";
import Header from "../../components/home/header/header";
import StudyRoomList from "../../components/home/studyroom_list/studyroom_list";
import styles from "./main_home.module.css";
import { getBookmark, addBookmark, deleteBookmark } from "../../api/study-room-api";
import { bookmarkState } from "../../recoil/bookmark-state";
import { getTestUser } from "../../api/getTestUser";

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

  return (
    <div className={styles.home}>
      <Header />
      <Bookmark showBookmark={showBookmark} />
      <StudyRoomList clickAddBtn={clickAddBtn} clickDeleteBtn={cancelBookmark} />
      <Footer />
    </div>
  );
}

export default MainHome;
