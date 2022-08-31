import React from "react";
import StudyRoomCard from "../StudyRoomCard/StudyRoomCard";
import Skeleton from "../StudyRoomCard/Skeleton";
import styles from "./FeedGrid.module.css";

function FeedGrid({ isLoading, rooms }) {
  return (
    <div className={styles.content}>
      <ul>
        {isLoading && new Array(16).fill(0).map(() => <Skeleton />)}
        {rooms.map((roomData) => (
          <StudyRoomCard key={roomData.id} roomData={roomData} />
        ))}
      </ul>
      {!isLoading && rooms.length === 0 && (
        <div className={styles.empty}>
          <p>찾으시는 스터디룸이 없습니다.</p>
        </div>
      )}
    </div>
  );
}

export default FeedGrid;
