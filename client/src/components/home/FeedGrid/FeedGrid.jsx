import React from "react";
import { Link } from "react-router-dom";
import { EmojiDizzy } from "@icons";
import StudyRoomCard from "../StudyRoomCard/StudyRoomCard";
import Skeleton from "../StudyRoomCard/Skeleton";
import styles from "./FeedGrid.module.css";

function CardGrid({ isLoading, rooms, showBookmark }) {
  return (
    <div className={styles.content}>
      <ul>
        {isLoading && new Array(16).fill(0).map(() => <Skeleton />)}
        {rooms?.map((roomData) => (
          <Link key={roomData.id} to={`/studyroom/${roomData.id}/setting`} className={styles.studyroom}>
            <StudyRoomCard //
              roomData={roomData}
              showBookmark={showBookmark}
            />
          </Link>
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

export default CardGrid;
