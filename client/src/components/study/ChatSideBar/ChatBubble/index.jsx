import React from "react";
import styles from "./chat_bubble.module.css";

// 내 채팅일 경우 우측 정렬
// 다른 유저 채팅일 경우 좌측 정렬
function ChatBubble({ content, time, userName, isMine }) {
  return (
    <div className={styles.bubble_container}>
      <div className={`${styles.bubble_box} ${isMine ? "" : styles.left}`}>{content}</div>
      <div className={`${styles.bubble_info} ${isMine ? "" : styles.left}`}>
        {isMine ? (
          <>
            <span>{time}</span>
            <span>{userName}</span>
          </>
        ) : (
          <>
            <span>{userName}</span>
            <span>{time}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default ChatBubble;
