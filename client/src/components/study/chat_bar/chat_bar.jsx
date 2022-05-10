import React, { useState, useRef, useEffect } from "react";
import ChatBubble from "./chat_bubble";
import Input from "../../commons/Input/input";

import styles from "./chat_bar.module.css";

/**
 * TODO
 * 1. scroll bar css
 * 2. infinite scroll
 */

function ChatBar({ session }) {
  // 내 채팅인지 다른 유저의 채팅인지 구분하기 위한 임시 변수
  const [myName, setMyName] = useState(`도비${Math.floor(Math.random() * 100000000)}`);

  const inputRef = useRef();
  const chatBoxRef = useRef();
  const [bubbles, setBubbles] = useState([]);
  const isChatBar = true; // UI위한 변수

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [bubbles]);

  useEffect(() => {
    if (session) {
      session.on("signal:chat", (e) => {
        const chatData = JSON.parse(e.data);
        setBubbles((prev) => [...prev, chatData]);
      });
    }
  }, [session]);

  const submitChatHandler = (e) => {
    e.preventDefault();
    if (inputRef.current.value === "") return;
    const content = inputRef.current.value;
    const time = new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
    session
      .signal({
        data: JSON.stringify({
          content,
          time,
          userName: myName,
        }),
        type: "chat",
      })
      .then(() => console.log("📨채팅 전송 성공"))
      .catch((error) => console.log("📨채팅 전송 실패", error));
    inputRef.current.value = "";
  };

  return (
    <aside className={styles.side_box}>
      <div ref={chatBoxRef} className={styles.chat_box}>
        {bubbles.map((bubble) => (
          <ChatBubble
            content={bubble.content}
            time={bubble.time}
            userName={bubble.userName}
            isMine={bubble.userName === myName}
          />
        ))}
      </div>
      <form className={styles.form} onSubmit={submitChatHandler}>
        <Input placeholder="메시지를 입력하세요" ref={inputRef} isChatBar={isChatBar} />
      </form>
    </aside>
  );
}

export default ChatBar;
