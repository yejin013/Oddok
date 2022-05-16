import React from "react";
import { Link } from "react-router-dom";
import StudyRoomCard from "../StudyRoomCard/StudyRoomCard";
import styles from "./CardGrid.module.css";

function CardGrid({ rooms, showBookmark }) {
  // 디자인 테스트용
  // const studyroomList = [];
  // eslint-disable-next-line no-plusplus
  // for (let i = 0; i < 16; i++) {
  //   studyroomList.push(
  //     <Link to="/" className={styles.studyroom}>
  //       <StudyRoomCard />
  //     </Link>,
  //   );
  // }
  // return <section className={styles.container}>{studyroomList}</section>;

  return (
    <ul className={styles.container}>
      {rooms.map((roomData) => (
        <Link to="/studyroom" className={styles.studyroom}>
          <StudyRoomCard //
            roomData={roomData}
            showBookmark={showBookmark}
          />
        </Link>
      ))}
    </ul>
  );
}

export default CardGrid;
