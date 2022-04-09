import React from "react";
import Bookmark from "../../components/home/bookmark/bookmark";
import Footer from "../../components/home/footer/footer";
import Header from "../../components/home/header/header";
import RoomList from "../../components/home/room_list/room_list";
import styles from "./main_home.module.css";

function MainHome(props) {
  /* 사용자 정보 get */
  /* 사용자별 북마크한 스터디룸 get */
  /* 스터디룸 list get */

  return (
    <div className={styles.home}>
      <Header />
      <Bookmark />
      <RoomList />
      <Footer />
    </div>
  );
}

export default MainHome;
