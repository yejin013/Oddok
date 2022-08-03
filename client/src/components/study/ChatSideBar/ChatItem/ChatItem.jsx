import React from "react";
import styles from "./ChatItem.module.css";

// 내 채팅일 경우 우측 정렬
// 다른 유저 채팅일 경우 좌측 정렬
function ChatBubble({ content, time, userName, isMine }) {
  return (
    <li>
      <div className={`${styles.bubble} ${isMine ? "" : styles.left}`}>{content}</div>
      <div className={`${styles.info} ${isMine ? "" : styles.left}`}>
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
    </li>
  );
}

export default ChatBubble;
