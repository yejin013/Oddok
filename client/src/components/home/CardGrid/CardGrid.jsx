import React from "react";
import { Link } from "react-router-dom";
import StudyRoomCard from "../StudyRoomCard/StudyRoomCard";
import styles from "./CardGrid.module.css";

function CardGrid({ rooms, showBookmark }) {
  return (
    <ul className={styles.container}>
      {rooms.map((roomData) => (
        <Link to={`/studyroom/${roomData.id}/setting`} className={styles.studyroom}>
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
