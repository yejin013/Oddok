import React from "react";
import { Link } from "react-router-dom";
import StudyRoomCard from "../studyroom_card/studyroom_card";

import styles from "./card_grid.module.css";

function CardGrid({ rooms }) {
  // const studyroomList = []; // *임시* 나중에 데이터 받아와서 jsx에서 map으로
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
    <section className={styles.container}>
      {rooms.map((roomData) => (
        <Link to="/studyroom" className={styles.studyroom}>
          <StudyRoomCard roomData={roomData} />
        </Link>
      ))}
    </section>
  );
}

export default CardGrid;
