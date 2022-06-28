import React from "react";
import { Link } from "react-router-dom";
import StudyRoomCard from "../StudyRoomCard/StudyRoomCard";
import Skeleton from "../StudyRoomCard/Skeleton";
import styles from "./CardGrid.module.css";

function CardGrid({ isLoading, rooms, showBookmark }) {
  return (
    <ul className={styles.container}>
      {rooms?.map((roomData) => (
        <Link key={roomData.id} to={`/studyroom/${roomData.id}/setting`} className={styles.studyroom}>
          <StudyRoomCard //
            roomData={roomData}
            showBookmark={showBookmark}
          />
        </Link>
      ))}
      {isLoading && new Array(16).fill(0).map(() => <Skeleton />)}
      {!isLoading && rooms.length === 0 && <p>스터디룸이 없습니다🥲</p>}
    </ul>
  );
}

export default CardGrid;
