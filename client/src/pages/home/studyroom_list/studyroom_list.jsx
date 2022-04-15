import React, { useState, useEffect, useCallback } from "react";
import { getStudyRoomList } from "../../api/study-room-api";
import TabMenu from "../../components/home/tab_menu/tab_menu";
import CardGrid from "../../components/home/card_grid/card_grid";
import Dropdown from "../../components/commons/dropdown/dropdown";

import styles from "./studyroom_list.module.css";

function StudyRoomList() {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(undefined);
  const [filterOpt, setFilterOpt] = useState(undefined);
  const [sortOpt, setSortOpt] = useState("createAt");
  const [isLastPage, setIsLastPage] = useState(false);
  const [loadedRooms, setLoadedRooms] = useState([]);

  // 스터디룸 리스트 요청
  const fetchRoomData = useCallback(async (page, isPublic, category, sort) => {
    const data = await getStudyRoomList(page, isPublic, category, sort);
    // 마지막 페이지일 경우 버튼 없애기
    if (data.last) {
      setIsLastPage(true);
    }
    return data;
  }, []);

  // 더보기
  const clickMoreBtn = async () => {
    const data = await fetchRoomData(currentPage + 1, filterOpt, currentCategory, sortOpt);
    setLoadedRooms((prev) => [...prev, ...data.content]);
    setCurrentPage((prev) => prev + 1);
  };

  // 카테고리 필터링, 공개 스터디 필터링, 인기순/최신순 정렬
  // 0번째 페이지 조회
  useEffect(() => {
    (async () => {
      const data = await fetchRoomData(0, filterOpt, currentCategory, sortOpt);
      setLoadedRooms(data.content);
    })();
    setCurrentPage(0);
  }, [fetchRoomData, filterOpt, currentCategory, sortOpt]);

  const filterRoomHandler = (value) => {
    if (value === undefined) {
      setFilterOpt(undefined);
      return;
    }
    setFilterOpt(value);
  };

  const sortRoomHandler = (value) => {
    setSortOpt(value);
  };

  let content = <p style={{ color: "white" }}>스터디룸이 없어요!🥲</p>;
  if (loadedRooms.length > 0) {
    content = <CardGrid rooms={loadedRooms} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.studyroom_head}>
        <h2>STUDY ROOM</h2>
        <div className={styles.filter}>
          <Dropdown
            options={[
              { value: undefined, name: "전체" },
              { value: true, name: "공개 스터디만" },
            ]}
            onSelect={filterRoomHandler}
          />
          <Dropdown
            options={[
              { value: "currentUsers", name: "인기 순" },
              { value: "createAt", name: "최신 순" },
            ]}
            onSelect={sortRoomHandler}
          />
        </div>
      </div>
      <div className={styles.tab_menu}>
        <TabMenu setCurrentCategory={setCurrentCategory} />
      </div>
      <div className={styles.studyroom_list}>{content}</div>
      {!isLastPage && (
        <button type="button" onClick={clickMoreBtn}>
          더보기
        </button>
      )}
    </div>
  );
}

export default StudyRoomList;
