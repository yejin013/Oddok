import React, { useState, useRef, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "@recoil/user-state";
import { Input } from "@components/commons";
import ChatList from "./ChatList/ChatList";
import styles from "./ChatSideBar.module.css";

function ChatSideBar({ session, display }) {
  const user = useRecoilValue(userState);
  const [chats, setChats] = useState([]);
  const inputRef = useRef();
  const isChatBar = true; // UI위한 변수

  useEffect(() => {
    if (session) {
      session.on("signal:chat", (e) => {
        const chatData = JSON.parse(e.data);
        setChats((prev) => [...prev, chatData]);
      });
    }
  }, [session]);

  const submitChatHandler = (e) => {
    e.preventDefault();
    if (inputRef.current.value === "") return;
    const content = inputRef.current.value;
    const time = new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
    session.signal({
      data: JSON.stringify({
        id: `${user.nickname}${Date.now()}`,
        content,
        time,
        userName: user.nickname,
      }),
      type: "chat",
    });
    inputRef.current.value = "";
  };

  return (
    <aside className={`${styles.side} ${!display && styles.hide}`}>
      {display && <ChatList chats={chats} user={user} />}
      <form onSubmit={submitChatHandler}>
        <Input placeholder="메시지를 입력하세요" ref={inputRef} isChatBar={isChatBar} />
      </form>
    </aside>
  );
}

export default ChatSideBar;
