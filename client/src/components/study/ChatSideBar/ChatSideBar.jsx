import React, { useState, useRef, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "@recoil/user-state";
import { Input } from "@components/commons";
import { useInput } from "@hooks";
import { SendButton } from "@icons";
import ChatList from "./ChatList/ChatList";
import styles from "./ChatSideBar.module.css";

function ChatSideBar({ session, display }) {
  const user = useRecoilValue(userState);
  const [chats, setChats] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    if (session) {
      session.on("signal:chat", (e) => {
        const chatData = JSON.parse(e.data);
        setChats((prev) => [...prev, chatData]);
      });
    }
  }, [session]);

  const submitChatHandler = () => {
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

  const { pressEnter } = useInput(inputRef, submitChatHandler);

  return (
    <aside className={`${styles.side} ${!display && styles.hide}`}>
      {display && <ChatList chats={chats} user={user} />}
      <div className={styles.input_container}>
        <Input placeholder="메시지를 입력하세요" ref={inputRef} onKeyPress={pressEnter} />
        <button type="submit" className={styles.button} onClick={submitChatHandler}>
          <SendButton />
        </button>
      </div>
    </aside>
  );
}

export default ChatSideBar;
