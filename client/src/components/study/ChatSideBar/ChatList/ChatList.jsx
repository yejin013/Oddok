import React, { useState, useEffect, useRef } from "react";
import ChatBubble from "../ChatItem/ChatItem";
import styles from "./ChatList.module.css";

function ChatList({ chats, user }) {
  const chatListRef = useRef();
  const [target, setTarget] = useState();
  const [offset, setOffset] = useState(chats.length > 10 ? chats.length - 10 : 0);
  const [prevScrollHeight, setPrevScrollHeight] = useState();

  const scrollToBottom = () => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  useEffect(() => {
    if (prevScrollHeight && chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight - prevScrollHeight;
      setPrevScrollHeight(null);
    }
  }, [offset]);

  const onIntersect = ([entry]) => {
    if (entry.isIntersecting) {
      setPrevScrollHeight(chatListRef.current.scrollHeight);
      setOffset((prev) => (prev - 10 > 0 ? prev - 10 : 0));
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { root: chatListRef.current });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  return (
    <ul ref={chatListRef} className={styles.box}>
      <div ref={setTarget} />
      {chats.slice(offset).map((item) => (
        <ChatBubble
          key={item.id}
          content={item.content}
          time={item.time}
          userName={item.userName}
          isMine={item.userName === user.nickname}
        />
      ))}
    </ul>
  );
}

export default ChatList;
