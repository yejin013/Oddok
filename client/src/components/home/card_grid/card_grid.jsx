import React from "react";
import { Link } from "react-router-dom";
import StudyRoomCard from "../studyroom_card/studyroom_card";

import styles from "./card_grid.module.css";

function CardGrid({ loadedRooms }) {
  const studyroomList = []; // *임시* 나중에 데이터 받아와서 jsx에서 map으로
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 16; i++) {
    studyroomList.push(
      <Link to="/" className={styles.studyroom}>
        <StudyRoomCard />
      </Link>,
    );
  }
  return <section className={styles.container}>{studyroomList}</section>;

  // return (
  //   <section className={styles.container}>
  //     {loadedRooms.map((roomData) => (
  //       <Link to="/" className={styles.studyroom}>
  //         <StudyRoomCard />
  //       </Link>
  //     ))}
  //   </section>
  // );
}

export default CardGrid;
