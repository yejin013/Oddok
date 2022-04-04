import React, { useState, useRef, useEffect } from "react";
import ChatBubble from "./chat_bubble";
import Input from "../../commons/Input/input";

import styles from "./chat_bar.module.css";

/**
 * TODO
 * 1. scroll to bottom
 * 2. scroll bar css
 * 3. infinite scroll
 */

function ChatBar({ session }) {
  // 내 채팅인지 다른 유저의 채팅인지 구분하기 위한 임시 변수
  const [myName, setMyName] = useState(`도비${Math.floor(Math.random() * 100000000)}`);

  const inputRef = useRef();
  const [bubbles, setBubbles] = useState([{ content: "하잉", time: "00:00", userName: myName }]);

  // TODO 시간 받아와서 형태 바꾸기
  const submitChatHandler = (e) => {
    e.preventDefault();
    const chatInput = inputRef.current.value;
    setBubbles((prev) => [...prev, { content: chatInput, time: "00:00", userName: myName }]);
    inputRef.current.value = "";
  };

  return (
    <aside className={styles.side_box}>
      <div className={styles.chat_box}>
        {bubbles.map((bubble) => (
          <ChatBubble
            content={bubble.content}
            time={bubble.time}
            userName={bubble.userName}
            isMine={bubble.userName === myName}
          />
        ))}
      </div>
      <form onSubmit={submitChatHandler}>
        <Input placeholder="메시지를 입력하세요" ref={inputRef} />
      </form>
    </aside>
  );
}

export default ChatBar;
