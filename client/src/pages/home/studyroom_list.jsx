import React, { useState, useEffect, useCallback } from "react";
import { getStudyRoomList } from "../../api/study-room-api";
import CategoryNav from "../../components/home/category_nav/category_nav";
import CardGrid from "../../components/home/card_grid/card_grid";

import styles from "./studyroom_list.module.css";

function StudyRoomList() {
  const [nextPage, setNextPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [loadedRooms, setLoadedRooms] = useState([]);

  const clickMoreBtn = useCallback(async () => {
    const data = await getStudyRoomList(nextPage);
    console.log(data.content);
    setLoadedRooms((prev) => [...prev, ...data.content]);
    setNextPage((prev) => prev + 1);

    // 마지막 페이지일 경우 버튼 없애기
    if (data.last) {
      setIsLastPage(true);
    }
  }, []);

  // 첫렌더링시 0번째 페이지는 먼저 가져오기
  useEffect(() => {
    clickMoreBtn();
  }, [clickMoreBtn]);

  // TODO 로딩일때 처리
  let content = <p style={{ color: "white" }}>스터디룸이 없어요!🥲</p>;
  if (loadedRooms.length > 0) {
    content = <CardGrid rooms={loadedRooms} />;
  }

  return (
    <div className={styles.container}>
      <h2>STUDY ROOM</h2>
      <div className={styles.lnb}>
        <CategoryNav />
      </div>
      <div className={styles.content}>{content}</div>
      {!isLastPage && (
        <button type="button" onClick={clickMoreBtn}>
          더보기
        </button>
      )}
    </div>
  );
}

export default StudyRoomList;
