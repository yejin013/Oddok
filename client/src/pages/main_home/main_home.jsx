import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import Bookmark from "../../components/home/bookmark/bookmark";
import Footer from "../../components/home/footer/footer";
import Header from "../../components/home/header/header";
import StudyRoomList from "../../components/home/studyroom_list/studyroom_list";
import styles from "./main_home.module.css";
import { getBookmark } from "../../api/study-room-api";
import { bookmarkState } from "../../recoil/bookmark-state";
import { getTestUser } from "../../api/getTestUser";

function MainHome(props) {
  const setBookmark = useSetRecoilState(bookmarkState);

  // useEffect(() => {
  //   // get testUser
  //   getTestUser()
  //     .then((users) => console.log("get user", users))
  //     .catch((error) => console.log("get user error", error));
  // }, []);

  const showBookmark = async () => {
    await getBookmark()
      .then((response) => setBookmark(response))
      .catch((error) => console.log("get bookmark error", error));
  };

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
