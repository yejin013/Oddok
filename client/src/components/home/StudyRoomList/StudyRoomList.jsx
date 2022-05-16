import React, { useState, useEffect, useCallback } from "react";
import { getStudyRoomList } from "@api/study-room-api";
import { Dropdown } from "@components/commons";
import TabMenu from "../TabMenu/TabMenu";
import CardGrid from "../CardGrid/CardGrid";
import styles from "./StudyRoomList.module.css";

function StudyRoomList({ searchedTitle, searchedHashtag, showBookmark }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(undefined);
  const [filterOpt, setFilterOpt] = useState(undefined);
  const [sortOpt, setSortOpt] = useState(undefined);
  const [isLastPage, setIsLastPage] = useState(false);
  const [loadedRooms, setLoadedRooms] = useState([]);

  const fetchRoomData = useCallback(async (page, sort, isPublic, category, name, hashtag) => {
    const rooms = await getStudyRoomList(page, sort, isPublic, category, name, hashtag);
    return rooms;
  }, []);

  useEffect(() => {
    (async () => {
      const rooms = await fetchRoomData(undefined, sortOpt, filterOpt, currentCategory, searchedTitle, searchedHashtag);
      setLoadedRooms(rooms);
    })();
    setCurrentPage(0);
  }, [fetchRoomData, sortOpt, filterOpt, currentCategory, searchedTitle, searchedHashtag]);

  const sortRoomHandler = (value) => {
    setSortOpt(value);
  };

  const filterRoomHandler = (value) => {
    setFilterOpt(value);
  };

  // 더보기
  const clickMoreBtn = async () => {
    const rooms = await fetchRoomData(
      currentPage + 1,
      sortOpt,
      filterOpt,
      currentCategory,
      searchedTitle,
      searchedHashtag,
    );
    // 더이상 가져올 데이터가 없으면 더보기 버튼을 없앤다
    if (rooms.length === 0) {
      setIsLastPage(true);
      return;
    }
    setLoadedRooms((prev) => [...prev, ...rooms]);
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.studyroom_head}>
        <div className={styles.tab_menu}>
          <TabMenu setCurrentCategory={setCurrentCategory} />
        </div>
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
              { value: undefined, name: "최신 순" },
              { value: "currentUsers", name: "인기 순" },
            ]}
            onSelect={sortRoomHandler}
          />
        </div>
      </div>
      <div className={styles.studyroom_list}>
        {loadedRooms ? (
          <CardGrid //
            rooms={loadedRooms}
            showBookmark={showBookmark}
          />
        ) : (
          <p style={{ color: "white" }}>스터디룸이 없어요!🥲</p>
        )}
      </div>
      {!isLastPage && (
        <button type="button" onClick={clickMoreBtn}>
          더보기
        </button>
      )}
    </div>
  );
}

export default StudyRoomList;
