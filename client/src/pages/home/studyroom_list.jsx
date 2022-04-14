import React, { useState, useEffect, useCallback } from "react";
import { getStudyRoomList } from "../../api/study-room-api";
import CategoryNav from "../../components/home/category_nav/category_nav";
import CardGrid from "../../components/home/card_grid/card_grid";
import Dropdown from "../../components/commons/dropdown/dropdown";

import styles from "./studyroom_list.module.css";

function StudyRoomList() {
  const [currentPage, setCurrentPage] = useState(0);
  const [filterOpt, setFilterOpt] = useState(undefined);
  const [sortOpt, setSortOpt] = useState("createAt");
  const [isLastPage, setIsLastPage] = useState(false);
  const [loadedRooms, setLoadedRooms] = useState([]);

  // TODO 로딩 처리
  const fetchRoomData = useCallback(async (page, isPublic, sort) => {
    const data = await getStudyRoomList(page, isPublic, sort);
    if (data.last) {
      // 마지막 페이지일 경우 버튼 없애기
      setIsLastPage(true);
    }
    return data;
  }, []);

  const clickMoreBtn = async () => {
    const data = await fetchRoomData(currentPage, filterOpt, sortOpt);
    setLoadedRooms((prev) => [...prev, ...data.content]);
    setCurrentPage((prev) => prev + 1);
  };

  // filter, sort가 변할때마다 스터디룸 리스트를 요청한다.
  useEffect(() => {
    (async () => {
      const data = await fetchRoomData(currentPage, filterOpt, sortOpt);
      setLoadedRooms(data.content);
      setCurrentPage(0);
    })();
  }, [fetchRoomData, filterOpt, sortOpt]);

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
        <CategoryNav />
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
