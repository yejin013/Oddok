import React from "react";
import { EmojiDizzy } from "@icons";
import StudyRoomCard from "../StudyRoomCard/StudyRoomCard";
import Skeleton from "../StudyRoomCard/Skeleton";
import styles from "./FeedGrid.module.css";

function FeedGrid({ isLoading, rooms, showBookmark }) {
  return (
    <div className={styles.content}>
      <ul>
        {isLoading && new Array(16).fill(0).map(() => <Skeleton />)}
        {rooms?.map((roomData) => (
          <StudyRoomCard
            className={styles.studyroom}
            key={roomData.id}
            roomData={roomData}
            showBookmark={showBookmark}
          />
        ))}
      </ul>
      {!isLoading && rooms.length === 0 && (
        <div className={styles.empty}>
          <EmojiDizzy />
          <p>찾으시는 스터디룸이 없습니다.</p>
        </div>
      )}
    </div>
  );
}

export default FeedGrid;
