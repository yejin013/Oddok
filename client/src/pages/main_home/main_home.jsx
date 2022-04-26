import React from "react";
import Bookmark from "../../components/home/bookmark/bookmark";
import Footer from "../../components/home/footer/footer";
import Header from "../../components/home/header/header";
import StudyRoomList from "../../components/home/studyroom_list/studyroom_list";
import styles from "./main_home.module.css";

function MainHome(props) {
  return (
    <div className={styles.home}>
      <Header />
      <Bookmark />
      <StudyRoomList />
      <Footer />
    </div>
  );
}

export default MainHome;
